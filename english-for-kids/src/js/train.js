import { playWord } from './audio';
import { updateStatistics } from './statistics';

export function addClickTrain() {
    const cards = document.querySelector('.cards__container');
    cards.addEventListener('click', (e) => {
        if (e.target.classList.contains('sound')) {
            const word = e.target.nextElementSibling.innerText;
            playWord(word);
            updateStatistics(word,'train');
        }
    });
}

function rotateCard(card) {
    const ROTATE_DURATION = 400;
    const FIRST_CHILD = 1;
    const SECOND_CHILD = 2;

    const curCard = card;
    const img = curCard.children[0];
    const word = curCard.children[FIRST_CHILD];
    const translation = curCard.children[SECOND_CHILD];
    const rotate = curCard.children[3];
    curCard.removeAttribute('style');
    curCard.classList.add('rotate');
    setTimeout(() => {
        translation.classList.remove('hidden');
        img.classList.remove('sound');
        word.classList.add('hidden');
        rotate.classList.add('hidden');
        curCard.style.transform = 'rotateY(0deg)';
        curCard.classList.remove('rotate');
    }, ROTATE_DURATION);

    curCard.addEventListener('mouseleave', () => {
        curCard.removeAttribute('style');
        curCard.classList.add('rotate');
        setTimeout(() => {
            translation.classList.add('hidden');
            img.classList.add('sound');
            word.classList.remove('hidden');
            rotate.classList.remove('hidden');
            curCard.style.transform = 'rotateY(0deg)';
            curCard.classList.remove('rotate');
        }, ROTATE_DURATION);
    }, { once: true });
}

export function addClickRotate() {
    const FIRST_CHILD = 1;
    const THIRD_CHILD = 3;
    const cardsContainer = document.querySelector('.cards__container');
    cardsContainer.addEventListener('click', (e) => {
        if (e.target.id === 'path0') {
            const curCard = e.path[THIRD_CHILD];
            rotateCard(curCard);
        } else if (e.target.classList.contains('card__rotate')) {
            const curCard = e.path[FIRST_CHILD];
            rotateCard(curCard);
        }
    });
}
