const SIZES = {
  // '2x2': 2,
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
installSize(SIZES['4x4']);
let isStarted = false;
let isSolution = false;
let solutionWork = false;
let isSound = true;

let cells = [];

let historyMoves = [];

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
for (const sizeKey of Object.keys(SIZES)) {
  const btn = document.createElement('button');
  btn.id = sizeKey;
  btn.classList.add('btn', 'btn-small');
  btn.setAttribute('title', `Create new ${sizeKey} game`);
  btn.textContent = sizeKey;
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

createInitField();
createListeners();



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


function createInitField() {
  cells.length = 0;

  for (let i = 0; i < sellCount; i++) {
    cells.push({
      value: i + 1,
      column: getColum(i, size),
      raw: getRaw(i, size)
    });
  }
  createField();
}

function createField() {
  let cell;
  let value;
  field.innerHTML = '';
  for (let i = 0; i < sellCount; i++) {
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

  swap(cell, empty);
  historyMoves.push(cell.value);

  playSound(isSound);

  moves += 1;
  setMoves(moves);
  setDraggable();

  if (isFinished()) {
    isStarted = false;
    clearInterval(timerId);
    //alert('win');
    setTimeout(() =>
      myAlert(
        `Ура! Вы решили головоломку за ${timeCount.textContent} и ${moves} ходов`
      ), 300);
  }
}

function setDraggable() {
  for (let i = 0; i < cells.length - 1; i++) {
    cells[i].element.setAttribute('draggable', 'false');
    cells[i].element.style.cursor = 'default';
  }
  const freeMovies = getFreeMovies();
  for (let i = 0; i < freeMovies.length; i++) {
    freeMovies[i].element.setAttribute('draggable', 'true');
    freeMovies[i].element.style.cursor = 'grab';
  }
}

function setMoves(moves) {
  movesCount.textContent = moves.toString().padStart(3, '0');
}

function isFinished() {
  return cells.every(cell => {
    return cell.value === cell.raw * size + cell.column + 1;
  });
}

function swap(cell, empty) {
  const emptyColumn = empty.column;
  const emptyRaw = empty.raw;

  empty.column = cell.column;
  empty.raw = cell.raw;
  cell.column = emptyColumn;
  cell.raw = emptyRaw;

  cell.element.style.left = `${cell.column * cellSize}px`;
  cell.element.style.top = `${cell.raw * cellSize}px`;
  empty.element.style.left = `${empty.column * cellSize}px`;
  empty.element.style.top = `${empty.raw * cellSize}px`;
}

function onOffSound() {
  btnSound.textContent = (isSound) ? '🔇' : '🔊';
  isSound = !isSound;
}

function playSound(isSound) {
  if (!isSound) {
    return;
  }
  const audio = new Audio();
  audio.src = './sounds/audio.mp3';

  if (!audio) {
    return;
  }
  audio.currentTime = 0;
  audio.play();
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
  setMoves(moves);
  const empty = cells[(sellCount - 1)];

  let freeMovies = [];
  for (let k = 0; k < countShufle; k++) {

    freeMovies.length = 0;
    freeMovies = getFreeMovies();
    const randomSide = Math.floor(Math.random() * (freeMovies.length));

    swap(freeMovies[randomSide], empty);
    historyMoves.push(freeMovies[randomSide].value);

    if (historyMoves[k] == historyMoves[k - 1]) {
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

  setDraggable();
  startTimer();
}

function getFreeMovies() {
  const empty = cells[(sellCount - 1)];
  const freeMovies = [];
  for (let i = 0; i < sellCount - 1; i++) {
    const cell = cells[i];
    const leftDiff = Math.abs(empty.column - cell.column);
    const toptDiff = Math.abs(empty.raw - cell.raw);
    if (leftDiff + toptDiff == 1) {
      freeMovies.push(cell);
    }
  }
  return freeMovies;
}

function startTimer() {
  timerId = setInterval(() => {
    time = (Date.now() - timerStart) / 1000;
    timeCount.textContent =
      parseInt(time / 60)
      .toString()
      .padStart(2, '0') +
      ':' +
      parseInt(time % 60)
      .toString()
      .padStart(2, '0');
  }, 1000);
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
  for (let i = historyMoves.length - 1; i >= 0; i--) {

    setTimeout(() => {
      swap(cells[historyMoves[i] - 1], empty);
      playSound(isSound);

    }, 300 * (historyMoves.length - i));

  }
  isSolution = false;

  setTimeout(() => {
    solutionWork = false;
  }, 300 * (historyMoves.length));

}

function saveGame() {
  if (confirm('Сохранить игру?')) {

    const cellsObject = {
      moves: moves,
      time: time,
      timerStart: timerStart,
      isStarted: isStarted,
      isSolution: isSolution,
      size: size,
      cells: cells,
      historyMoves: historyMoves,

    };
    localStorage.setItem('lastSaved', JSON.stringify(cellsObject));
  }
}

function restoreGame() {
  const lastSaved = JSON.parse(localStorage.getItem('lastSaved'));
  if (!lastSaved) {
    myAlert('Сохраненной игры не обнаружено!');
    return;
  }
  if (confirm('Восстановить последнюю сохраненную игру?')) {
    if (timerId) {
      clearTimeout(timerId);
    }

    moves = lastSaved.moves;
    movesCount.textContent = moves.toString().padStart('0', 3);

    time = lastSaved.time;
    timeCount.textContent =
      parseInt(time / 60)
      .toString()
      .padStart(2, '0') +
      ':' +
      parseInt(time % 60)
      .toString()
      .padStart(2, '0');

    size = lastSaved.size;
    isStarted = lastSaved.isStarted;
    isSolution = lastSaved.isSolution;
    size = lastSaved.size;
    installSize(size);
    cells = lastSaved.cells;
    historyMoves = lastSaved.historyMoves;

    createField();
    setDraggable();

    if (isStarted) {
      timerStart = Date.now() - time * 1000;
      startTimer();
    }
  }
}

function moveOnClick(e) {
  move(e.target.id);
}

function drop(event) {
  move(event.dataTransfer.getData('id'));
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

function allowDrop(event) {
  event.preventDefault();
}

function createListeners() {
  document
    .getElementById('btn-start')
    .addEventListener('click', () => start());

  document
    .getElementById('btn-solution')
    .addEventListener('click', () => solution());

  document
    .getElementById('btn-sound')
    .addEventListener('click', () => onOffSound());

  document
    .getElementById('btn-save')
    .addEventListener('click', () => saveGame());

  document
    .getElementById('btn-restore')
    .addEventListener('click', () => restoreGame());

  document
    .getElementById('btn-results')
    .addEventListener('click', () => showResults());

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
      createInitField();
    }
  });

  window.onresize = resizeWindow;
}

function resizeWindow() {
  installSize(size);
  for (let i = 0; i < cells.length; i++) {
    cells[i].element.style.width = `${cellSize}px`;
    cells[i].element.style.height = `${cellSize}px`;
    cells[i].element.style.left = `${cells[i].column * cellSize}px`;
    cells[i].element.style.top = `${cells[i].raw * cellSize}px`;
  }
}

function getColum(index, size) {
  return index % size;
}

function getRaw(index, size) {
  return (index - getColum(index, size)) / size;
}

function closeAlertBox() {
  const alertBox = document.getElementById("alertBox");
  const alertClose = document.getElementById("alertClose");
  const alertClose2 = document.getElementById("alertClose2");

  alertBox.parentNode.removeChild(alertBox);
  alertClose.parentNode.removeChild(alertClose);
  alertClose2.parentNode.removeChild(alertClose2);
}

function myAlert(msg, width = '200px', height = '100px') {
  const alertBox = document.createElement("div");
  document.body.appendChild(alertBox);
  alertBox.id = "alertBox";
  alertBox.innerHTML = msg;
  alertBox.style.width = width;
  alertBox.style.height = height;

  const alertClose = document.createElement("div");
  alertClose.id = "alertClose";
  alertClose.innerHTML = "X";
  alertBox.appendChild(alertClose);

  alertClose.onclick = closeAlertBox;

  const alertClose2 = document.createElement("div");
  alertClose2.id = "alertClose2";
  document.body.appendChild(alertClose2);
  alertClose2.onclick = closeAlertBox;
}