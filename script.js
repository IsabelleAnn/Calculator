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

function round(num) {
    // let string = num.toString();
    // let result = "";
    // result = parseFloat(num).toFixed(15);
    // if (string.length > 15) {
    //     result = parseFloat(num).toFixed(15);
    // } else {
    //     result = parseFloat(num).toFixed(string.length - 1);
    // }
    return num;
}

function calculate(myFunc, a, b) {
    return round(parseFloat(myFunc(a, b)));
}

function checkLength(num) {
    return num < 15;
}

function switchSign(num) {
    return num * (-1);
}

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

numberBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        if (operatorPressed) {
            if (checkLength(currentInput.length)) {
                currentInput += btn.textContent;
                displayBox.textContent = currentInput;
                console.log(currentInput);
            }
        } else {
            if (checkLength(prevInput.length)) {
                prevInput += btn.textContent;
                displayBox.textContent = prevInput;

            }
        }
        console.log(prevInput, "length", prevInput.length, currentInput, "length", currentInput.length);
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
    inputHistory.textContent = "";
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
        if (currentInput) {
            console.log(currentInput);
            currentInput = percentToDecimal(currentInput);
            currentInput = currentInput.toString();
            displayBox.textContent = currentInput;
        }

    } else {
        if (prevInput) {
            console.log(prevInput);
            prevInput = percentToDecimal(prevInput);
            prevInput = prevInput.toString();
            displayBox.textContent = prevInput;
        }

    }
    decimalPressed = true;
    console.log("prev", prevInput, "current", currentInput, displayBox.textContent, operatorPressed);
});

let chosenOperator;
let outcome;
let operatorStr = "";
console.log(parseFloat("0.0"));
operatorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        operatorPressed = true;
        decimalPressed = false;
        equalsPressed = false;
        if ((parseFloat(currentInput) === "0") && chosenOperator === divide) {
            console.log(currentInput);
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
                break;
            case "÷":
                chosenOperator = divide;
                break;
            case "-":
                chosenOperator = subtract;
                break;
            case "+":
                chosenOperator = add;
                break;
        }
        operatorStr = btn.textContent;
        if (currentInput !== "") {
            prevInput = currentInput;
            currentInput = "";
        }
    });
}, );

equalsBtn.addEventListener("click", () => {
    inputHistory.textContent = `${prevInput} ${operatorStr} ${currentInput} =`;
    equalsPressed = true;
    operatorPressed = false;
    if ((parseFloat(currentInput) === "0") && chosenOperator === divide) {
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