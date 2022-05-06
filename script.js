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
    console.log(num);
    return parseFloat(num).toFixed(2);
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
        console.log("prevInput", prevInput, "currentInput", currentInput);
    });
});

signBtn.addEventListener("click", () => {
    if (operatorPressed && currentInput !== "") {
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
                currentInput += decimalBtn.textContent;

            } else {
                currentInput += decimalBtn.textContent;
            }
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
});

let deleted = "";
deleteBtn.addEventListener("click", () => {
    if (currentInput !== "") {
        deleted = currentInput.slice(-1);
        currentInput = currentInput.substring(0, currentInput.length - 1);
        displayBox.textContent = currentInput;
        console.log("deleted", deleted);
    } else if (!operatorPressed) {
        deleted = prevInput.slice(-1);
        prevInput = prevInput.substring(0, prevInput.length - 1);
        displayBox.textContent = prevInput;
        console.log("deleted", deleted);
    }
    if (deleted === ".") {
        decimalPressed = false;
    }
});

percentBtn.addEventListener("click", () => {
    if (currentInput !== "") {
        currentInput = percentToDecimal(currentInput);
        currentInput = currentInput.toString();
        displayBox.textContent = currentInput;
    } else if (!operatorPressed) {
        prevInput = percentToDecimal(prevInput);
        prevInput = prevInput.toString();
        displayBox.textContent = prevInput;
    } else if (outcome !== "") {
        prevInput = percentToDecimal(outcome);
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
        if (currentInput === "0" && chosenOperator === divide) {
            currentInput = "";
            displayBox.textContent = "Can't do that!";
        }
        if (currentInput !== "") {
            outcome = Number(parseFloat(calculate(chosenOperator, Number(prevInput), Number(currentInput))));
            displayBox.textContent = outcome;
            currentInput = outcome;
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

        console.log("prevInput", prevInput, "currentInput", currentInput, "outcome", outcome);
    });
}, );

equalsBtn.addEventListener("click", () => {
    if (currentInput === "0" && chosenOperator === divide) {
        currentInput = "";
        displayBox.textContent = "Can't do that!";
    }
    if (prevInput !== "" && currentInput !== "") {
        outcome = Number(parseFloat(calculate(chosenOperator, Number(prevInput), Number(currentInput))));
        displayBox.textContent = outcome;
        prevInput = outcome;
    }
    currentInput = "";
});
//1.click number, display number
//2.allow 1 decimal input
//3.save number as prevInput
//4.click operation, clear display
//5.get second number input
//6.click =
//7.execute operator function and display resultclass