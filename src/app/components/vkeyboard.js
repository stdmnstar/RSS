let textarea;
const keyboardDownSimbol = '🔻';
const BackspaceSimbol = String.fromCharCode(0x232B);
const spaceSimbol = '';
const arrowRightSimbol = String.fromCharCode(8594);
const arrowLeftSimbol = String.fromCharCode(8592);
const arrowUpSimbol = '🎤';
const arrowDownSimbol = '🔇';
const ContextMenuSimbol = '©';

const inputEvent = new InputEvent('input', {
  cancelable: true,
});

let rec;
let supportSpeech = true;
if (window.SpeechRecognition || window.webkitSpeechRecognition) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  rec = new SpeechRecognition();
} else {
  supportSpeech = false;
}

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    unused: null,
  },

  properties: {
    value: '',
    capsLock: false,
    shift: false,
    ctrl: false,
    alt: false,
  },

  controlKeys: {
    Backspace: 13,
    Tab: 14,
    CapsLock: 28,
    Enter: 40,
    ShiftLeft: 41,
    SpeechArrowUp: 52,
    ControlLeft: 53,
    hideKeyboard: 54,
    AltLeft: 55,
    Space: 56,
    ContextMenu: 57,
    ArrowLeft: 58,
    SoundArrowDown: 59,
    ArrowRight: 60,
  },

  keyArrayLayout: [
    ['Backquote', '`', '`', '~', '~'],
    ['Digit1', '1', '1', '!', '!'],
    ['Digit2', '2', '2', '@', '@'],
    ['Digit3', '3', '3', '#', '#'],
    ['Digit4', '4', '4', '$', '$'],
    ['Digit5', '5', '5', '%', '%'],
    ['Digit6', '6', '6', '^', '^'],
    ['Digit7', '7', '7', '&', '&'],
    ['Digit8', '8', '8', '*', '*'],
    ['Digit9', '9', '9', '(', '('],
    ['Digit0', '0', '0', ')', ')'],
    ['Minus', '-', '-', '_', '_', '-', '-', '_', '_'],
    ['Equal', '=', '=', '+', '+', '=', '=', '+', '+'],
    ['Backspace', BackspaceSimbol, BackspaceSimbol, BackspaceSimbol, BackspaceSimbol],
    ['Tab', 'Tab', 'Tab', 'Tab', 'Tab'],
    ['KeyQ', 'q', 'Q', 'Q', 'q'],
    ['KeyW', 'w', 'W', 'W', 'w'],
    ['KeyE', 'e', 'E', 'E', 'e'],
    ['KeyR', 'r', 'R', 'R', 'r'],
    ['KeyT', 't', 'T', 'T', 't'],
    ['KeyY', 'y', 'Y', 'Y', 'y'],
    ['KeyU', 'u', 'U', 'U', 'u'],
    ['KeyI', 'i', 'I', 'I', 'i'],
    ['KeyO', 'o', 'O', 'O', 'o'],
    ['KeyP', 'p', 'P', 'P', 'p'],
    ['BracketLeft', '[', '[', '{', '{'],
    ['BracketRight', ']', ']', '}', '}'],
    ['Backslash', '\\', '\\', '|', '|'],
    ['CapsLock', 'Caps', 'Caps', 'Caps', 'Caps'],
    ['KeyA', 'a', 'A', 'A', 'a'],
    ['KeyS', 's', 'S', 'S', 's'],
    ['KeyD', 'd', 'D', 'D', 'd'],
    ['KeyF', 'f', 'F', 'F', 'f'],
    ['KeyG', 'g', 'G', 'G', 'g'],
    ['KeyH', 'h', 'H', 'H', 'h'],
    ['KeyJ', 'j', 'J', 'J', 'j'],
    ['KeyK', 'k', 'K', 'K', 'k'],
    ['KeyL', 'l', 'L', 'L', 'l'],
    ['Semicolon', ';', ';', ':', ':'],
    ['Quote', '\'', '\'', '"', '"'],
    ['Enter', 'Enter', 'Enter', 'Enter', 'Enter'],
    ['ShiftLeft', 'Shift', 'Shift', 'Shift', 'Shift'],
    ['KeyZ', 'z', 'Z', 'Z', 'z'],
    ['KeyX', 'x', 'X', 'X', 'x'],
    ['KeyC', 'c', 'C', 'C', 'c'],
    ['KeyV', 'v', 'V', 'V', 'v'],
    ['KeyB', 'b', 'B', 'B', 'b'],
    ['KeyN', 'n', 'N', 'N', 'n'],
    ['KeyM', 'm', 'M', 'M', 'm'],
    ['Comma', ',', ',', '<', '<'],
    ['Period', '.', '.', '>', '>'],
    ['Slash', '/', '/', '?', '?'],
    ['SpeechArrowUp', arrowUpSimbol, arrowUpSimbol, arrowUpSimbol, arrowUpSimbol],
    ['ControlLeft', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl'],
    ['hideKeyboard', keyboardDownSimbol, keyboardDownSimbol, keyboardDownSimbol, keyboardDownSimbol],
    ['AltLeft', 'Alt', 'Alt', 'Alt', 'Alt'],
    ['Space', spaceSimbol, spaceSimbol, spaceSimbol, spaceSimbol],
    ['ContextMenu', ContextMenuSimbol, ContextMenuSimbol, ContextMenuSimbol, ContextMenuSimbol],
    ['ArrowLeft', arrowLeftSimbol, arrowLeftSimbol, arrowLeftSimbol, arrowLeftSimbol],
    ['SoundArrowDown', arrowDownSimbol, arrowDownSimbol, arrowDownSimbol, arrowDownSimbol],
    ['ArrowRight', arrowRightSimbol, arrowRightSimbol, arrowRightSimbol, arrowRightSimbol],
  ],

  keyArrayDecode: {
    Backquote: 0,
    Digit1: 1,
    Digit2: 2,
    Digit3: 3,
    Digit4: 4,
    Digit5: 5,
    Digit6: 6,
    Digit7: 7,
    Digit8: 8,
    Digit9: 9,
    Digit0: 10,
    Minus: 11,
    Equal: 12,
    Backspace: 13,
    Tab: 14,
    KeyQ: 15,
    KeyW: 16,
    KeyE: 17,
    KeyR: 18,
    KeyT: 19,
    KeyY: 20,
    KeyU: 21,
    KeyI: 22,
    KeyO: 23,
    KeyP: 24,
    BracketLeft: 25,
    BracketRight: 26,
    Backslash: 27,
    CapsLock: 28,
    KeyA: 29,
    KeyS: 30,
    KeyD: 31,
    KeyF: 32,
    KeyG: 33,
    KeyH: 34,
    KeyJ: 35,
    KeyK: 36,
    KeyL: 37,
    Semicolon: 38,
    Quote: 39,
    Enter: 40,
    ShiftLeft: 41,
    KeyZ: 42,
    KeyX: 43,
    KeyC: 44,
    KeyV: 45,
    KeyB: 46,
    KeyN: 47,
    KeyM: 48,
    Comma: 49,
    Period: 50,
    Slash: 51,
    SpeechArrowUp: 52,
    ControlLeft: 53,
    hideKeyboard: 54,
    AltLeft: 55,
    Space: 56,
    ContextMenu: 57,
    ArrowLeft: 58,
    SoundArrowDown: 59,
    ArrowRight: 60,
  },

  init() {
    this.elements.main = document.createElement('div');
    this.elements.main.setAttribute('tabindex', '0');
    this.elements.keysContainer = document.createElement('div');

    this.elements.main.classList.add('keyboard', 'keyboard--hidden');
    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this.createKeys());

    this.elements.main.appendChild(this.elements.keysContainer);
    // document.body.appendChild(addHtml());
    document.body.appendChild(this.elements.main);
    textarea = document.querySelector('#search');
    this.elements.keys = document.querySelectorAll('.keyboard__key');
  },

  createKeys() {
    const fragment = document.createDocumentFragment();

    this.keyArrayLayout.forEach((keymass) => {
      const keyElement = document.createElement('div');
      const insertLineBreak = ['Backspace', 'Backslash', 'Enter', 'SpeechArrowUp', 'ArrowRight'].indexOf(keymass[0]) !== -1;

      keyElement.classList.add('keyboard__key');
      keyElement.setAttribute('id', keymass[0]);
      const langIndex = 1;
      switch (keymass[0]) {
        case 'Backspace':
          keyElement.classList.add('keyboard__key_wide', 'control-text-key2');
          keyElement.classList.add('keyboard__key_control');
          break;
        case 'Tab':
          keyElement.classList.add('keyboard__key_w', 'control-text-key2');
          keyElement.classList.add('keyboard__key_control');
          break;
        case 'CapsLock':
          keyElement.classList.add('keyboard__key_wide', 'control-text-key2');
          keyElement.classList.add('keyboard__key_control');
          break;
        case 'Enter':
          keyElement.classList.add('keyboard__key_wider', 'control-text-key2');
          keyElement.classList.add('keyboard__key_control');
          break;
        case 'ShiftLeft':
          keyElement.classList.add('keyboard__key_the-widest', 'control-text-key');
          keyElement.classList.add('keyboard__key_control');
          break;
        case 'SpeechArrowUp':
          keyElement.classList.add('keyboard__key_control');
          break;
        case 'ArrowLeft':
          keyElement.classList.add('keyboard__key_control');
          break;
        case 'SoundArrowDown':
          keyElement.classList.add('keyboard__key_control');
          keyElement.classList.add('keyboard__key-ON');
          break;
        case 'ArrowRight':
          keyElement.classList.add('keyboard__key_control');
          break;
        case 'ControlLeft':
          keyElement.classList.add('keyboard__key_w', 'control-text-key');
          keyElement.classList.add('keyboard__key_control');
          break;
        case 'hideKeyboard':
          keyElement.classList.add('keyboard__key_w', 'control-text-key2');
          keyElement.classList.add('keyboard__key_control');
          break;
        case 'AltLeft':
          keyElement.classList.add('keyboard__key_w', 'control-text-key');
          keyElement.classList.add('keyboard__key_control');
          break;
        case 'ContextMenu':
          keyElement.classList.add('keyboard__key_w', 'control-text-key2');
          keyElement.classList.add('keyboard__key_control');
          break;
        case 'Space':
          keyElement.classList.add('keyboard__key_extra-wide', 'control-text-key');
          keyElement.classList.add('keyboard__key_control');
          break;
        default:
          break;
      }
      keyElement.textContent = keymass[langIndex];

      fragment.appendChild(keyElement);
      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });
    return fragment;
  },
};

