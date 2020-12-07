import cardsData from './cardsData';

export function addDomStatistics() {
    const statistics = document.createElement('div');
    statistics.classList = 'statistics hidden';
    statistics.innerHTML = `<div class='statistics__btn'>
    <button class='btn btn-reset'>Reset</button>
    <button class='btn btn-difficult'>Repeat difficult word</button>
    </div>
    <div class='statistics__header'>
    <div class='category'>Category</div>
    <div class='word'>Word</div>
    <div class='translate'>Translate</div>
    <div class='train'>Train Mode</div>
        <div class='wrapper__game'>
            <div class='header__game'>Game Mode</div>
            <div class="wrapper__game-items">
                <div class='correct'>Correct</div>
                <div class='error'>Error</div>
                <div class='percents'>%</div>
            </div>
        </div>
    </div>`;

    document.querySelector('.wrapper').append(statistics);
}

const addRow = (id, category, word, translate) => {
    const statistics = document.querySelector('.statistics');
    const row = document.createElement('div');
    row.classList = 'row';
    row.id = id;
    row.innerHTML = `<div class='category'>${category}</div>
    <div class='word'>${word}</div>
    <div class='translate'>${translate}</div>
    <div class='train'>0</div>
        <div class='game__items'>
            <div class='correct'>0</div>
            <div class='error'>0</div>
            <div class='percents'>0</div>
        </div>`;
    statistics.append(row);
};

export function addStatistics() {
    for (let index = 0; index < cardsData.length - 1; index += 1) {
        const element = cardsData[index];
        const category = cardsData[cardsData.length - 1][index];
        element.forEach((el) => {
            const id = el.word;
            const {
                word
            } = el;
            const {
                translation
            } = el;
            addRow(id, category, word, translation);
        });

    }
}

export function saveStatistics() {
    const statistics = document.querySelector('.statistics').innerHTML;
    return statistics;
}

export function checkLocalStorage() {
    if (localStorage.getItem('statistics') === null) {
        addDomStatistics();
        addStatistics();
    } else {
        addDomStatistics();
        const statistics = document.querySelector('.statistics');
        statistics.innerHTML = localStorage.getItem('statistics');
    }
}

function removeHiddenClass() {
    const statistics = document.querySelector('.statistics');
    statistics.classList.remove('hidden');
}

export function addClickReset() {
    const btnReset = document.querySelector('.btn-reset');
    const statistics = document.querySelector('.statistics');
    btnReset.addEventListener('click', () => {
        if (localStorage.getItem('statistics') === null) {
            statistics.remove();
            addDomStatistics();
            addStatistics();
            removeHiddenClass();
        } else {
            localStorage.removeItem('statistics');
            statistics.remove();
            addDomStatistics();
            addStatistics();
            removeHiddenClass();
        }
    });
}

function countPercent() {
    const items = document.querySelectorAll('.game__items');
    const FIRST_CHILD = 0;
    const SECOND_CHILD = 1;
    const THIRD_CHILD = 2;
    items.forEach((el) => {
        const correct = el.children[FIRST_CHILD].innerHTML;
        const error = el.children[SECOND_CHILD].innerHTML;
        const percent = el.children[THIRD_CHILD];
        const numberCorrect = +correct;
        const numberError = +error;

        const curPercent = (numberCorrect / (numberError + numberCorrect)) * 100;
        
        percent.innerHTML = (Number.isNaN(curPercent))? '-' :`${curPercent.toFixed()}%`;
       
    });
}

export function updateStatistics(id, config) {
    const FIRST_CHILD = 0;
    const SECOND_CHILD = 1;
    const FOURTH_CHILD = 3;
    const FIFTH_CHILD = 4;
    const rows = document.querySelectorAll('.row');
    let parentNumber = null;
    let childNumber = null;
    if (config === 'train') {
        childNumber = FOURTH_CHILD;
    } else if (config === 'correct') {
        parentNumber = FIFTH_CHILD;
        childNumber = FIRST_CHILD;
    } else if (config === 'error') {
        parentNumber = FIFTH_CHILD;
        childNumber = SECOND_CHILD;
    }
    rows.forEach((el) => {
        if (el.id === id && config === 'train') {
            const child = el.children[childNumber];
            const curData = child.innerHTML;
            let number = +curData;
            number += 1;
            child.innerHTML = `${number}`;
        } else if (el.id === id && config === 'correct') {
            const parent = el.children[parentNumber];
            const child = parent.children[childNumber];
            const curData = child.innerHTML;
            let number = +curData;
            number += 1;
            child.innerHTML = `${number}`;
            countPercent();
        } else if (el.id === id && config === 'error') {
            const parent = el.children[parentNumber];
            const child = parent.children[childNumber];
            const curData = child.innerHTML;
            let number = +curData;
            number += 1;
            child.innerHTML = `${number}`;
            countPercent();
        }
    });
}