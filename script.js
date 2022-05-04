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
    if (num == 0) {
        return "Can't do that."
    }
    return a / b;
}

function percentToDecimal(a) {
    return (Math.round(a * 100) / 100) / 100;
}

function round(a) {
    return parseFloat(a.toFixed(2));
}

function calculate(myFunc, a, b) {
    return round(myFunc(a, b));
}

const displayBox = document.querySelector(".outcome-container");

const numberBtns = document.querySelectorAll(".number");
const decimalBtn = document.querySelector("#decimal");
const clearBtn = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete");
const percentBtn = document.querySelector("#percent");
const operatorBtns = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector("#equals");

let prevInput = "";
let nextInput = "";
let decimalPressed = false;
let operatorPressed = false;

numberBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (operatorPressed) {
            nextInput += btn.textContent;
            displayBox.textContent = nextInput;

        } else {
            prevInput += btn.textContent;
            displayBox.textContent = prevInput;
        }

        console.log("prevInput", prevInput, "nextInput", nextInput);
    });
});

decimalBtn.addEventListener("click", () => {
    if (!decimalPressed) {
        displayBox.textContent += decimalBtn.textContent;
        prevInput += decimalBtn.textContent;
        decimalPressed = true;
    }
});

clearBtn.addEventListener("click", () => {
    displayBox.textContent = "";
    prevInput = "";
    decimalPressed = false;
});

let deleted = "";
deleteBtn.addEventListener("click", () => {
    deleted = prevInput.slice(-1);
    prevInput = prevInput.substring(0, prevInput.length - 1);

    displayBox.textContent = prevInput;
    console.log("deleted", deleted);
    if (deleted === ".") {
        decimalPressed = false;

    }
});

percentBtn.addEventListener("click", () => {
    prevInput = percentToDecimal(prevInput);
    prevInput = prevInput.toString();
    displayBox.textContent = prevInput;
    decimalPressed = true;
});

operatorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        operatorPressed = true;
    });
});


//1.click number, display number
//2.allow 1 decimal input
//3.save number as prevInput
//4.click operation, clear display
//5.get second number input
//6.click =
//7.execute operator function and display result