let keyPressedByMouseId;
let keypressed = false;
let globalCapslock = false;
let globalShift = false;
let globalCtrl = false;
let globalAlt = false;
let globalSpeechON = false;
let globalSoundON = true;
let mouseControl = false;
let mouseShift = false;
let mouseAlt = false;
let keyboardShift = false;
let keyboardAlt = false;
let keyboardControl = false;

function playSound(event) {
  if (globalSoundON) {
    return;
  }
  const audio = new Audio();
  switch (event) {
    case 'Enter':
      audio.src = '../../assets/audio/enter.wav';
      break;
    case 'ShiftLeft':
      audio.src = '../../assets/audio/shift.wav';
      break;
    case 'CapsLock':
      audio.src = '../../assets/audio/caplock.wav';
      break;
    case 'Backspace':
      audio.src = '../../assets/audio/backspace.wav';
      break;

    default:
      audio.src = '../../assets/audio/en.wav';
      break;
  }
  if (!audio) {
    return;
  }
  audio.currentTime = 0;
  audio.play();
}

function inputBackspaceToTextarea() {
  const start = textarea.selectionStart;
  if (textarea.selectionStart !== textarea.selectionEnd) {
    textarea.value = textarea.value.slice(0, textarea.selectionStart)
      + textarea.value.slice(textarea.selectionEnd);
    textarea.selectionEnd = start;
  } else if (textarea.selectionStart > 0) {
    textarea.value = textarea.value.slice(0, textarea.selectionStart - 1)
      + textarea.value.slice(textarea.selectionEnd);
    textarea.selectionStart = start - 1;
    textarea.selectionEnd = start - 1;
  }
}

