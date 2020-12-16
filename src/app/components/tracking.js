import { change } from './change';
// TIME
const btnTime = document.querySelectorAll('#checkboxTime');
btnTime.forEach((el) => {
  el.checked = false;
  el.addEventListener(('change'), () => {
    const check = !!el.checked;
    btnTime.forEach((el) => {
      el.checked = check;
      el.nextElementSibling.classList.toggle('checkedTime');
    });
    change();
  });
});
// Population
const btnPopul = document.querySelectorAll('#checkboxPopul');
btnPopul.forEach((el) => {
  el.checked = false;
  el.addEventListener(('change'), () => {
    const check = !!el.checked;
    btnPopul.forEach((el) => {
      el.checked = check;
      el.nextElementSibling.classList.toggle('checkedPopul');
    });
    change();
  });
});
// Cases / Deaths / Recovered
const lists = document.querySelectorAll('#select');
lists.forEach((el) => {
  el.selectedIndex = 0;
  el.addEventListener('change', (event) => {
    lists.forEach((el) => {
      el.selectedIndex = event.target.selectedIndex;
    });
    change();
  });
});
