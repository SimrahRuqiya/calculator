function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}

const operations = {
    '+': (x, y) => add(x, y),
    '-': (x, y) => subtract(x, y),
    '*': (x, y) => multiply(x, y),
    '/': (x, y) => divide(x, y),
};

function operate(x, y, operation) {
    const func = operations[operation];
    if (func) {
        return func(x, y);
    } else {
        throw new Error("Invalid operation");
    }
}
