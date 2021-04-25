import '../css/style.scss';
import '../favicon.ico';
import '../sounds/audio.mp3';

import myAlert from './myalert';
import setDraggable from './drag';
import playSound from './sound';
import {
  showResults,
  setResults
} from './results';
import {
  getColum,
  getRaw,
  getFreeMovies,
  swap,
  isFinished,
  parsetime
} from './field-util';

const SIZES = {
  '3x3': 3,
  '4x4': 4,
  '5x5': 5,
  '6x6': 6,
  '7x7': 7,
  '8x8': 8,
};

let moves = 0;
let time = 0;
let timerStart = 0;
let timerId = false;
let size;
let sellCount;
let cellSize;
let countShufle;
let isStarted = false;
let isSolution = false;
let solutionWork = false;
let isSound = true;
let cells = [];
let historyMoves = [];

function installSize(s) {
  let widthField = 400;
  if (document.body.clientWidth < 480) {
    widthField = 280;
  }
  size = s;
  sellCount = s * s;
  cellSize = widthField / s;
  countShufle = sellCount * 3;
}

installSize(SIZES['4x4']);

document.body.innerHTML = '';
const wrapper = document.createElement('main');

const startButtons = document.createElement('div');
const infoTop = document.createElement('div');
const field = document.createElement('div');
const sizeButtons = document.createElement('div');
const buttons = document.createElement('div');
wrapper.classList.add('wrapper');
buttons.classList.add('buttons');
startButtons.classList.add('buttons');
infoTop.classList.add('infoTop');
field.classList.add('field');
sizeButtons.classList.add('sizeButtons');

wrapper.appendChild(startButtons);
wrapper.appendChild(infoTop);
wrapper.appendChild(field);
wrapper.appendChild(sizeButtons);
wrapper.appendChild(buttons);
document.body.appendChild(wrapper);

buttons.innerHTML = '';
const btnSave = document.createElement('button');
btnSave.textContent = 'Save';
btnSave.id = 'btn-save';
btnSave.setAttribute('title', 'Save current position');
btnSave.classList.add('btn', 'btn-big');
buttons.appendChild(btnSave);

const btnRestore = document.createElement('button');
btnRestore.textContent = 'Restore';
btnRestore.id = 'btn-restore';
btnRestore.setAttribute('title', 'Restore from last saved position');
btnRestore.classList.add('btn', 'btn-big');
buttons.appendChild(btnRestore);

const btnResults = document.createElement('button');
btnResults.textContent = 'Results';
btnResults.id = 'btn-results';
btnResults.setAttribute('title', 'Best of the Best');
btnResults.classList.add('btn', 'btn-big');
buttons.appendChild(btnResults);

startButtons.innerHTML = '';
const btnStart = document.createElement('button');
btnStart.textContent = 'New game';
btnStart.id = 'btn-start';
btnStart.setAttribute('title', 'New game');
btnStart.classList.add('btn-start', 'btn-big');
startButtons.appendChild(btnStart);

const btnSolution = document.createElement('button');
btnSolution.textContent = 'Solution';
btnSolution.id = 'btn-solution';
btnSolution.setAttribute('title', 'Solution');
btnSolution.classList.add('btn-start', 'btn-big');
startButtons.appendChild(btnSolution);

sizeButtons.innerHTML = '';
const sizesArrKeys = Object.keys(SIZES);
for (let i = 0; i < sizesArrKeys.length; i += 1) {
  const btn = document.createElement('button');
  btn.id = sizesArrKeys[i];
  btn.classList.add('btn', 'btn-small');
  btn.setAttribute('title', `Create new ${sizesArrKeys[i]} game`);
  btn.textContent = sizesArrKeys[i];
  sizeButtons.appendChild(btn);
}

infoTop.innerHTML = '';
const movesLabel = document.createElement('span');
movesLabel.textContent = 'Moves: ';
infoTop.appendChild(movesLabel);

