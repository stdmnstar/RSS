import change from './change';
// TIME
const btnTime = document.querySelectorAll('#checkboxTime');
btnTime.forEach((el) => {
  const element = el;
  element.checked = false;
  element.addEventListener(('change'), () => {
    const check = !!element.checked;
    btnTime.forEach((btn) => {
      const elem = btn;
      elem.checked = check;
      elem.nextElementSibling.classList.toggle('checkedTime');
    });
    change();
  });
});
// Population
const btnPopul = document.querySelectorAll('#checkboxPopul');
btnPopul.forEach((el) => {
  const element = el;
  element.checked = false;
  element.addEventListener(('change'), () => {
    const check = !!element.checked;
    btnPopul.forEach((btn) => {
      const elem = btn;
      elem.checked = check;
      elem.nextElementSibling.classList.toggle('checkedPopul');
    });
    change();
  });
});
// Cases / Deaths / Recovered
const lists = document.querySelectorAll('#select');
lists.forEach((el) => {
  const element = el;
  element.selectedIndex = 0;
  element.addEventListener('change', (event) => {
    lists.forEach((option) => {
      const elem = option;
      elem.selectedIndex = event.target.selectedIndex;
    });
    change();
  });
});