function inputStringToTextarea(str) {
  const start = textarea.selectionStart;
  if (textarea.selectionStart !== textarea.selectionEnd) {
    textarea.value = textarea.value.slice(0, textarea.selectionStart) + str
      + textarea.value.slice(textarea.selectionEnd);
  } else if (textarea.value.length === textarea.selectionStart) {
    textarea.value += str;
  } else {
    textarea.value = textarea.value.slice(0, textarea.selectionStart) + str
      + textarea.value.slice(textarea.selectionEnd);
  }
  textarea.selectionStart = start + str.length;
  textarea.selectionEnd = start + str.length;
}

function changeKeyCaps() {
  let keyCapsIndex = 1;

  if (globalCapslock) {
    keyCapsIndex += 1;
  }
  if (globalShift) {
    keyCapsIndex += 2;
  }
  Keyboard.elements.keys.forEach((key, index) => {
    key.textContent = Keyboard.keyArrayLayout[index][keyCapsIndex];
  });
}

function shiftResolve(keyevent) {
  if (keyevent.key === 'mousedown') {
    if (!mouseShift) {
      mouseShift = true;
    } else {
      mouseShift = false;
    }
  } else if (keyevent.key === 'mouseup') {} else if (keyevent.type === 'keyup') {
    keyboardShift = false;
    mouseShift = false;
  } else {
    keyboardShift = true;
  }
  if (mouseShift || keyboardShift) {
    if (!globalShift) {
      globalShift = true;
      changeKeyCaps();
    }
  } else if (globalShift) {
    globalShift = false;
    changeKeyCaps();
  }
  if (!globalShift) {
    return true;
  }
  return false;
}

