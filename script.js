const inputElement = document.getElementById("input");
const outputElement = document.getElementById("output");

const commands = {
    "help": "Available commands: help, ls, pwd, date, clear, cat, cd",
    "ls": "Desktop  Documents  Downloads  Pictures  Music  Videos  Realsiteflag.txt",
    "pwd": "/home/Guest",
    "date": new Date().toLocaleString(),
    "clear": "",
    "cat": "flags are never that easy :) , hint: I used this terminal before you.",
    "history": "whoami",
    "whoami": "flag{https://sail0rsteve.github.io/Y0ussefElbag0ury/}"
};

let currentDirectory = "/home/Guest"; // Current directory path

// Function to print output
function printOutput(text) {
    const outputLine = document.createElement("div");
    outputLine.textContent = text;
    outputElement.appendChild(outputLine);
    outputElement.scrollTop = outputElement.scrollHeight; // Scroll to bottom
}

// Main input handling
function handleInput(event) {
    if (event.key === "Enter") {
        const command = inputElement.value.trim();
        let commandExecuted = false; // Flag to track if command is already executed

        // Change prompt to show user as "Guest"
        printOutput(`Guest@sail0rsteve:~$ ${command}`);

        // Handle `cd` commands first
        if (command.startsWith("cd ")) {
            const dir = command.split(" ")[1];
            if (["Desktop", "Documents", "Downloads", "Pictures", "Music", "Videos"].includes(dir)) {
                printOutput(`bash: cd: ${dir}: Permission denied`);
                commandExecuted = true;
            } else if (dir === "Realsiteflag.txt") {
                printOutput(`bash: cd: ${dir}: Not a directory`);
                commandExecuted = true;
            } else if (dir === "..") {
                currentDirectory = "/home/Guest";
                printOutput(`Changed directory to ${currentDirectory}`);
                commandExecuted = true;
            } else if (dir === "/") {
                currentDirectory = "/";
                printOutput(`Changed directory to ${currentDirectory}`);
                commandExecuted = true;
            } else if (!dir) {
                printOutput(`bash: cd: missing operand`);
                commandExecuted = true;
            }
        }

        // Handle special commands and only execute them once
        if (!commandExecuted) {
            // Handle specific command outputs directly
            if (command === "cat Realsiteflag.txt") {
                printOutput("flags are never that easy :) , hint: I used this terminal before you.");
                commandExecuted = true; // Mark as executed
            } else if (command === "cat") {
                printOutput(commands["cat"]);
                commandExecuted = true; // Mark as executed
            } else if (command === "history") {
                printOutput(commands["history"]);
                commandExecuted = true; // Mark as executed
            } else if (command === "whoami") {
                printOutput(commands["whoami"]);
                commandExecuted = true; // Mark as executed
            }
        }

        // If command isn't one of the special cases, check the `commands` object
        if (!commandExecuted) {
            if (command === "help") {
                // Modified `help` output to exclude certain commands
                printOutput(commands["help"]);
                commandExecuted = true; // Mark as executed
            } else if (command in commands) {
                printOutput(commands[command]);
                commandExecuted = true; // Mark as executed
            } else if (command === "clear") {
                outputElement.innerHTML = ""; // Clear terminal output
                commandExecuted = true; // Mark as executed
            } else {
                printOutput(`bash: ${command}: command not found`);
            }
        }

        // Clear input after command
        inputElement.value = "";
    }
}

inputElement.addEventListener("keydown", handleInput);

// Focus on input field when the page loads
window.onload = () => {
    inputElement.focus();
};
