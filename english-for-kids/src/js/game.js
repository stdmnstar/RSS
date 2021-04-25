import cardsData from './cardsData';
import {
    trainBacground,
    playBacground,
    audioCorrect,
    audioError,
    audioSuccess,
    audioFailure
} from './constants';
import {
    addDomElements,
    addTrainPage,
    addPlayPage
} from './dom';
import {
    playAudio,
    playWord
} from './audio';
import {
    addClickTrain,
    addClickRotate
} from './train';
import {
    updateStatistics
} from './statistics';

const arrWords = [];
let modeTrain = true;
let modePlay = false;
let hiddenWord = null;
let error = 0;

export function addMainPage() {
    const cards = document.querySelectorAll('.card');
    const images = document.querySelectorAll('.card__img');
    const words = document.querySelectorAll('.card__word');

    cards.forEach((el) => {
        const card = el;
        if (modeTrain) {
            card.style.background = `${trainBacground}`;
        } else {
            card.style.background = `${playBacground}`;
        }
    });
    images.forEach((el, idx) => {
        const {
            image
        } = cardsData[idx][0];
        const element = el;
        element.style.backgroundImage = `url(./${image})`;
    });
    words.forEach((el, idx) => {
        const text = cardsData[cardsData.length - 1][idx];
        const element = el;
        element.innerHTML = `${text}`;
    });
}

function getWordsForGame()  {
    const wordsNodeList = document.querySelectorAll('.card__word');
    arrWords.length = 0;
    wordsNodeList.forEach((el => {
        const word = el.innerText;
        arrWords.push(word);
    }));
    arrWords.sort(() => {
        return Math.random() - 0.5;
    });
}

function addMainPageActive() {
    const FIRST_ELEMENT = 0;
    const links = document.querySelectorAll('.menu__item');
    links.forEach((link) => {
        if (link.classList.contains('active')) {
            link.classList.remove('active');
        }
    });
    links[FIRST_ELEMENT].classList.add('active');
}

function getWord() {
    if (arrWords.length > 0) {
        hiddenWord = arrWords.pop();
        playWord(hiddenWord);
    } else {        
        finishGame();
    }
}

function game(clickedWord) {
    const FIRST_ELEMENT = 0;
    const AUDIO_DURATION = 1000;
    const STAR_WIN_SRC = './svg/star-win.svg';
    const STAR_SRC = './svg/star.svg';

    const stars = document.querySelectorAll('.star');

    if (clickedWord === hiddenWord) {
        playAudio(audioCorrect);
        setTimeout(getWord, AUDIO_DURATION);
        const star = document.createElement('img');
        star.src = STAR_WIN_SRC;
        star.classList = 'star';
        stars[FIRST_ELEMENT].before(star);
        updateStatistics(clickedWord, 'correct');
    } else {
        error += 1;
        playAudio(audioError);
        const star = document.createElement('img');
        star.src = STAR_SRC;
        star.classList = 'star';
        stars[FIRST_ELEMENT].before(star);
        updateStatistics(hiddenWord, 'error');
    }
}

function addClickPlay() {
    const cards = document.querySelector('.cards__container');
    cards.addEventListener('click', (e) => {
        if (e.target.classList.contains('card__img') && !e.target.classList.contains('not-active')) {
            const clickedWord = e.target.nextElementSibling.innerText;
            if (clickedWord === hiddenWord) {
                e.target.classList.add('not-active');
            }
            game(clickedWord);
        }
    });
}

function addClickStartGame() {
    const btn = document.querySelector('.btn__start');
    const REPEAT_SRC = './svg/repeat.svg';
    btn.addEventListener('click', (e) => {
        const textBtn = e.target.innerHTML;
        if (textBtn === 'Start game') {
            const img = document.createElement('img');
            img.classList = 'repeat';
            img.src = REPEAT_SRC;
            btn.innerHTML = '';
            btn.append(img);
            btn.classList.add('active__btn');
            getWordsForGame();
            addClickPlay();
            getWord();
        } else {
            playWord(hiddenWord);
        }
    });
}


export function addClickCard() {
    const cards = document.querySelector('.cards__container');
    const links = document.querySelectorAll('.menu__item');
    cards.addEventListener('click', (e) => {
        if (e.target.classList.contains('card')) {
            const {id} = e.target;
            links.forEach((el) => {
                el.classList.remove('active');
                if (el.title === id) {
                    el.classList.add('active');
                }
            });
            if (modeTrain) {
                addTrainPage(id);
                addClickTrain();
                addClickRotate();
            } else if (modePlay) {
                addPlayPage(id);
                addClickStartGame();
            }
        } else if (e.target.classList.contains('card__img') || e.target.classList.contains('card__word')) {
            const {
                id
            } = e.target.offsetParent;
            links.forEach((el) => {
                el.classList.remove('active');
                if (el.title === id) {
                    el.classList.add('active');
                }
            });
            if (modeTrain) {
                addTrainPage(id);
                addClickTrain();
                addClickRotate();
            } else if (modePlay) {
                addPlayPage(id);
                addClickStartGame();
            }
        }
    }, {
        once: true
    });
}