function resultSpeachToTextarea(e) {
  const text = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join('');

  if (e.results[0].isFinal) {
    inputStringToTextarea(text);
  }
  textarea.dispatchEvent(inputEvent);
}

function inputSpeechArrowUpToTextarea() {
  if (globalSpeechON) {
    rec.interimResults = false;
    rec.addEventListener('result', resultSpeachToTextarea);
    rec.addEventListener('end', rec.start);
    rec.lang = 'en-US';
    rec.start();
  } else {
    rec.removeEventListener('result', resultSpeachToTextarea);
    rec.removeEventListener('end', rec.start);
    rec.stop();
  }
}

function controlResolve(keyevent) {
  if (keyevent.key === 'mousedown') {
    if (!mouseControl) {
      mouseControl = true;
    } else {
      mouseControl = false;
    }
  } else if (keyevent.key === 'mouseup') {
  } else if (keyevent.type === 'keyup') {
    keyboardControl = false;
    mouseControl = false;
  } else {
    keyboardControl = true;
  }
  if (mouseControl || keyboardControl) {
    if (!globalCtrl) {
      globalCtrl = true;
    }
  } else if (globalCtrl) {
    globalCtrl = false;
  }
  if (!globalCtrl) {
    return true;
  }
  return false;
}

function altResolve(keyevent) {
  if (keyevent.key === 'mousedown') {
    if (!mouseAlt) {
      mouseAlt = true;
    } else {
      mouseAlt = false;
    }
  } else if (keyevent.key === 'mouseup') {} else if (keyevent.type === 'keyup') {
    keyboardAlt = false;
    mouseAlt = false;
  } else {
    keyboardAlt = true;
  }
  if (mouseAlt || keyboardAlt) {
    if (!globalAlt) {
      globalAlt = true;
    }
  } else if (globalAlt) {
    globalAlt = false;
  }
  if (!globalAlt) {
    return true;
  }
  return false;
}

function inputArrowLeftToTextarea() {
  if (textarea.selectionStart > 0) {
    textarea.selectionEnd = textarea.selectionStart - 1;
    textarea.selectionStart = textarea.selectionEnd;
  }
}

function inputArrowRightToTextarea() {
  if (textarea.selectionEnd < textarea.value.length) {
    textarea.selectionEnd += 1;
    textarea.selectionStart = textarea.selectionEnd;
  }
}

function controlKeyProcessing(keyevent) {
  switch (keyevent.code) {
    case 'Backspace':
      inputBackspaceToTextarea();
      break;
    case 'Tab':
      inputStringToTextarea('\t');
      break;
    case 'CapsLock':
      Keyboard.elements.keys[Keyboard.controlKeys.CapsLock].classList.toggle('keyboard__key-ON');
      globalCapslock = !globalCapslock;
      changeKeyCaps();
      break;
    case 'Enter':
      inputStringToTextarea('\n');
      break;
    case 'ShiftLeft':
      shiftResolve(keyevent);
      break;
    case 'SpeechArrowUp':
      if (supportSpeech) {
        Keyboard.elements.keys[Keyboard.controlKeys.SpeechArrowUp].classList.toggle('keyboard__key-ON');
        globalSpeechON = !globalSpeechON;
        inputSpeechArrowUpToTextarea();
      } else {
        alert('Your browser does not support voice input');
      }
      break;
    case 'ControlLeft':
      controlResolve(keyevent);
      break;
    case 'hideKeyboard':
      document.querySelector('.keyboard').classList.add('keyboard--hidden');
      break;
    case 'AltLeft':
      altResolve(keyevent);
      break;
    case 'Space':
      inputStringToTextarea(' ');
      break;
    case 'ContextMenu':
      break;
    case 'ArrowLeft':
      inputArrowLeftToTextarea();
      break;
    case 'SoundArrowDown':
      Keyboard.elements.keys[Keyboard.controlKeys.SoundArrowDown].classList.toggle('keyboard__key-ON');
      globalSoundON = !globalSoundON;
      break;
    case 'ArrowRight':
      inputArrowRightToTextarea();
      break;
    default:
      break;
  }
}

