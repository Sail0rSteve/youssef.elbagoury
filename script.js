const inputElement = document.getElementById("input");
const outputElement = document.getElementById("output");
const promptElement = document.getElementById("prompt");

const commands = {
    "help": "Available commands: help, ls, pwd, date, clear, cat, cd",
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
        // Change prompt to show user as "Guest"
        printOutput(`Guest@sail0rsteve:~$ ${command}`);

        if (command === "cd Desktop" || command === "cd Documents" || command === "cd Downloads" || command === "cd Pictures" || command === "cd Music" || command === "cd Videos") {
            // Simulate "Permission Denied" when attempting to `cd` into any directory
            printOutput(`bash: cd: ${command.split(' ')[1]}: Permission denied`);
        } else if (command === "cd Realsiteflag.txt") {
            // Handle `cd` with file (should not be possible)
            printOutput(`bash: cd: ${command.split(' ')[1]}: Not a directory`);
        } else if (command === "cd ..") {
            // Go back to home directory (simplified behavior)
            currentDirectory = "/home/Guest";
            printOutput(`Changed directory to ${currentDirectory}`);
        } else if (command === "cd /") {
            // Simulate root directory access
            currentDirectory = "/";
            printOutput(`Changed directory to ${currentDirectory}`);
        } else if (command === "cd") {
            printOutput(`bash: cd: missing operand`);
        } else if (command in commands) {
            if (commands[command]) {
                printOutput(commands[command]);
            }
            if (command === "cat Realsiteflag.txt") {
                // Display the content of the file (the flag hint)
                printOutput(commands["cat Realsiteflag.txt"]);
            }
            if (command === "history") {
                // Simulate a history of commands with the "whoami" command
                printOutput(commands["history"]);
            }
            if (command === "whoami") {
                // Reveal the flag link
                printOutput(commands["whoami"]);
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
