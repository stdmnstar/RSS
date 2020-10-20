// DOM Elements
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const focus = document.querySelector('.focus');

let nameOld = '';
let focusOld = '';

// Show Time
function showTime() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'
  ];
  //const today = new Date(2020, 09, 20, 5, 10, 10);
    const today = new Date();

  const hour = today.getHours();
  const min = today.getMinutes();
  const sec = today.getSeconds();
  const day = today.getDay();

  const month = today.getMonth();
  const dateOfMonth = today.getDate();
  const year = today.getFullYear();

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

  // Output Date
  date.innerHTML = `${daysOfWeek[day]}<span>,</span> ${dateOfMonth} ${months[month]} ${year}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  //const today = new Date(2020, 09, 20, 5, 10, 10);
  const today = new Date();
  const hour = today.getHours();

  if (hour < 6) {
    // Night
    document.body.style.backgroundImage =
      "url('./assets/images/night/19.jpg ')";
    greeting.textContent = 'Good Night, ';
    document.body.style.color = 'white';
  } else if (hour < 12) {
    // Morning
    document.body.style.backgroundImage =
      "url('./assets/images/morning/03.jpg ')";
    greeting.textContent = 'Good Morning, ';
    document.body.style.color = 'white';
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage =
      "url('./assets/images/day/20.jpg')";
    greeting.textContent = 'Good Afternoon, ';
    document.body.style.color = 'white';
  } else {
    // Evening
    document.body.style.backgroundImage =
      "url('./assets/images/evening/20.jpg')";
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed    
    if (e.which == 13 || e.keyCode == 13) {
      if ((e.target.innerText).trim() === '') {
        e.target.innerText = nameOld;
      }
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    if ((e.target.innerText).trim() === '') {
      e.target.innerText = nameOld;
    }
    localStorage.setItem('name', e.target.innerText);
  }
}

function nameClick(e) {
  nameOld = e.target.innerText;
  e.target.innerText = '';
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if ((e.target.innerText).trim() === '') {
        e.target.innerText = focusOld;
      }
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    if ((e.target.innerText).trim() === '') {
      e.target.innerText = focusOld;
    }
    localStorage.setItem('focus', e.target.innerText);
  }
}


function focusClick(e) {
  focusOld = e.target.innerText;
  e.target.innerText = '';
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', nameClick);

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', focusClick);

// Run
showTime();
setBgGreet();
getName();
getFocus();