const movesCount = document.createElement('span');
movesCount.id = 'moves';
movesCount.textContent = '000';
infoTop.appendChild(movesCount);

const btnSound = document.createElement('button');
btnSound.textContent = '🔊';
btnSound.id = 'btn-sound';
btnSound.setAttribute('title', 'Sound on/off');
btnSound.classList.add('btn', 'btn-big');
infoTop.appendChild(btnSound);

const timeLabel = document.createElement('span');
timeLabel.textContent = 'Time: ';
infoTop.appendChild(timeLabel);

const timeCount = document.createElement('span');
timeCount.id = 'time';
timeCount.textContent = '00:00';
infoTop.appendChild(timeCount);

function setMovesOnField(movesToField) {
  movesCount.textContent = movesToField.toString().padStart(3, '0');
}

function move(index) {
  if (!isStarted) {
    myAlert('Игра не начата. Нажмите NEW GAME');
    return;
  }
  const cell = cells[index];
  const empty = cells[(sellCount - 1)];

  const leftDiff = Math.abs(empty.column - cell.column);
  const toptDiff = Math.abs(empty.raw - cell.raw);
  if (leftDiff + toptDiff > 1) {
    return;
  }

  swap(cell, empty, cellSize);
  historyMoves.push(cell.value);
  playSound(isSound);
  moves += 1;
  setMovesOnField(moves);
  setDraggable(cells, sellCount);

  if (isFinished(cells, size)) {
    isStarted = false;
    clearInterval(timerId);
    setTimeout(() =>
      myAlert(
        `Ура! Вы решили головоломку за ${timeCount.textContent} и ${moves} ходов`
      ), 300);
    setResults(size, moves, timeCount.textContent);
  }
}

function moveOnClick(e) {
  move(e.target.id);
}

function dragStart(event) {
  event.dataTransfer.setData('id', event.target.id);
  setTimeout(() => {
    cells[event.target.id].element.classList.add('hide');
  }, 0);
}

function dragEnd(event) {
  setTimeout(() => {
    cells[event.target.id].element.classList.remove('hide');
  }, 0);
}

function drop(event) {
  move(event.dataTransfer.getData('id'));
}

function allowDrop(event) {
  event.preventDefault();
}

function createField() {
  let cell;
  field.innerHTML = '';
  for (let i = 0; i < sellCount; i += 1) {
    cell = document.createElement('div');
    cell.style.width = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;
    cell.id = i;
    if (i !== sellCount - 1) {
      cell.className = 'cell';
      cell.innerHTML = cells[i].value;
      cell.onclick = moveOnClick;
      cell.ondragstart = dragStart;
      cell.ondragend = dragEnd;
    } else {
      cell.className = 'cell-empty';
      cell.ondragover = allowDrop;
      cell.ondrop = drop;
    }

    cells[i].element = cell;
    cell.style.left = `${cells[i].column * cellSize}px`;
    cell.style.top = `${cells[i].raw * cellSize}px`;
    field.appendChild(cell);
  }
}

function createInitField() {
  cells.length = 0;

  for (let i = 0; i < sellCount; i += 1) {
    cells.push({
      value: i + 1,
      column: getColum(i, size),
      raw: getRaw(i, size)
    });
  }
  createField();
}

function startTimer() {
  timerId = setInterval(() => {
    time = (Date.now() - timerStart) / 1000;
    timeCount.textContent = parsetime(time);
  }, 1000);
}

