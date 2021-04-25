import cardsData from './cardsData';

export function addDomElements() {
    const container = document.createElement('div');
    container.classList = 'cards__container';
    let inner = '<div class="stars"><img src="./svg/star.svg" class="star hidden-star"></div>';
    for (let i = 0; i < 8; i+=1){
        inner += `<div class="card" id="${i}">
        <div class="card__img"></div>        
        <p class="card__word"></p>
        <p class="card__translate"></p>        
        <svg class="card__rotate hidden" xmlns="http://www.w3.org/2000/svg" 
            xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="40" viewBox="0, 0, 400,400"><g id="svgg">
            <path id="path0" d="M149.333 106.849 C -33.313 127.384,-41.223 252.474,138.667 275.531
             C 146.978 276.596,157.155 277.883,161.284 278.391 L 168.790 279.314 169.284 303.117 L
              169.778 326.920 214.222 292.359 C 238.667 273.351,258.667 256.989,258.667 256.000 
            C 258.667 255.011,238.667 238.649,214.222 219.641 L 169.778 185.080 169.280 208.294 L 
            168.783 231.508 158.614 230.340 C 114.170 225.237,73.024 211.579,59.659 197.495 L 54.430 
            191.983 60.245 185.983 C 103.148 141.719,300.841 141.956,339.792 186.318 L 345.150 192.421 
            340.131 197.714 C 334.182 203.985,316.718 213.058,300.000 218.562 L 288.000 222.512 288.000 
            246.565 L 288.000 270.618 294.624 269.375 C 380.118 253.336,418.057 192.558,369.823 148.909
             C 332.872 115.470,236.377 97.063,149.333 106.849 " stroke="none" fill="#d1c7d7" 
             fill-rule="evenodd"></path></g></svg>
    </div>`;
    }
    container.innerHTML = inner;
    document.querySelector('.wrapper').append(container);
}

export function addTrainPage (id) {
    const cardsRotate = document.querySelectorAll('.card__rotate');
    const images = document.querySelectorAll('.card__img');
    const words = document.querySelectorAll('.card__word');
    const translations = document.querySelectorAll('.card__translate');
    images.forEach((el, idx) => {
        const img = cardsData[id][idx].image;
        const element = el;
        element.style.backgroundImage = `url(./${img})`;
        element.classList.add('card__img_train');
        element.classList.add('sound');
    });
    words.forEach((el, idx) => {
        const { word } = cardsData[id][idx];
        const element = el;
        element.innerHTML = `${word}`;
        element.classList.add('card__word_train');
    });
    translations.forEach((el, idx) => {
        const { translation } = cardsData[id][idx];
        const element = el;
        element.innerHTML = `${translation}`;
        element.classList.add('hidden');
    });
    cardsRotate.forEach((el) => {
        const element = el;
        element.classList.remove('hidden');
    });
}

export function addPlayPage(id) {
    const container = document.querySelector('.cards__container');
    const cards = document.querySelectorAll('.card');
    const images = document.querySelectorAll('.card__img');
    const words = document.querySelectorAll('.card__word');
    const translations = document.querySelectorAll('.card__translate');
    const btnWrapper = document.createElement('div');
    btnWrapper.classList = 'wrapper__btn';
    btnWrapper.innerHTML = `<button class='btn__start'>Start game</button>`;
    container.append(btnWrapper);

    images.forEach((el, idx) => {
        const img = cardsData[id][idx].image;
        const element = el;
        element.style.backgroundImage = `url(./${ img })`;
        element.classList.add('card__img_play');
    });
    words.forEach((el, idx) => {
        const { word } = cardsData[id][idx];
        const element = el;
        element.innerHTML = `${ word }`;
        element.classList.add('hidden');
    });
    translations.forEach((el) => {
        const element = el;
        element.style.margin = '0';
    });
    cards.forEach((el) => {
        const element = el;
       element.style.height = '250px';
        element.style.background = 'none';
    });
}

