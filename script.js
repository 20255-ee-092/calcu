let display = document.getElementById('result');

function appendNumber(num) {
    display.value += num;
}

function appendOperator(operator) {
    if (display.value !== '') {
        // Check if the last character is an operator
        const lastChar = display.value.slice(-1);
        if ('+-*/%'.includes(lastChar)) {
            // Replace the last operator
            display.value = display.value.slice(0, -1) + operator;
        } else {
            display.value += operator;
        }
    }
}

function clearDisplay() {
    display.value = '';
}

function deleteLastChar() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        // Replace % with /100 for percentage calculations
        let expression = display.value.replace(/%/g, '/100');
        
        // Evaluate the expression
        let result = eval(expression);
        
        // Handle division by zero
        if (!isFinite(result)) {
            throw new Error('Cannot divide by zero');
        }
        
        // Round to 8 decimal places to avoid floating-point precision issues
        display.value = Number(result.toFixed(8)).toString();
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => {
            display.value = '';
        }, 1500);
    }
}

// Add keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Numbers and operators
    if (/[\d.+\-*/%]/.test(key)) {
        event.preventDefault();
        if ('+-*/%'.includes(key)) {
            appendOperator(key);
        } else {
            appendNumber(key);
        }
    }
    
    // Enter key for calculation
    if (key === 'Enter') {
        event.preventDefault();
        calculate();
    }
    
    // Backspace for deletion
    if (key === 'Backspace') {
        event.preventDefault();
        deleteLastChar();
    }
    
    // Escape key to clear
    if (key === 'Escape') {
        event.preventDefault();
        clearDisplay();
    }
});