export function addClickToggle() {
    const links = document.querySelectorAll('.menu__item');
    const toggle = document.querySelector('.toggle');
    const switcher = document.getElementById('switch');
    const text = document.querySelector('.toggle__text');
    const menu = document.querySelector('.menu');

    let curId = null;

    toggle.addEventListener('click', () => {
        const statistics = document.querySelector('.statistics');
        const container = document.querySelector('.cards__container');
        links.forEach((el) => {
            if (el.classList.contains('active')) {
                curId = el.title;
            }
        });

        if (!switcher.checked) {
            switcher.checked = true;
            modePlay = true;
            modeTrain = false;
            text.classList.add('text__right');
            text.innerHTML = 'Play';
            menu.style.background = `#fc6262`;
            if (curId === 'main' || curId === 'statistics') {
                statistics.classList.add('hidden');
                container.remove();
                addDomElements();
                addMainPage();
                addMainPageActive();
                addClickCard();
            } else {
                container.remove();
                addDomElements();
                addPlayPage(curId);
                addClickStartGame();
            }
        } else {
            switcher.checked = false;
            modePlay = false;
            modeTrain = true;
            text.classList.remove('text__right');
            text.innerHTML = 'Train';
            menu.style.background = `#0099ae`;
            if (curId === 'main' || curId === 'statistics') {
                statistics.classList.add('hidden');
                container.remove();
                addDomElements();
                addMainPage();
                addMainPageActive();
                addClickCard();
            } else {
                container.remove();
                addDomElements();
                addTrainPage(curId);
                addClickTrain();
                addClickRotate();
            }
        }
    });
}

export function menuHidden() {
    const switcher = document.querySelector('.menu__switcher');
    switcher.addEventListener('blur', () => {
        switcher.checked = false;
    });
}

export function addClickMenu() {
    const menu = document.querySelector('.menu');
    const links = document.querySelectorAll('.menu__item');

    menu.addEventListener('click', (e) => {
        const statistics = document.querySelector('.statistics');
        const container = document.querySelector('.cards__container');
        if (e.target.classList.contains('menu__item')) {
            e.preventDefault();
            const {
                title
            } = e.target;
            links.forEach((link) => {
                if (link.classList.contains('active')) {
                    link.classList.remove('active');
                }
            });
            e.target.classList.add('active');
            if (title === 'main') {
                statistics.classList.add('hidden');
                container.remove();
                addDomElements();
                addMainPage();
                addClickCard();
            } else if (title === 'statistics') {
                container.classList.add('hidden');
                statistics.classList.remove('hidden');
            } else {
                container.remove();
                addDomElements();
                if (modeTrain) {
                    statistics.classList.add('hidden');
                    addTrainPage(title);
                    addClickTrain();
                    addClickRotate();
                } else if (modePlay) {
                    statistics.classList.add('hidden');
                    addPlayPage(title);
                    addClickStartGame();
                }
            }
        }
    });
}

function finishGame() {
    const SHOW_EMOJI_DURATION = 4000;
    if (error === 0) {
        const container = document.querySelector('.cards__container');
        const emoji = document.createElement('div');
        emoji.classList = 'emoji';
        emoji.innerHTML = `<p class='emoji__text'>You Win!</p><img src='./img/success.jpg'></img>`;
        container.remove();
        document.querySelector('.wrapper').append(emoji);
        playAudio(audioSuccess);
        setTimeout(() => {
            error = 0;
            container.remove();
            emoji.remove();
            addDomElements();
            addMainPage();
            addMainPageActive();
            addClickToggle();
            addClickCard();
            addClickMenu();
            menuHidden();
        }, SHOW_EMOJI_DURATION);
    } else {
        const container = document.querySelector('.cards__container');
        const emoji = document.createElement('div');
        emoji.classList = 'emoji';
        emoji.innerHTML = `<p class='emoji__text'>Error ${error}!</p><img src='./img/failure.jpg'></img>`;
        container.remove();
        document.querySelector('.wrapper').append(emoji);
        playAudio(audioFailure);
        setTimeout(() => {
            error = 0;
            container.remove();
            emoji.remove();
            addDomElements();
            addMainPage();
            addMainPageActive();
            addClickToggle();
            addClickCard();
            addClickMenu();
            menuHidden();
        }, SHOW_EMOJI_DURATION);
    }
}