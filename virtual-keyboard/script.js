let textarea;
//const keyboardDownSimbol = String.fromCharCode(10507);
const keyboardDownSimbol = '🔻';
const BackspaceSimbol = String.fromCharCode(0x232B);
const spaceSimbol = '';
const arrowRightSimbol = String.fromCharCode(8594);
const arrowLeftSimbol = String.fromCharCode(8592);
//const arrowUpSimbol = String.fromCharCode(8593);
const arrowUpSimbol = "🎤";
//const arrowDownSimbol = String.fromCharCode(8595);
const arrowDownSimbol = '🔇';


const Keyboard = {
    language: 'en',
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
        'Backspace': 13,
        'Tab': 14,
        'CapsLock': 28,
        'Enter': 40,
        'ShiftLeft': 41,
        'ArrowUp': 52,
        'ControlLeft': 53,
        'hideKeyboard': 54,
        'AltLeft': 55,
        'Space': 56,
        'ContextMenu': 57,
        'ArrowLeft': 58,
        'SoundArrowDown': 59,
        'ArrowRight': 60,
    },

    keyArrayLayout: [
        ['Backquote', '`', '`', '~', '~', 'ё', 'Ё', 'Ё', 'ё'],
        ['Digit1', '1', '1', '!', '!', '1', '1', '!', '!'],
        ['Digit2', '2', '2', '@', '@', '2', '2', '\"', '\"'],
        ['Digit3', '3', '3', '#', '#', '3', '3', '№', '№'],
        ['Digit4', '4', '4', '$', '$', '4', '4', ';', ';'],
        ['Digit5', '5', '5', '%', '%', '5', '5', '%', '%'],
        ['Digit6', '6', '6', '^', '^', '6', '6', ':', ':'],
        ['Digit7', '7', '7', '&', '&', '7', '7', '?', '?'],
        ['Digit8', '8', '8', '*', '*', '8', '8', '*', '*'],
        ['Digit9', '9', '9', '(', '(', '9', '9', '(', '('],
        ['Digit0', '0', '0', ')', ')', '0', '0', ')', ')'],
        ['Minus', '-', '-', '_', '_', '-', '-', '_', '_'],
        ['Equal', '=', '=', '+', '+', '=', '=', '+', '+'],
        ['Backspace', BackspaceSimbol, BackspaceSimbol, BackspaceSimbol, BackspaceSimbol, BackspaceSimbol, BackspaceSimbol, BackspaceSimbol, BackspaceSimbol],
        ['Tab', 'Tab', 'Tab', 'Tab', 'Tab', 'Tab', 'Tab', 'Tab', 'Tab'],
        ['KeyQ', 'q', 'Q', 'Q', 'q', 'й', 'Й', 'Й', 'й'],
        ['KeyW', 'w', 'W', 'W', 'w', 'ц', 'Ц', 'Ц', 'ц'],
        ['KeyE', 'e', 'E', 'E', 'e', 'у', 'У', 'У', 'у'],
        ['KeyR', 'r', 'R', 'R', 'r', 'к', 'К', 'К', 'к'],
        ['KeyT', 't', 'T', 'T', 't', 'е', 'Е', 'Е', 'е'],
        ['KeyY', 'y', 'Y', 'Y', 'y', 'н', 'Н', 'Н', 'н'],
        ['KeyU', 'u', 'U', 'U', 'u', 'г', 'Г', 'Г', 'г'],
        ['KeyI', 'i', 'I', 'I', 'i', 'ш', 'Ш', 'Ш', 'ш'],
        ['KeyO', 'o', 'O', 'O', 'o', 'щ', 'Щ', 'Щ', 'щ'],
        ['KeyP', 'p', 'P', 'P', 'p', 'з', 'З', 'З', 'з'],
        ['BracketLeft', '[', '[', '{', '{', 'х', 'Х', 'Х', 'х'],
        ['BracketRight', ']', ']', '}', '}', 'ъ', 'Ъ', 'Ъ', 'ъ'],
        ['Backslash', '\\', '\\', '|', '|', '\\', '\\', '/', '/'],
        ['CapsLock', 'Caps', 'Caps', 'Caps', 'Caps', 'Caps', 'Caps', 'Caps', 'Caps'],
        ['KeyA', 'a', 'A', 'A', 'a', 'ф', 'Ф', 'Ф', 'ф'],
        ['KeyS', 's', 'S', 'S', 's', 'ы', 'Ы', 'Ы', 'ы'],
        ['KeyD', 'd', 'D', 'D', 'd', 'в', 'В', 'В', 'в'],
        ['KeyF', 'f', 'F', 'F', 'f', 'а', 'А', 'А', 'а'],
        ['KeyG', 'g', 'G', 'G', 'g', 'п', 'П', 'П', 'п'],
        ['KeyH', 'h', 'H', 'H', 'h', 'р', 'Р', 'Р', 'р'],
        ['KeyJ', 'j', 'J', 'J', 'j', 'о', 'О', 'О', 'о'],
        ['KeyK', 'k', 'K', 'K', 'k', 'л', 'Л', 'Л', 'л'],
        ['KeyL', 'l', 'L', 'L', 'l', 'д', 'Д', 'Д', 'д'],
        ['Semicolon', ';', ';', ':', ':', 'ж', 'Ж', 'Ж', 'ж'],
        ['Quote', '\'', '\'', '\"', '\"', 'э', 'Э', 'Э', 'э'],
        ['Enter', 'Enter', 'Enter', 'Enter', 'Enter', 'Enter', 'Enter', 'Enter', 'Enter'],
        ['ShiftLeft', 'Shift', 'Shift', 'Shift', 'Shift', 'Shift', 'Shift', 'Shift', 'Shift'],
        ['KeyZ', 'z', 'Z', 'Z', 'z', 'я', 'Я', 'Я', 'я'],
        ['KeyX', 'x', 'X', 'X', 'x', 'ч', 'Ч', 'Ч', 'ч'],
        ['KeyC', 'c', 'C', 'C', 'c', 'с', 'С', 'С', 'с'],
        ['KeyV', 'v', 'V', 'V', 'v', 'м', 'М', 'М', 'м'],
        ['KeyB', 'b', 'B', 'B', 'b', 'и', 'И', 'И', 'и'],
        ['KeyN', 'n', 'N', 'N', 'n', 'т', 'Т', 'Т', 'т'],
        ['KeyM', 'm', 'M', 'M', 'm', 'ь', 'Ь', 'Ь', 'ь'],
        ['Comma', ',', ',', '<', '<', 'б', 'Б', 'Б', 'б'],
        ['Period', '.', '.', '>', '>', 'ю', 'Ю', 'Ю', 'ю'],
        ['Slash', '/', '/', '?', '?', '.', '.', ',', ','],
        ['ArrowUp', arrowUpSimbol, arrowUpSimbol, arrowUpSimbol, arrowUpSimbol, arrowUpSimbol, arrowUpSimbol, arrowUpSimbol, arrowUpSimbol],
        ['ControlLeft', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl'],
        ['hideKeyboard', keyboardDownSimbol, keyboardDownSimbol, keyboardDownSimbol, keyboardDownSimbol, keyboardDownSimbol, keyboardDownSimbol, keyboardDownSimbol, keyboardDownSimbol],
        ['AltLeft', 'Alt', 'Alt', 'Alt', 'Alt', 'Alt', 'Alt', 'Alt', 'Alt'],
        ['Space', spaceSimbol, spaceSimbol, spaceSimbol, spaceSimbol, spaceSimbol, spaceSimbol, spaceSimbol, spaceSimbol],
        ['ContextMenu', 'En', 'En', 'En', 'En', 'Ru', 'Ru', 'Ru', 'Ru'],
        ['ArrowLeft', arrowLeftSimbol, arrowLeftSimbol, arrowLeftSimbol, arrowLeftSimbol, arrowLeftSimbol, arrowLeftSimbol, arrowLeftSimbol, arrowLeftSimbol],
        ['SoundArrowDown', arrowDownSimbol, arrowDownSimbol, arrowDownSimbol, arrowDownSimbol, arrowDownSimbol, arrowDownSimbol, arrowDownSimbol, arrowDownSimbol],
        ['ArrowRight', arrowRightSimbol, arrowRightSimbol, arrowRightSimbol, arrowRightSimbol, arrowRightSimbol, arrowRightSimbol, arrowRightSimbol, arrowRightSimbol],
    ],

    keyArrayDecode: {
        'Backquote': 0,
        'Digit1': 1,
        'Digit2': 2,
        'Digit3': 3,
        'Digit4': 4,
        'Digit5': 5,
        'Digit6': 6,
        'Digit7': 7,
        'Digit8': 8,
        'Digit9': 9,
        'Digit0': 10,
        'Minus': 11,
        'Equal': 12,
        'Backspace': 13,
        'Tab': 14,
        'KeyQ': 15,
        'KeyW': 16,
        'KeyE': 17,
        'KeyR': 18,
        'KeyT': 19,
        'KeyY': 20,
        'KeyU': 21,
        'KeyI': 22,
        'KeyO': 23,
        'KeyP': 24,
        'BracketLeft': 25,
        'BracketRight': 26,
        'Backslash': 27,
        'CapsLock': 28,
        'KeyA': 29,
        'KeyS': 30,
        'KeyD': 31,
        'KeyF': 32,
        'KeyG': 33,
        'KeyH': 34,
        'KeyJ': 35,
        'KeyK': 36,
        'KeyL': 37,
        'Semicolon': 38,
        'Quote': 39,
        'Enter': 40,
        'ShiftLeft': 41,
        'KeyZ': 42,
        'KeyX': 43,
        'KeyC': 44,
        'KeyV': 45,
        'KeyB': 46,
        'KeyN': 47,
        'KeyM': 48,
        'Comma': 49,
        'Period': 50,
        'Slash': 51,
        'ArrowUp': 52,
        'ControlLeft': 53,
        'hideKeyboard': 54,
        'AltLeft': 55,
        'Space': 56,
        'ContextMenu': 57,
        'ArrowLeft': 58,
        'SoundArrowDown': 59,
        'ArrowRight': 60
    },


    init() {

        if (localStorage.getItem('language') === 'ru') {
            this.language = localStorage.getItem('language');
        } else {
            localStorage.setItem('language', this.language);
        }
        this.elements.main = document.createElement('div');
        this.elements.main.setAttribute('tabindex', '0');
        this.elements.keysContainer = document.createElement('div');

        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.main.classList.add('keyboard');
        this.elements.keysContainer.classList.add('keyboard__keys');
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(addHtml());
        document.body.appendChild(this.elements.main);
        textarea = document.querySelector('textarea');
        textarea.onblur = () => {
            textarea.focus();
        };

        this.elements.keys = document.querySelectorAll('.keyboard__key');
    },


    _createKeys() {
        const fragment = document.createDocumentFragment();

        this.keyArrayLayout.forEach(keymass => {
            const keyElement = document.createElement('div');
            const insertLineBreak = ['Backspace', 'Backslash', 'Enter', 'ArrowUp', 'ArrowRight'].indexOf(keymass[0]) !== -1;

            keyElement.classList.add('keyboard__key');
            keyElement.setAttribute('id', keymass[0]);
            let langIndex = this.language === 'ru' ? 5 : 1;
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
                case 'ArrowUp':

                    keyElement.classList.add('keyboard__key_control');
                    break;
                case 'ArrowLeft':
                    keyElement.classList.add('keyboard__key_control');
                    break;
                case 'SoundArrowDown':
                    keyElement.classList.add('keyboard__key_control');
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
    _triggerEvent(eventName) {

    },
    _toggleControls(control) {

    },
};


let keyPressedByMouseId;
let keypressed = false;
let globalCapslock = false;
let globalShift = false;
let globalCtrl = false;
let globalAlt = false;
let globalSoundON = false;
let mouseControl = false;
let mouseShift = false;
let mouseAlt = false;
let keyboardShift = false;
let keyboardAlt = false;
let keyboardControl = false;

window.addEventListener('DOMContentLoaded', function start() {
    Keyboard.init();
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    document.addEventListener('mouseup', mouseUp);

    Keyboard.elements.main.addEventListener('mousedown', mouseDown);
    textarea.addEventListener('click', () => {
        document.querySelector('.keyboard').classList.remove("keyboard--hidden");
    });
});

function showInput() {

}


function addHtml() {
    const fragment = document.createDocumentFragment();
    const textarea = document.createElement('textarea');
    textarea.setAttribute('name', 'input');
    textarea.setAttribute('cols', '30');
    textarea.setAttribute('rows', '15');
    textarea.setAttribute('autofocus', '');
    textarea.setAttribute('placeholder', 'Click here');
    fragment.appendChild(textarea);
    return fragment;
}


function keyDown(keyevent) {
    keyevent.preventDefault();
   
    if (keyevent.code in Keyboard.keyArrayDecode) {
        playSound(keyevent.code);
        let keyNum = Keyboard.keyArrayDecode[keyevent.code];
        Keyboard.elements.keys[keyNum].classList.add('keyboard__key_pressed');
        textarea.focus();
        if (keyevent.code in Keyboard.controlKeys) {
            controlKeyProcessing(keyevent);
        } else {
            if (globalAlt || globalCtrl) {
                if (globalAlt) {
                    mouseAlt = false;
                    let newevent = new KeyboardEvent('keyup', {
                        key: 'mouseup',
                        code: 'AltLeft',
                    });
                    if (altResolve(newevent)) {
                        Keyboard.elements.keys[Keyboard.controlKeys['AltLeft']].classList.remove('keyboard__key_pressed');
                    }
                }
                if (globalCtrl) {
                    mouseControl = false;
                    let newevent = new KeyboardEvent('keyup', {
                        key: 'mouseup',
                        code: 'ControlLeft',
                    });
                    if (controlResolve(newevent)) {
                        Keyboard.elements.keys[Keyboard.controlKeys['ControlLeft']].classList.remove('keyboard__key_pressed');
                    }
                }

            } else {
                if (globalShift) {

                    inputKeyToTextarea(Keyboard.elements.keys[Keyboard.keyArrayDecode[keyevent.code]].innerText);
                    mouseShift = false;
                    let newevent = new KeyboardEvent('keyup', {
                        key: 'mouseup',
                        code: 'ShiftLeft',
                    });
                    keyevent.code = 'ShiftLeft';
                    keyevent.key = 'mouseup';

                    if (shiftResolve(newevent)) {
                        Keyboard.elements.keys[Keyboard.controlKeys['ShiftLeft']].classList.remove('keyboard__key_pressed');
                    }

                } else {
                    inputKeyToTextarea(Keyboard.elements.keys[Keyboard.keyArrayDecode[keyevent.code]].innerText);
                }
            }
        }
    }
}


function keyUp(keyevent) {
    keyevent.preventDefault();
    if (keyevent.code in Keyboard.keyArrayDecode) {
        let keyNum = Keyboard.keyArrayDecode[keyevent.code];
        if (!((keyevent.code === 'ShiftLeft') || (keyevent.code === 'AltLeft') || (keyevent.code === 'ControlLeft'))) {
            keyUpProcessing(keyevent);
            Keyboard.elements.keys[keyNum].classList.remove('keyboard__key_pressed');
        } else {
            if (resolveMouseKeyup(keyevent)) {
                Keyboard.elements.keys[keyNum].classList.remove('keyboard__key_pressed');
            }
        }
    }
}


function mouseDown(event) {
    event.preventDefault();
    if ((event.target.classList.contains('keyboard__key')) && (event.which == 1)) {

        keyPressedByMouseId = event.target.id;
        keypressed = true;
        let newevent = new KeyboardEvent('keydown', {
            key: 'mousedown',
            code: event.target.id,
        });
        document.dispatchEvent(newevent);
    }
}


function mouseUp(event) {
    event.preventDefault();
    if (keypressed) {
        keypressed = false;
        let newevent = new KeyboardEvent('keyup', {
            key: 'mouseup',
            code: keyPressedByMouseId,
        });
        document.dispatchEvent(newevent);
    }
}


function keyUpProcessing(keyevent) {

}


function controlKeyProcessing(keyevent) {
    switch (keyevent.code) {
        case 'Backspace':
            inputBackspaceToTextarea();
            break;
        case 'Tab':
            inputKeyToTextarea('\t');
            break;
        case 'CapsLock':
            if (!keyevent.repeat) {
                if (globalCapslock) {
                    Keyboard.elements.keys[Keyboard.controlKeys['CapsLock']].classList.remove('keyboard__key-ON');
                    globalCapslock = false;
                } else {
                    Keyboard.elements.keys[Keyboard.controlKeys['CapsLock']].classList.add('keyboard__key-ON');
                    globalCapslock = true;
                }
            }
            changeKeyCaps();
            break;
        case 'Enter':

            inputKeyToTextarea('\n');
            break;
        case 'ShiftLeft':
            shiftResolve(keyevent);

            break;
        case 'ArrowUp':
            inputArrowUpToTextarea();

            break;
        case 'ControlLeft':
            controlResolve(keyevent);

            break;
        case 'hideKeyboard':
            document.querySelector('.keyboard').classList.add("keyboard--hidden");
            break;
        case 'AltLeft':
            altResolve(keyevent);
            break;

        case 'Space':
            inputSpaceToTextarea();

            break;
        case 'ContextMenu':
            // Пример как Alt+ContexMenu
            // if (!keyevent.repeat) {
            //     if (globalAlt) {
            //         inputContextMenuToTextarea();
            //         mouseAlt = false;
            //         let newevent = new KeyboardEvent('keyup', {
            //             key: 'mouseup',
            //             code: 'AltLeft',
            //         });
            //         if (altResolve(newevent)) {
            //             Keyboard.elements.keys[Keyboard.controlKeys['AltLeft']].classList.remove('keyboard__key_pressed');
            //         }
            //     }
            // }

            //Вместо блока выше
            inputContextMenuToTextarea();
            break;
        case 'ArrowLeft':
            inputArrowLeftToTextarea();
            break;
        case 'SoundArrowDown':
            if (!keyevent.repeat) {
                if (globalSoundON) {
                    Keyboard.elements.keys[Keyboard.controlKeys['SoundArrowDown']].classList.remove('keyboard__key-ON');
                    globalSoundON = false;
                } else {
                    Keyboard.elements.keys[Keyboard.controlKeys['SoundArrowDown']].classList.add('keyboard__key-ON');
                    globalSoundON = true;
                }
            }
            break;
        case 'ArrowRight':
            inputArrowRightToTextarea();
            break;
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
    } else {
        if (globalCtrl) {
            globalCtrl = false;
        }
    }
    if (!globalCtrl) {
        return true;
    }
    return false;

}


function shiftResolve(keyevent) {
    if (keyevent.key === 'mousedown') {
        if (!mouseShift) {
            mouseShift = true;
        } else {
            mouseShift = false;
        }
    } else if (keyevent.key === 'mouseup') {

    } else if (keyevent.type === 'keyup') {
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
    } else {
        if (globalShift) {
            globalShift = false;
            changeKeyCaps();
        }
    }
    if (!globalShift) {
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
    } else if (keyevent.key === 'mouseup') {

    } else if (keyevent.type === 'keyup') {
        keyboardAlt = false;
        mouseAlt = false;
    } else {
        keyboardAlt = true;
    }
    if (mouseAlt || keyboardAlt) {
        if (!globalAlt) {
            globalAlt = true;
        }
    } else {
        if (globalAlt) {
            globalAlt = false;
        }
    }
    if (!globalAlt) {
        return true;
    }
    return false;
}


function changeKeyCaps() {

    let keyCapsIndex = 1;
    if (Keyboard.language == 'ru') {
        keyCapsIndex += 4;
    }
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


function inputKeyToTextarea(str) {
    let start = textarea.selectionStart;
    if (textarea.selectionStart != textarea.selectionEnd) {
        textarea.value = textarea.value.slice(0, textarea.selectionStart) + str + textarea.value.slice(textarea.selectionEnd);
    } else if (textarea.value.length == textarea.selectionStart) {
        textarea.value += str;
    } else {
        textarea.value = textarea.value.slice(0, textarea.selectionStart) + str + textarea.value.slice(textarea.selectionEnd);
    }
    textarea.selectionStart = start + 1;
    textarea.selectionEnd = start + 1;
}


function inputBackspaceToTextarea() {
    let start = textarea.selectionStart;
    if (textarea.selectionStart != textarea.selectionEnd) {
        textarea.value = textarea.value.slice(0, textarea.selectionStart) + textarea.value.slice(textarea.selectionEnd);
        textarea.selectionEnd = start;
    } else if (textarea.selectionStart > 0) {
        textarea.value = textarea.value.slice(0, textarea.selectionStart - 1) + textarea.value.slice(textarea.selectionEnd);
        textarea.selectionStart = start - 1;
        textarea.selectionEnd = start - 1;
    }
}


function inputSpaceToTextarea() {
    let start = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, textarea.selectionStart) + ' ' + textarea.value.slice(textarea.selectionEnd);
    textarea.selectionStart = start + 1;
    textarea.selectionEnd = start + 1;
}


function inputArrowLeftToTextarea() {
    if (textarea.selectionStart > 0) {
        textarea.selectionStart = textarea.selectionEnd = textarea.selectionStart - 1;
    }
}


function inputArrowRightToTextarea() {
    if (textarea.selectionEnd < textarea.value.length) {
        textarea.selectionStart = textarea.selectionEnd = textarea.selectionEnd + 1;
    }
}


function inputArrowUpToTextarea() {
    let start = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, textarea.selectionStart) + arrowUpSimbol + textarea.value.slice(textarea.selectionEnd);
    textarea.selectionStart = start + 1;
    textarea.selectionEnd = start + 1;
}


function inputArrowDownToTextarea() {
    let start = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, textarea.selectionStart) + arrowDownSimbol + textarea.value.slice(textarea.selectionEnd);
    textarea.selectionStart = start + 1;
    textarea.selectionEnd = start + 1;
}


function inputContextMenuToTextarea() {
    changeLanguage();
}


function changeLanguage() {
    if (Keyboard.language == 'en') {
        Keyboard.language = 'ru';
    } else {
        Keyboard.language = 'en';
    }
    localStorage.setItem('language', Keyboard.language);
    changeKeyCaps();
}


function playSound(event) {
    if (globalSoundON) {
        return;
    }
    const audio = new Audio();
    switch (event) {
        case 'Enter':
            audio.src = './sounds/enter.wav';
            break;
        case 'ShiftLeft':
            audio.src = './sounds/shift.wav';
            break;
        case 'CapsLock':
            audio.src = './sounds/caplock.wav';
            break;
        case 'Backspace':
            audio.src = './sounds/backspace.wav';
            break;

        default:
            if (Keyboard.language == 'en') {
                audio.src = './sounds/en.wav';
            } else {
                audio.src = './sounds/ru.wav';
            }
            break;
    }
    if (!audio) {
        return;
    }
    audio.currentTime = 0;
    audio.play();
}