function keyDown(keyevent) {
  keyevent.preventDefault();
  if (keyevent.code in Keyboard.keyArrayDecode) {
    playSound(keyevent.code);
    const keyNum = Keyboard.keyArrayDecode[keyevent.code];
    Keyboard.elements.keys[keyNum].classList.add('keyboard__key_pressed');
    textarea.focus();
    if (keyevent.code in Keyboard.controlKeys) {
      controlKeyProcessing(keyevent);
    } else if (globalAlt || globalCtrl) {
      if (globalAlt) {
        mouseAlt = false;
        const newevent = new KeyboardEvent('keyup', {
          key: 'mouseup',
          code: 'AltLeft',
        });
        if (altResolve(newevent)) {
          Keyboard.elements.keys[Keyboard.controlKeys.AltLeft].classList.remove('keyboard__key_pressed');
        }
      }
      if (globalCtrl) {
        mouseControl = false;
        const newevent = new KeyboardEvent('keyup', {
          key: 'mouseup',
          code: 'ControlLeft',
        });
        if (controlResolve(newevent)) {
          Keyboard.elements.keys[Keyboard.controlKeys.ControlLeft].classList.remove('keyboard__key_pressed');
        }
      }
    } else if (globalShift) {
      inputStringToTextarea(Keyboard.elements.keys[Keyboard.keyArrayDecode[keyevent.code]]
        .innerText);
      mouseShift = false;
      const newevent = new KeyboardEvent('keyup', {
        key: 'mouseup',
        code: 'ShiftLeft',
      });
      keyevent.code = 'ShiftLeft';
      keyevent.key = 'mouseup';

      if (shiftResolve(newevent)) {
        Keyboard.elements.keys[Keyboard.controlKeys.ShiftLeft].classList.remove('keyboard__key_pressed');
      }
    } else {
      inputStringToTextarea(Keyboard.elements.keys[Keyboard.keyArrayDecode[keyevent.code]]
        .innerText);
    }
  }
}

function resolveMouseKeyup(keyevent) {
  let result = false;
  if (keyevent.code === 'ControlLeft') {
    result = controlResolve(keyevent);
  } else if (keyevent.code === 'ShiftLeft') {
    result = shiftResolve(keyevent);
  } else if (keyevent.code === 'AltLeft') {
    result = altResolve(keyevent);
  }
  return result;
}

function keyUp(keyevent) {
  keyevent.preventDefault();
  textarea.dispatchEvent(inputEvent);
  if (keyevent.code in Keyboard.keyArrayDecode) {
    const keyNum = Keyboard.keyArrayDecode[keyevent.code];
    if (!((keyevent.code === 'ShiftLeft') || (keyevent.code === 'AltLeft') || (keyevent.code === 'ControlLeft'))) {
      Keyboard.elements.keys[keyNum].classList.remove('keyboard__key_pressed');
    } else if (resolveMouseKeyup(keyevent)) {
      Keyboard.elements.keys[keyNum].classList.remove('keyboard__key_pressed');
    }
  }
}

function mouseUp(event) {
  event.preventDefault();
  if (keypressed) {
    keypressed = false;
    const newevent = new KeyboardEvent('keyup', {
      key: 'mouseup',
      code: keyPressedByMouseId,
    });
    document.dispatchEvent(newevent);
  }
}

function mouseDown(event) {
  event.preventDefault();
  if ((event.target.classList.contains('keyboard__key')) && (event.which === 1)) {
    keyPressedByMouseId = event.target.id;
    keypressed = true;
    const newevent = new KeyboardEvent('keydown', {
      key: 'mousedown',
      code: event.target.id,
    });
    document.dispatchEvent(newevent);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
  document.addEventListener('keydown', keyDown);
  document.addEventListener('keyup', keyUp);
  document.addEventListener('mouseup', mouseUp);

  Keyboard.elements.main.addEventListener('mousedown', mouseDown);
  document.querySelector('.vkeyboard-button').addEventListener('click', () => {
    document.querySelector('.keyboard').classList.remove('keyboard--hidden');
  });
});
