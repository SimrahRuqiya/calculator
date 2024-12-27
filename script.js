let currentInput = "0"; 
let previousInput = null; 
let currentOperation = null; 
let resetNextInput = false; 

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

function updateDisplay(value) {
    display.textContent = value;
}

function handleNumber(num) {
    if (resetNextInput) {
        currentInput = num;
        resetNextInput = false;
    } else {
        currentInput = currentInput === "0" ? num : currentInput + num;
    }
    updateDisplay(currentInput);
}

function handleOperation(op) {
    if (currentOperation && !resetNextInput) {
        currentInput = operate(
            parseFloat(previousInput),
            parseFloat(currentInput),
            currentOperation
        ).toString();
        updateDisplay(currentInput);
    }
    previousInput = currentInput;
    currentOperation = op;
    resetNextInput = true;
}

function handleEquals() {
    if (!currentOperation || resetNextInput) return;
    currentInput = operate(
        parseFloat(previousInput),
        parseFloat(currentInput),
        currentOperation
    ).toString();
    updateDisplay(currentInput);
    currentOperation = null;
    resetNextInput = true;
}

function handleClear() {
    currentInput = "0";
    previousInput = null;
    currentOperation = null;
    resetNextInput = false;
    updateDisplay(currentInput);
}

function handleDelete() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = "0";
    }
    updateDisplay(currentInput);
}

function operate(x, y, operation) {
    const operations = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => (b !== 0 ? a / b : "Error"), 
    };
    return operations[operation](x, y);
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const { id } = button;

        if (["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"].includes(id)) {
            handleNumber(button.textContent);
        } else if (["add", "minus", "multiply", "divide"].includes(id)) {
            const operationMap = {
                add: "+",
                minus: "-",
                multiply: "*",
                divide: "/",
            };
            handleOperation(operationMap[id]);
        } else if (id === "equal") {
            handleEquals();
        } else if (id === "a-clear") {
            handleClear();
        } else if (id === "clear") {
            handleDelete();
        } else if (id === "percent") {
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateDisplay(currentInput);
        } else if (id === "point") {
            if (!currentInput.includes(".")) {
                currentInput += ".";
                updateDisplay(currentInput);
            }
        }
    });
});
