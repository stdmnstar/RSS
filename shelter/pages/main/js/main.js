document.querySelector('.content-section__button').addEventListener('click', () => {
  location.href = "../pets/pets.html";
});
document.querySelector('.our-friends__button').addEventListener('click', () => {
  location.href = "../pets/pets.html";
});

const menuIcon = document.querySelector(".burger-menu__button");
const navbar = document.querySelector(".burger-menu");
const overlay = document.querySelector(".burger-menu__overlay");
const body = document.querySelector("body");
const logo = document.querySelector(".logo");

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


const createPets = (petsList) => {
  const elem = document.querySelector("#pets");
  elem.innerHTML += createElements(petsList);
};

const createElements = (petsList) => {
  let str = '';
  for (let i = 0; i < petsList.length; i++) {
    str += `<div data-popup-target="#popup" class="swiper-slide our-friends-card">
<img src="${ petsList[i].img }" alt=" " class="our-friends-card__image">
<div class="our-friends-card__content">
    <h4 class="our-friends-card__title"> ${ petsList[i].name }</h4>
    <button class="our-friends-card__button">
        Learn more
    </button>
</div>
</div>`;

  }
  return str;
};

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

createPets(fullPetsList);


const slider = document.querySelector('.swiper-container');

let mySwiper = new Swiper(slider, {

  slidesPerView: 1,
  //	spaceBetween: 97,
  loop: true,
  //    slidesPerGroup: 3,
  breakpoints: {
    // when window width is >= 768px
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
      slidesPerGroup: 2,
    },
    // when window width is >= 1280px
    1280: {
      slidesPerView: 3,
      spaceBetween: 100,
      slidesPerGroup: 3,
    }
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});



const openPopupButtons = document.querySelectorAll('[data-popup-target]');
const closePopupButtons = document.querySelectorAll('[data-popup-close-button]');
const popupOverlay = document.getElementById('popup__overlay');

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

    document.querySelector('#popup').innerHTML = `<div class="popup__img-wrapper">
             <img class="popup__img" src=${petObj.img} alt=" ">
            </div>
            <div class="popup__content">
              <div class="popup__content_title">${petObj.name}</div>
              <div class="popup__content_subtitle">${petObj.type} - ${petObj.breed}</div>
              <div class="popup__content_subscribe">${petObj.description}</div>
              <ul class="popup_content_ul">
                 <li class="popup_content_li"><span><b>Age:</b> ${petObj.age}</span></li>
                  <li class="popup_content_li"><span><b>Inoculations:</b> ${petObj.inoculations}</span></li>
                  <li class="popup_content_li"><span><b>Diseases:</b> ${petObj.diseases}</span></li>
                  <li class="popup_content_li"><span><b>Parasites:</b> ${petObj.parasites}</span></li>
              </ul>
              <div data-popup-close-button class="popup__close-btn"></div>
            </div>`;
  });
});

popupOverlay.addEventListener('click', () => {
  const popups = document.querySelectorAll('.popup.active');
  popups.forEach(popup => {
    closePopup(popup);
  });
});

closePopupButtons.forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closePopup(popup);
  });
});

function openPopup(popup) {
  if (popup == null) return
  popup.classList.add('active');
  popupOverlay.classList.add('active');
  body.classList.add("lock");
}

function closePopup(popup) {
  if (popup == null) return
  popup.classList.remove('active');
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

popupOverlay.addEventListener("mouseover", changeStyleCloseBtnPopup);