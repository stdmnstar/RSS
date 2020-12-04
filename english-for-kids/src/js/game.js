import cardsData from './cardsData';
import { trainBacground, playBacground} from './constants';


let modeTrain = true;

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
        const { image } = cardsData[idx][idx]
        const element = el;
        element.style.backgroundImage = `url(./${image})`;
    });
    words.forEach((el, idx) => {
        const text = cardsData[cardsData.length - 1][idx]
        const element = el;
        element.innerHTML = `${text}`;
    });
}