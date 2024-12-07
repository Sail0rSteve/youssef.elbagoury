const inputElement = document.getElementById("input");
const outputElement = document.getElementById("output");
const promptElement = document.getElementById("prompt");

const commands = {
    "help": "Available commands: help, ls, pwd, date, clear, cat",
    "ls": "Desktop  Documents  Downloads  Pictures  Music  Videos  Realsiteflag.txt",
    "pwd": "/home/Guest",
    "date": new Date().toLocaleString(),
    "clear": "",
    "cat Realsiteflag.txt": " flags are never that easy :) , hint : i used this terminal before you."
    "history": "whoami"
    "whoami": "flag{https://sail0rsteve.github.io/Y0ussefElbag0ury/}"
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
        // Change prompt to show user as "Guest"
        printOutput(`Guest@sail0rsteve:~$ ${command}`);

        if (command in commands) {
            if (commands[command]) {
                printOutput(commands[command]);
            }
            if (command === "cat websiteflag.txt") {
                // Display the content of the file (the website link)
                printOutput(commands["cat websiteflag.txt"]);
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
