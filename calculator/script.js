const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operator');
const clearBtns = document.querySelectorAll('.clear-btn');
const decimalBtn = document.getElementById('decimal');
const display = document.getElementById('display');
const result = document.getElementById('result');
let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';
let EndOperation = true;

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
    EndOperation = false;
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

    if (oper === '-' && EndOperation) {
        display.value = '-';
        EndOperation = false;
        MemoryNewNumber = false;
        return;
    }
    if (localOperationMemory === '-') {
        if (oper === '-') {
            display.value = '0';
            EndOperation = true;
        }
        return;
    }

    EndOperation = true;
    if (MemoryNewNumber && MemoryPendingOperation !== '=' && MemoryPendingOperation !== String.fromCharCode(8730)) {
        display.value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;
        switch (MemoryPendingOperation) {
            case '+':
                MemoryCurrentNumber += +localOperationMemory;
                break;
            case '-':
                MemoryCurrentNumber -= +localOperationMemory;
                break;
            case '*':
                MemoryCurrentNumber *= +localOperationMemory;
                break;
            case '/':
                MemoryCurrentNumber /= +localOperationMemory;
                break;
            case 'xy':
                MemoryCurrentNumber = Math.pow(MemoryCurrentNumber, +localOperationMemory);
                break;
            default:
                MemoryCurrentNumber = +localOperationMemory;
                break;
        }

        if (oper === String.fromCharCode(8730)) {
            MemoryCurrentNumber = Math.sqrt(MemoryCurrentNumber);
        } else {
           MemoryCurrentNumber = +MemoryCurrentNumber.toFixed(15);
        }
    }
    if (isNaN(MemoryCurrentNumber) || MemoryCurrentNumber === Infinity || MemoryCurrentNumber === -Infinity) {
        MemoryCurrentNumber = 'Error';
    }
    display.value = MemoryCurrentNumber;
    MemoryPendingOperation = oper;
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