function start() {
  if (solutionWork) {
    myAlert('Дождитесь завершения анимации');
    return;
  }

  createInitField();

  isSolution = true;
  isStarted = true;
  historyMoves.length = 0;
  moves = 0;
  setMovesOnField(moves);
  const empty = cells[(sellCount - 1)];

  let freeMovies = [];
  for (let k = 0; k < countShufle; k += 1) {
    freeMovies.length = 0;
    freeMovies = getFreeMovies(cells, sellCount);
    const randomSide = Math.floor(Math.random() * (freeMovies.length));

    swap(freeMovies[randomSide], empty, cellSize);
    historyMoves.push(freeMovies[randomSide].value);

    if (historyMoves[k] === historyMoves[k - 1]) {
      historyMoves.pop();
      historyMoves.pop();
      k -= 2;
    }
  }
  if (timerId) {
    moves = 0;
    movesCount.textContent = '000';
    clearTimeout(timerId);
    timeCount.textContent = '00:00';
  }
  timerStart = Date.now();
  setDraggable(cells, sellCount);
  startTimer();
}

function swapSolution(long, cell, empty) {
  setTimeout(() => {
    swap(cell, empty, cellSize);
    playSound(isSound);
  }, 300 * long);
}

function solution() {
  if (solutionWork) {
    myAlert('Дождитесь завершения анимации');
    return;
  }
  if (!isSolution) {
    myAlert('Нет игры для завершения');
    return;
  }

  isStarted = false;
  solutionWork = true;
  if (timerId) {
    moves = 0;
    movesCount.textContent = '000';
    clearTimeout(timerId);
    timeCount.textContent = '00:00';
  }
  const empty = cells[(sellCount - 1)];
  for (let i = historyMoves.length - 1; i >= 0; i -= 1) {
    swapSolution(historyMoves.length - i, cells[historyMoves[i] - 1], empty);

  }
  isSolution = false;

  setTimeout(() => {
    solutionWork = false;
  }, 300 * (historyMoves.length));
}

function saveGame() {
  const cellsObject = {
    moves,
    time,
    timerStart,
    isStarted,
    isSolution,
    size,
    cells,
    historyMoves,
  };
  localStorage.setItem('lastSaved', JSON.stringify(cellsObject));
  myAlert('Текущая игра сохранена.');
}

function restoreGame() {
  const lastSaved = JSON.parse(localStorage.getItem('lastSaved'));
  if (!lastSaved) {
    myAlert('Сохраненной игры не обнаружено!');
    return;
  }
  if (timerId) {
    clearTimeout(timerId);
  }

  moves = lastSaved.moves;
  setMovesOnField(moves);

  time = lastSaved.time;
  timeCount.textContent = parsetime(time);
  size = lastSaved.size;
  isStarted = lastSaved.isStarted;
  isSolution = lastSaved.isSolution;
  size = lastSaved.size;
  installSize(size);
  cells = lastSaved.cells;
  historyMoves = lastSaved.historyMoves;

  createField();
  setDraggable(cells, sellCount);

  if (isStarted) {
    timerStart = Date.now() - time * 1000;
    startTimer();
  }
  myAlert('Восстановлена последняя сохраненная игра');
}

function resizeWindow() {
  installSize(size);
  for (let i = 0; i < cells.length; i += 1) {
    cells[i].element.style.width = `${cellSize}px`;
    cells[i].element.style.height = `${cellSize}px`;
    cells[i].element.style.left = `${cells[i].column * cellSize}px`;
    cells[i].element.style.top = `${cells[i].raw * cellSize}px`;
  }
}

function onOffSound() {
  btnSound.textContent = (isSound) ? '🔇' : '🔊';
  isSound = !isSound;
}

start();
btnStart.addEventListener('click', () => start());
btnSolution.addEventListener('click', () => solution());
btnSound.addEventListener('click', () => onOffSound());
btnSave.addEventListener('click', () => saveGame());
btnRestore.addEventListener('click', () => restoreGame());
btnResults.addEventListener('click', () => showResults(size));
sizeButtons.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {

    if (solutionWork) {
      myAlert('Дождитесь завершения анимации');
      return;
    }
    installSize(SIZES[e.target.id]);
    isStarted = false;
    isSolution = false;
    if (timerId) {
      moves = 0;
      movesCount.textContent = '000';
      clearTimeout(timerId);
      timeCount.textContent = '00:00';
    }
    start();
  }
});

window.onresize = resizeWindow;