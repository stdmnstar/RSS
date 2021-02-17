import { getFreeMovies} from './field-util';

export default function setDraggable(cells, sellCount) {
    for (let i = 0; i < cells.length - 1; i += 1) {
        const cell = cells[i].element;
        cell.setAttribute('draggable', 'false');
        cell.style.cursor = 'default';
    }
    const freeMovies = getFreeMovies(cells, sellCount);
    for (let i = 0; i < freeMovies.length; i += 1) {
        freeMovies[i].element.setAttribute('draggable', 'true');
        freeMovies[i].element.style.cursor = 'grab';
    }
}