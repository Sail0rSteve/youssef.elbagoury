const inputElement = document.getElementById("input");
const outputElement = document.getElementById("output");
const promptElement = document.getElementById("prompt");

const commands = {
    "help": "Available commands: help, ls, pwd, date, clear",
    "ls": "Desktop  Documents  Downloads  Pictures  Music  Videos",
    "pwd": "/home/user",
    "date": new Date().toLocaleString(),
    "clear": ""
};

function printOutput(text) {
    const outputLine = document.createElement("div");
    outputLine.textContent = text;
    outputElement.appendChild(outputLine);
    outputElement.scrollTop = outputElement.scrollHeight; // Scroll to bottom
}

function handleInput(event) {
    if (event.key === "Enter") {
        const command = inputElement.value.trim();
        printOutput(`${promptElement.textContent} ${command}`);

        if (command in commands) {
            if (commands[command]) {
                printOutput(commands[command]);
            }
        } else {
            printOutput(`bash: ${command}: command not found`);
        }

        inputElement.value = ""; // Clear input after command
    }
}

inputElement.addEventListener("keydown", handleInput);

// Focus on input field when the page loads
window.onload = () => {
    inputElement.focus();
};
