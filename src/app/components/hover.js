const table = document.querySelector('.content__table');
const list = document.querySelector('.content__list');
const map = document.querySelector('.content__map ');
const chart = document.querySelector('.content__chart');
const arr = [table, list, map, chart];
let div; let
  allTF = true;
const after = document.createElement('div');
after.classList.add('after');

arr.forEach((el) => {
  el.addEventListener('mouseenter', (element) => {
    element.target.appendChild(after);
    after.addEventListener('click', opensize);
  });
  el.addEventListener('mouseleave', (element) => {
    element.target.removeChild(after);
    after.removeEventListener('click', opensize);
  });
});

// document.removeChild
function opensize(e) {
  div = e.target.parentElement;
  if (allTF) {
    div.classList.add('all');
    allTF = false;
    document.querySelector('.after').style.backgroundImage = "url('/assets/image/wrap.svg')";
    arr.forEach((el) => {
      if (el.classList[0] !== div.classList[0]) {
        el.style.display = 'none';
      }
    });
  } else {
    div.classList.remove('all');
    allTF = true;
    document.querySelector('.after').style.backgroundImage = "url('/assets/image/deploy.svg')";
    arr.forEach((el) => {
      if (el.classList[0] !== div.classList[0]) {
        el.style.display = '';
      }
    });
  }
}
