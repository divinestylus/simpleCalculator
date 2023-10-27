// Global variables
let runningTotal = 0,
    buffer = "0",
    previousOperator;

const screen = document.querySelector(".screen"),
    buttons = document.querySelector(".buttons-section");
     
// Functions
function buttonClick(value){
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.value = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case "C":
            buffer = "0";
            runningTotal = 0;
            break;
        case "=":
            if (runningTotal === 0){
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;

            break;
        case "←":
            if (buffer.length === 1){
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length-1);
            }
            break;
        case "+":
        case "-":
        case "×":
        case "÷":
            handleMath(symbol);
            break; 
    }
}

function handleMath(symbol) {
    if (buffer === "0"){
        return;
    }

    let intNumber = parseInt(buffer );

    if (runningTotal === 0){
        runningTotal = intNumber;
    } else {
        flushOperation(intNumber);
    }

    previousOperator = symbol;

    buffer = "0";
}

function flushOperation(intNumber){
    switch(previousOperator){
        case "+":
            runningTotal += intNumber;
            break;
        case "-":
            runningTotal -= intNumber;
            break;
        case "×":
            runningTotal *= intNumber;
            break;
        case "÷":
            runningTotal /= intNumber;
            break;
    
    }
}

function handleNumber(stringNumber){
    if (buffer === "0"){
        buffer = stringNumber;
    } else {
        buffer += stringNumber;
    }
}


// Listeners
buttons.addEventListener("click", (e) => {
    buttonClick(e.target.textContent);
})