const displayBox = document.querySelector("#outcome");
const inputHistory = document.querySelector("#input-history");
const numberBtns = document.querySelectorAll(".number");
const signBtn = document.querySelector("#pos-neg");
const decimalBtn = document.querySelector("#decimal");
const clearBtn = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete");
const percentBtn = document.querySelector("#percent");
const operatorBtns = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector("#equals");
let prevInput = "";
let currentInput = "";
let decimalPressed = false;
let operatorPressed = false;
let equalsPressed = false;
let initialized = false;
let chosenOperator;
let outcome;
let operatorStr = "";
let keyName = "";
const validNums = /^\d$/;
const validOps = /^[/*+-]$/;

document.addEventListener("keyup", (event) => {
    keyName = event.key;
    //number
    if (validNums.test(keyName)) {
        numberInput(keyName);
    }
    //decimal
    if (keyName === ".") {
        decimalInput();
    }
    //delete
    if (keyName === 'Delete' || keyName === "Backspace") {
        deleteInput();
    }
    //percent
    if (keyName === "%") {
        percentInput();
    }
    //ops
    if (validOps.test(keyName)) {
        operatorInput(keyName);
    }
    //equals
    if (keyName === "=" || keyName === "Enter") {
        equalsInput();
    }
});

numberBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        numberInput(btn.textContent);
    });
});

function numberInput(element) {
    initialized = true;
    if (operatorPressed) {
        if (checkLength(currentInput.length)) {
            if (currentInput.charAt(0) === "0" && currentInput.length === 1) {
                currentInput = element;
            } else {
                currentInput += element;
            }
            displayBox.textContent = currentInput;
        }
    } else {
        if (checkLength(prevInput.length)) {
            if (prevInput.charAt(0) === "0" && prevInput.length === 1) {
                prevInput = element;
            } else {
                prevInput += element;
            }
            displayBox.textContent = prevInput;
        }
    }
}

signBtn.addEventListener("click", signInput);

function signInput() {
    if (operatorPressed) {
        currentInput = switchSign(currentInput);
        displayBox.textContent = currentInput;
    } else {
        prevInput = switchSign(prevInput);
        displayBox.textContent = prevInput;
    }
}

decimalBtn.addEventListener("click", decimalInput);

function decimalInput() {
    if (!decimalPressed) {
        if (operatorPressed) {
            if (currentInput === "") {
                currentInput = "0";
            }
            currentInput += decimalBtn.textContent;
            displayBox.textContent = currentInput;
        } else {
            if (prevInput === "") {
                prevInput = "0";
                prevInput += decimalBtn.textContent;
            } else {
                prevInput += decimalBtn.textContent;
            }
            displayBox.textContent = prevInput;
        }
    }
    decimalPressed = true;
}

clearBtn.addEventListener("click", clearInput);

function clearInput() {
    initialized = false;
    displayBox.textContent = "";
    prevInput = "";
    currentInput = "";
    outcome = "";
    decimalPressed = false;
    operatorPressed = false;
    equalsPressed = false;
    inputHistory.textContent = "";
}

let deleted = "";
deleteBtn.addEventListener("click", deleteInput);

function deleteInput() {
    if (operatorPressed) {
        currentInput = currentInput.toString();
        deleted = currentInput.slice(-1);
        currentInput = currentInput.substring(0, currentInput.length - 1);
        displayBox.textContent = currentInput;
    } else {
        prevInput = prevInput.toString();
        deleted = prevInput.slice(-1);
        prevInput = prevInput.substring(0, prevInput.length - 1);
        displayBox.textContent = prevInput;
    }
    if (deleted === ".") {
        decimalPressed = false;
    }
    if (prevInput === "") {
        initialized = false;
    }
}

percentBtn.addEventListener("click", percentInput);

function percentInput() {
    if (operatorPressed) {
        if (currentInput) {
            currentInput = percentToDecimal(currentInput);
            currentInput = currentInput.toString();
            displayBox.textContent = currentInput;
        }
    } else {
        if (prevInput) {
            prevInput = percentToDecimal(prevInput);
            prevInput = prevInput.toString();
            displayBox.textContent = prevInput;
        }
    }
    decimalPressed = true;
}

operatorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        operatorInput(btn.textContent);
    });
});

function operatorInput(element) {
    if (initialized) {
        operatorPressed = true;
        decimalPressed = false;
        equalsPressed = false;
        if ((parseFloat(currentInput) === 0) && chosenOperator === divide) {
            displayBox.textContent = "Can't do that!";
            currentInput = "";
            inputHistory.textContent = "";
        }
        if (currentInput !== "" && prevInput !== "") {
            outcome = Number(parseFloat(calculate(chosenOperator, Number(prevInput), Number(currentInput))));
            displayBox.textContent = outcome;
            currentInput = outcome;
        }
        if (prevInput === "" && outcome !== "") {
            currentInput = outcome;
            outcome = Number(parseFloat(calculate(chosenOperator, Number(prevInput), Number(currentInput))));
            displayBox.textContent = outcome;
            currentInput = "";
        }
        switch (element) {
            case "x":
                chosenOperator = multiply;
                break;
            case "÷":
            case "/":
                chosenOperator = divide;
                break;
            case "-":
                chosenOperator = subtract;
                break;
            case "+":
                chosenOperator = add;
                break;
        }
        operatorStr = element;
        if (currentInput !== "") {
            prevInput = currentInput;
            currentInput = "";
        }
        inputHistory.textContent = `${prevInput} ${operatorStr}`;
    }
}

equalsBtn.addEventListener("click", equalsInput);

function equalsInput() {
    if (initialized && currentInput !== "") {
        inputHistory.textContent = `${prevInput} ${operatorStr} ${currentInput} =`;
        equalsPressed = true;
        operatorPressed = false;
        checkDividedByZero();
        if (prevInput !== "" && currentInput !== "") {
            outcome = Number(parseFloat(calculate(chosenOperator, Number(prevInput), Number(currentInput))));
            displayBox.textContent = outcome;
        }
        prevInput = outcome;
        currentInput = "";
    }
}

function checkDividedByZero() {
    if ((parseFloat(currentInput) === 0) && chosenOperator === divide) {
        displayBox.textContent = "Can't do that!";
        currentInput = "";
        outcome = prevInput;
        if (equalsPressed) {
            outcome = "";
            initialized = false;
        }
        inputHistory.textContent = "";
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function percentToDecimal(num) {
    return (num / 100);
}


function calculate(myFunc, a, b) {
    return (parseFloat(myFunc(a, b)));
}

function checkLength(num) {
    return num < 15;
}

function switchSign(num) {
    return num * (-1);
}