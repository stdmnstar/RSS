const menuIcon = document.querySelector(".burger-menu__button");
const navbar = document.querySelector(".burger-menu");
const overlay = document.querySelector(".burger-menu__overlay");
const body = document.querySelector("body");
const logo = document.querySelector(".logo");
const burgerLogo = document.querySelector(".burger-menu__logo");
let openPopupButtons = document.querySelectorAll('[data-popup-target]');

logo.addEventListener('click', () => {
  location.href = "../main/index.html";
});
burgerLogo.addEventListener('click', () => {
  location.href = "../main/index.html";
});

menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("burger-menu_active");
  menuIcon.classList.toggle("burger-menu__button_active");
  body.classList.toggle("lock");
  logo.classList.toggle("logo-hidden");

});

overlay.addEventListener("click", () => {
  navbar.classList.toggle("burger-menu_active");
  menuIcon.classList.toggle("burger-menu__button_active");
  body.classList.toggle("lock");
  logo.classList.toggle("logo-hidden");

});


let pets = [{
    "name": "Jennifer",
    "img": "../../assets/images/pets/pets-jennifer.png",
    "type": "Dog",
    "breed": "Labrador",
    "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
    "age": "2 months",
    "inoculations": ["none"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Sophia",
    "img": "../../assets/images/pets/pets-sophia.png",
    "type": "Dog",
    "breed": "Shih tzu",
    "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
    "age": "1 month",
    "inoculations": ["parvovirus"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Woody",
    "img": "../../assets/images/pets/pets-woody.png",
    "type": "Dog",
    "breed": "Golden Retriever",
    "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side.",
    "age": "3 years 6 months",
    "inoculations": ["adenovirus", "distemper"],
    "diseases": ["right back leg mobility reduced"],
    "parasites": ["none"]
  },
  {
    "name": "Scarlett",
    "img": "../../assets/images/pets/pets-scarlet.png",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "Scarlett is a happy, playful girl. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
    "age": "3 months",
    "inoculations": ["none"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Katrine",
    "img": "../../assets/images/pets/pets-katrine.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection.",
    "age": "6 months",
    "inoculations": ["panleukopenia"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Timmy",
    "img": "../../assets/images/pets/pets-timmy.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Timmy is an adorable grey british shorthair male. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held.",
    "age": "2 years 3 months",
    "inoculations": ["calicivirus"],
    "diseases": ["kidney stones"],
    "parasites": ["none"]
  },
  {
    "name": "Freddie",
    "img": "../../assets/images/pets/pets-freddie.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life.",
    "age": "2 months",
    "inoculations": ["rabies"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Charly",
    "img": "../../assets/images/pets/pets-charly.png",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home.",
    "age": "8 years",
    "inoculations": ["leptospirosis"],
    "diseases": ["deafness", "blindness"],
    "parasites": ["lice", "fleas"]
  }
]; // 8

let fullPetsList = []; // 48

fullPetsList = (() => {
  let tempArr = [];

  for (let i = 0; i < 6; i++) {
    const newPets = pets;

    for (let j = pets.length; j > 0; j--) {
      let randInd = Math.floor(Math.random() * j);
      const randElem = newPets.splice(randInd, 1)[0];
      newPets.push(randElem);
    }

    tempArr = [...tempArr, ...newPets];
  }
  return tempArr;
})();


const sort863 = (list) => {
  let unique8List = [];
  let length = list.length;
  for (let i = 0; i < length / 8; i++) {
    const uniqueStepList = [];
    for (j = 0; j < list.length; j++) {
      if (uniqueStepList.length >= 8) {
        break;
      }
      const isUnique = !uniqueStepList.some((item) => {
        return item.name === list[j].name;
      });
      if (isUnique) {
        uniqueStepList.push(list[j]);
        list.splice(j, 1);
        j--;
      }
    }
    unique8List = [...unique8List, ...uniqueStepList];
  }
  list = unique8List;

  list = sort6recursively(list);

  return list;
};

const sort6recursively = (list) => {
  const length = list.length;

  for (let i = 0; i < (length / 6); i++) {
    const stepList = list.slice(i * 6, (i * 6) + 6);

    for (let j = 0; j < 6; j++) {
      const duplicatedItem = stepList.find((item, ind) => {
        return item.name === stepList[j].name && (ind !== j);
      });

      if (duplicatedItem !== undefined) {
        const ind = (i * 6) + j;
        const which8OfList = Math.trunc(ind / 8);

        list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

        sort6recursively(list);
      }
    }
  }
  return list;
};

fullPetsList = sort863(fullPetsList);

const sliderItem = document.querySelectorAll('.our-friends-card');

const paginationButtons = document.querySelectorAll('.slider-button');
const previousButton = document.getElementById('prevPage');
const nextButton = document.getElementById('nextPage');
const firstPageButton = document.getElementById('startPage');
const lastPageButton = document.getElementById('endPage');
const sliderPageNumber = document.getElementById('countPage');

const cardWrapper = document.querySelector(".our-friends-cards");

let currentPage = 1;
sliderPageNumber.innerHTML = currentPage;

let boardSize = setNumsElementOnPage();
let maxPage = setMaxPage();

function insertItems() {
  let str = '';
  boardSize = setNumsElementOnPage();
  let start = boardSize * (currentPage - 1);

  for (let i = start; i < start + boardSize; i++) {
    str = str + `<div data-popup-target="#popup" class="our-friends-card">
                     <img src="${fullPetsList[i].img}" alt=" "
                           class="our-friends-card__image">
                     <div class="our-friends-card__content">
                          <h4 class="our-friends-card__title">${fullPetsList[i].name}</h4>
                          <button class="our-friends-card__button">Learn more</button>
                     </div>
                  </div>`;
  }
  cardWrapper.innerHTML = str;

  openPopupButtons = document.querySelectorAll('[data-popup-target]');
  listernPopupBtn();
}

insertItems(fullPetsList.slice((currentPage - 1) * boardSize, (currentPage - 1) * boardSize + boardSize));

nextButton.addEventListener('click', () => {
  maxPage = setMaxPage();
  currentPage += 1;
  sliderPageNumber.innerHTML = currentPage;

  getContent(currentPage);
  if (currentPage > 1) {
    previousButton.classList.remove('slider-button_inactive');
    previousButton.classList.add('slider-button_normal');
    previousButton.disabled = false;
    firstPageButton.classList.remove('slider-button_inactive');
    firstPageButton.classList.add('slider-button_normal');
    firstPageButton.disabled = false;
  }
  if (currentPage === maxPage) {
    nextButton.classList.add('slider-button_inactive');
    nextButton.classList.remove('slider-button_normal');
    nextButton.disabled = true;
    lastPageButton.classList.add('slider-button_inactive');
    lastPageButton.classList.remove('slider-button_normal');
    lastPageButton.disabled = true;
  }
});

previousButton.addEventListener('click', () => {
  maxPage = setMaxPage();
  currentPage -= 1;
  sliderPageNumber.innerHTML = currentPage;

  getContent(currentPage);

  if (currentPage > 1) {
    nextButton.classList.remove('slider-button_inactive');
    nextButton.classList.add('slider-button_normal');
    nextButton.disabled = false;
    lastPageButton.classList.remove('slider-button_inactive');
    lastPageButton.classList.add('slider-button_normal');
    lastPageButton.disabled = false;
  } else {
    previousButton.classList.add('slider-button_inactive');
    previousButton.classList.remove('slider-button_normal');
    previousButton.disabled = true;
    firstPageButton.classList.add('slider-button_inactive');
    firstPageButton.classList.remove('slider-button_normal');
    firstPageButton.disabled = true;
  }
});

firstPageButton.addEventListener('click', () => {
  maxPage = setMaxPage();
  currentPage = 1;
  sliderPageNumber.innerHTML = currentPage;
  getContent(currentPage);
  previousButton.classList.add('slider-button_inactive');
  previousButton.classList.remove('slider-button_normal');
  previousButton.disabled = true;
  firstPageButton.classList.add('slider-button_inactive');
  firstPageButton.classList.remove('slider-button_normal');
  firstPageButton.disabled = true;
  nextButton.classList.remove('slider-button_inactive');
  nextButton.classList.add('slider-button_normal');
  nextButton.disabled = false;
  lastPageButton.classList.remove('slider-button_inactive');
  lastPageButton.classList.add('slider-button_normal');
  lastPageButton.disabled = false;
});

lastPageButton.addEventListener('click', () => {
  maxPage = setMaxPage();
  currentPage = maxPage;
  sliderPageNumber.innerHTML = currentPage;
  getContent(currentPage);
  nextButton.classList.add('slider-button_inactive');
  nextButton.classList.remove('slider-button_normal');
  nextButton.disabled = true;
  lastPageButton.classList.add('slider-button_inactive');
  lastPageButton.classList.remove('slider-button_normal');
  lastPageButton.disabled = true;
  previousButton.classList.remove('slider-button_inactive');
  previousButton.classList.add('slider-button_normal');
  previousButton.disabled = false;
  firstPageButton.classList.remove('slider-button_inactive');
  firstPageButton.classList.add('slider-button_normal');
  firstPageButton.disabled = false;
});

window.addEventListener('resize', function () {
  if (window.innerWidth < 1279 && window.innerWidth >= 768) {
    maxPage = setMaxPage();
    checkLastPage();
    boardSize = 6;
    getContent(currentPage);
    return;
  }

  if (window.innerWidth < 768) {
    maxPage = setMaxPage();
    checkLastPage();
    boardSize = 3;
    return;
  }

  checkLastPage();
  maxPage = setMaxPage();
  sliderPageNumber.innerHTML = currentPage;
  getContent(currentPage);
}, false);

function checkLastPage() {
  maxPage = setMaxPage();
  if (currentPage >= maxPage) {
    currentPage = setMaxPage();
    nextButton.classList.add('slider-button_inactive');
    nextButton.classList.remove('slider-button_normal');
    nextButton.disabled = true;
    lastPageButton.classList.add('slider-button_inactive');
    lastPageButton.classList.remove('slider-button_normal');
    lastPageButton.disabled = true;
    sliderPageNumber.innerHTML = currentPage;
  } else {
    nextButton.classList.remove('slider-button_inactive');
    nextButton.classList.add('slider-button_normal');
    nextButton.disabled = false;
    lastPageButton.classList.remove('slider-button_inactive');
    lastPageButton.classList.add('slider-button_normal');
    lastPageButton.disabled = false;
  }
}


function deletePreviousElements() {
  sliderItem.forEach(slide => {
    slide.classList.remove('visible');
  });
  setTimeout(() => {
    sliderItem.forEach(slide => {
      while (slide.firstChild) {
        slide.removeChild(slide.firstChild);
      }
    });
  }, 200);
}

function getContent(page) {
  //deletePreviousElements();

  setTimeout(() => {
    insertItems(fullPetsList.slice((page - 1) * boardSize, (page - 1) * boardSize + boardSize));
  }, 200);
}


function setMaxPage() {
  let width = document.documentElement.clientWidth;
  if (width > 1279) {
    return 6;
  } else if (width < 768) {
    return 16;
  } else {
    return 8;
  }
}

function setNumsElementOnPage() {
  let width = document.documentElement.clientWidth;
  if (width > 1279) {
    return 8;
  } else if (width < 768) {
    return 3;
  } else {
    return 6;
  }
}


//popup

const closePopupButton = document.querySelector('[data-popup-close-button]');
const popupOverlay = document.getElementById('popup__overlay');
//openPopupButtons = document.querySelectorAll('[data-popup-target]');
//listernPopupBtn();

function listernPopupBtn() {

  openPopupButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const popup = document.querySelector(button.dataset.popupTarget);
      openPopup(popup);
      const namePet = e.currentTarget.getElementsByClassName('our-friends-card__title')[0].innerText;
      let petObj = {};
      for (let i = 0; i < fullPetsList.length; i++) {
        if (fullPetsList[i].name === namePet) {
          petObj = fullPetsList[i];
        }
      }
      document.querySelector('.popup__img-wrapper').innerHTML = `<img class="popup__img" src=${petObj.img} alt=" ">`;
      document.querySelector('.popup__content_title').innerText = ` ${petObj.name}`;
      document.querySelector('.popup__content_subtitle').innerText = ` ${petObj.type} - ${petObj.breed}`;
      document.querySelector('.popup__content_subscribe').innerText = ` ${petObj.description}`;
      document.querySelector('.popup_content_ul').innerHTML = `<li class="popup_content_li"><span><b>Age:</b> ${petObj.age}</span></li>
    <li class="popup_content_li"><span><b>Inoculations:</b> ${petObj.inoculations}</span></li>
    <li class="popup_content_li"><span><b>Diseases:</b> ${petObj.diseases}</span></li>
    <li class="popup_content_li"><span><b>Parasites:</b> ${petObj.parasites}</span></li>`;
    });
  });
}

popupOverlay.addEventListener('click', () => {
  const popups = document.querySelectorAll('.popup.active');
  popups.forEach(popup => {
    closePopup(popup);
  });
});

closePopupButton.addEventListener('click', () => {
  closePopup();
});


function openPopup(popup) {
  if (popup == null) return
  popup.classList.add('active');
  popupOverlay.classList.add('active');
  body.classList.add("lock");

}

function closePopup(event) {
  document.querySelector(".popup").classList.remove('active');
  popupOverlay.classList.remove('active');
  body.classList.remove("lock");
}

const changeStyleCloseBtnPopup = function (event) {
  if (event.target === popupOverlay) {
    document.querySelector(".popup__close-btn").classList.add('popup_close-btn-hover');
  } else {
    document.querySelector(".popup__close-btn").classList.remove('popup_close-btn-hover');
  }
};

popupOverlay.addEventListener("mouseover", changeStyleCloseBtnPopup, false);
document.querySelector(".popup").addEventListener('mouseover', changeStyleCloseBtnPopup)