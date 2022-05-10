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
    return (Math.round(num * 100) / 100) / 100;
}

function round(num) {

    let string = num.toString();
    return parseFloat(num).toFixed(string.length - 1);
}

function calculate(myFunc, a, b) {

    console.log(myFunc, a, b);
    return round(parseFloat(myFunc(a, b)));
}

function checkLength(num) {
    return num < 18;
}

function switchSign(num) {
    return num * (-1);
}

const displayBox = document.querySelector("#outcome-container");

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

numberBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (operatorPressed) {
            currentInput += btn.textContent;
            if (checkLength(currentInput.length)) {
                displayBox.textContent = currentInput;
            }
        } else {
            prevInput += btn.textContent;
            if (checkLength(prevInput.length)) {
                displayBox.textContent = prevInput;
            }
        }
    });
});

signBtn.addEventListener("click", () => {
    if (operatorPressed) {
        currentInput = switchSign(currentInput);
        displayBox.textContent = currentInput;
    } else {
        prevInput = switchSign(prevInput);
        displayBox.textContent = prevInput;
    }
});

decimalBtn.addEventListener("click", () => {
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
});

clearBtn.addEventListener("click", () => {
    displayBox.textContent = "";
    prevInput = "";
    currentInput = "";
    outcome = "";
    decimalPressed = false;
    operatorPressed = false;
    equalsPressed = false;
});

let deleted = "";
deleteBtn.addEventListener("click", () => {
    if (operatorPressed) {
        currentInput = currentInput.toString();
        currentInput = currentInput.substring(0, currentInput.length - 1);
        displayBox.textContent = currentInput;
    } else {
        prevInput = prevInput.toString();
        prevInput = prevInput.substring(0, prevInput.length - 1);
        displayBox.textContent = prevInput;
    }
    if (deleted === ".") {
        decimalPressed = false;
    }
});

percentBtn.addEventListener("click", () => {
    if (operatorPressed) {
        currentInput = percentToDecimal(currentInput);
        currentInput = currentInput.toString();
        displayBox.textContent = currentInput;
    } else {
        prevInput = percentToDecimal(prevInput);
        prevInput = prevInput.toString();
        displayBox.textContent = prevInput;
    }
    decimalPressed = true;
});

let chosenOperator;
let outcome;

operatorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        operatorPressed = true;
        decimalPressed = false;
        equalsPressed = false;
        if (parseInt(currentInput) === 0 && chosenOperator === divide) {
            displayBox.textContent = "Can't do that!";
            currentInput = "";
            prevInput = "";
            outcome = "";
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
        switch (btn.textContent) {
            case "x":
                chosenOperator = multiply;
                console.log("mult", btn.textContent);
                break;
            case "÷":
                chosenOperator = divide;
                console.log("divide", btn.textContent);
                break;
            case "-":
                chosenOperator = subtract;
                console.log("subtract", btn.textContent);
                break;
            case "+":
                chosenOperator = add;
                console.log("add", btn.textContent);
                break;
        }
        if (currentInput !== "") {
            prevInput = currentInput;
            currentInput = "";
        }
    });
}, );

equalsBtn.addEventListener("click", () => {
    equalsPressed = true;
    operatorPressed = false;
    if (parseInt(currentInput) === 0 && chosenOperator === divide) {
        displayBox.textContent = "Can't do that!";
        currentInput = "";
        prevInput = "";
        outcome = "";
    }
    if (prevInput !== "" && currentInput !== "") {
        outcome = Number(parseFloat(calculate(chosenOperator, Number(prevInput), Number(currentInput))));
        displayBox.textContent = outcome;
    }
    prevInput = outcome;
    currentInput = "";
});