const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operator');
const clearBtns = document.querySelectorAll('.clear-btn');
const decimalBtn = document.getElementById('decimal');
const display = document.getElementById('display');
const result = document.getElementById('result');
let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';

for (var i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', function (e) {
        pressNumber(e.target.textContent);
    });
}

for (var i = 0; i < operations.length; i++) {
    operations[i].addEventListener('click', function (e) {
        pressOperation(e.target.textContent);
    });
}

for (var i = 0; i < clearBtns.length; i++) {
    clearBtns[i].addEventListener('click', function (e) {
        clear(e.target.textContent);
    });
}

decimalBtn.addEventListener('click', pressDecimal);

function pressNumber(number) {
    if (MemoryNewNumber) {
        display.value = number;
        MemoryNewNumber = false;
    } else {
        if (display.value === '0') {
            display.value = number;
        } else {
            display.value += number;
        }
    }
}

function pressOperation(oper) {
    let localOperationMemory = display.value;

    if (MemoryNewNumber && MemoryPendingOperation !== '=') {
        display.value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;
        if (MemoryPendingOperation === '+') {
            MemoryCurrentNumber += +localOperationMemory;
        } else if (MemoryPendingOperation === '-') {
            MemoryCurrentNumber -= +localOperationMemory;
        } else if (MemoryPendingOperation === '*') {
            MemoryCurrentNumber *= +localOperationMemory;
        } else if (MemoryPendingOperation === '/') {
            MemoryCurrentNumber /= +localOperationMemory;
        } else {
            MemoryCurrentNumber = +localOperationMemory;
        }
        display.value = MemoryCurrentNumber;
        MemoryPendingOperation = oper;
    }
}

function pressDecimal() {
    let localDecimalMemory = display.value;

    if (MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        }
    }
    display.value = localDecimalMemory;
}

function clear(typeClear) {
    if (typeClear === 'ce') {
        display.value = '0';
        MemoryNewNumber = true;
    } else if (typeClear === 'c') {
        display.value = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
    }
}