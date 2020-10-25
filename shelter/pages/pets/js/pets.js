
const menuIcon = document.querySelector(".burger-menu__button");
const navbar = document.querySelector(".burger-menu");
const overlay = document.querySelector(".burger-menu__overlay");
const body = document.querySelector("body");
const logo = document.querySelector(".logo");
const burgerLogo = document.querySelector(".burger-menu__logo");


logo.addEventListener('click', () => {
  location.href = "../main/index.html";
});
burgerLogo.addEventListener('click', () => {
  location.href = "../main/index.html";
});


menuIcon.addEventListener("click", () => {
    navbar.classList.toggle ("burger-menu_active");
    menuIcon.classList.toggle ("burger-menu__button_active");
    body.classList.toggle("lock");
    logo.classList.toggle("logo-hidden");
 
});

overlay.addEventListener("click", () => {
    navbar.classList.toggle ("burger-menu_active");
    menuIcon.classList.toggle ("burger-menu__button_active");
    body.classList.toggle("lock");
    logo.classList.toggle("logo-hidden");
 
});
