const inputElement = document.getElementById("input");
const outputElement = document.getElementById("output");
const promptElement = document.getElementById("prompt");

const commands = {
    "help": "Available commands: help, ls, pwd, date, clear, cat Realsiteflag.txt, history, whoami, cd",
    "ls": "Desktop  Documents  Downloads  Pictures  Music  Videos  Realsiteflag.txt",
    "pwd": "/home/Guest",
    "date": new Date().toLocaleString(),
    "clear": "",
    "cat Realsiteflag.txt": "flags are never that easy :) , hint: I used this terminal before you.",
    "history": "whoami",
    "whoami": "flag{https://sail0rsteve.github.io/Y0ussefElbag0ury/}"
};

let currentDirectory = "/home/Guest"; // Current directory path

function printOutput(text) {
    const outputLine = document.createElement("div");
    outputLine.textContent = text;
    outputElement.appendChild(outputLine);
    outputElement.scrollTop = outputElement.scrollHeight; // Scroll to bottom
}

function handleInput(event) {
    if (event.key === "Enter") {
        const command = inputElement.value.trim();
        let commandExecuted = false; // Flag to track if command is already executed

        // Change prompt to show user as "Guest"
        printOutput(`Guest@sail0rsteve:~$ ${command}`);

        if (command === "cd Desktop" || command === "cd Documents" || command === "cd Downloads" || command === "cd Pictures" || command === "cd Music" || command === "cd Videos") {
            printOutput(`bash: cd: ${command.split(' ')[1]}: Permission denied`);
            commandExecuted = true;
        } else if (command === "cd Realsiteflag.txt") {
            printOutput(`bash: cd: ${command.split(' ')[1]}: Not a directory`);
            commandExecuted = true;
        } else if (command === "cd ..") {
            currentDirectory = "/home/Guest";
            printOutput(`Changed directory to ${currentDirectory}`);
            commandExecuted = true;
        } else if (command === "cd /") {
            currentDirectory = "/";
            printOutput(`Changed directory to ${currentDirectory}`);
            commandExecuted = true;
        } else if (command === "cd") {
            printOutput(`bash: cd: missing operand`);
            commandExecuted = true;
        }

        // Check for special commands only if not already handled
        if (!commandExecuted) {
            if (command in commands) {
                printOutput(commands[command]);
            } else {
                printOutput(`bash: ${command}: command not found`);
            }

            // Handle specific command outputs
            if (command === "cat Realsiteflag.txt") {
                printOutput(commands["cat Realsiteflag.txt"]);
                commandExecuted = true; // Mark as executed
            }
            if (command === "history") {
                printOutput(commands["history"]);
                commandExecuted = true; // Mark as executed
            }
            if (command === "whoami") {
                printOutput(commands["whoami"]);
                commandExecuted = true; // Mark as executed
            }
        }

        inputElement.value = ""; // Clear input after command
    }
}

inputElement.addEventListener("keydown", handleInput);

// Focus on input field when the page loads
window.onload = () => {
    inputElement.focus();
};
