
import '../css/style.scss';
import { addDomElements } from './dom';
import {
    addMainPage,
    addClickToggle,
    addClickCard,
    addClickMenu,
    menuHidden
} from './game';

import { 
    checkLocalStorage,
    saveStatistics,
    addClickReset
} from './statistics';

addDomElements();
addMainPage();
addClickToggle();
addClickCard();
addClickMenu();
menuHidden();
checkLocalStorage();
addClickReset();

window.onbeforeunload = () => {
    localStorage.setItem('statistics', saveStatistics()); 
  };