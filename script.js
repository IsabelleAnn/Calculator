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

function moveDecimalToLeft(a) {
    return (Math.round(a * 100) / 100) / 100;
}

function round(a) {
    return parseFloat(a.toFixed(2));
}

function calculate(myFunc, a, b) {
    return round(myFunc(a, b));
}

const displayBox = document.querySelector(".outcome-container");
const defaultDisplay = displayBox.textContent;

const numberBtns = document.querySelectorAll(".number");
const decimalBtn = document.querySelector("#decimal");
const clearBtn = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete");
const operatorBtns = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector("#equals");

let firstNumber = "";

numberBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (displayBox.textContent === defaultDisplay) {
            displayBox.textContent = "";
        }
        displayBox.textContent += btn.textContent;
        firstNumber += btn.textContent;
        console.log(firstNumber);
    });
});

decimalBtn.addEventListener("click", () => {
    displayBox.textContent += decimalBtn.textContent;
    firstNumber += decimalBtn.textContent;
}, { once: true });

clearBtn.addEventListener("click", () => {
    displayBox.textContent = "";
    firstNumber = "";
});

deleteBtn.addEventListener("click", () => {

});

operatorBtns.forEach(btn => {
    btn.addEventListener("click", () => {

    });
});


//1.click number, display number
//2.allow 1 decimal input
//3.save number as firstNumber
//4.click operation, clear display
//5.get second number input
//6.click =
//7.execute operator function and display result