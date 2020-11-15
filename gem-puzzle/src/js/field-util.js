export function getColum(index, size) {
  return index % size;
}

export function getRaw(index, size) {
  return (index - getColum(index, size)) / size;
}

export function getFreeMovies(cells, sellCount) {
  const empty = cells[(sellCount - 1)];
  const freeMovies = [];
  for (let i = 0; i < sellCount - 1; i += 1) {
    const cell = cells[i];
    const leftDiff = Math.abs(empty.column - cell.column);
    const toptDiff = Math.abs(empty.raw - cell.raw);
    if (leftDiff + toptDiff === 1) {
      freeMovies.push(cell);
    }
  }
  return freeMovies;
}

export function swap(...args) {
  const cell = args[0];
  const empty = args[1];
  const cellSize = args[2];

  const swapColumn = empty.column;
  const swapRaw = empty.raw;

  empty.column = cell.column;
  empty.raw = cell.raw;
  cell.column = swapColumn;
  cell.raw = swapRaw;

  cell.element.style.left = `${cell.column * cellSize}px`;
  cell.element.style.top = `${cell.raw * cellSize}px`;
  empty.element.style.left = `${empty.column * cellSize}px`;
  empty.element.style.top = `${empty.raw * cellSize}px`;
}

export function isFinished(cells, size) {
  return cells.every(cell => {
    return cell.value === cell.raw * size + cell.column + 1;
  });
}

export function parsetime(time){
 return `${parseInt(time / 60, 10).toString()
    .padStart(2, '0')}:${parseInt(time % 60, 10).toString()
      .padStart(2, '0')}`;
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

