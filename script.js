const terminal = document.getElementById('terminal');
const prompt = document.getElementById('prompt');
const commandInput = document.getElementById('command');
const cursor = document.getElementById('cursor');

const commands = {
    "help": "Available commands: help, ls, pwd, date, clear, cat, cd",
    "ls": "Desktop  Documents  Downloads  Pictures  Music  Videos  Realsiteflag.txt",
    "pwd": "/home/Guest",
    "date": () => new Date().toLocaleString(),
    "clear": () => {
        terminal.textContent = `${prompt.textContent} \n`;
        commandInput.value = '';
    },
    "cat Realsiteflag.txt": "flags are never that easy :) , hint: I used this terminal before you.",
    "history": "whoami",
    "whoami": "flag{https://sail0rsteve.github.io/Y0ussefElbag0ury/}"
};

function handleCommand(cmd) {
    cursor.textContent = ''; // Hide cursor while processing

    if (commands.hasOwnProperty(cmd)) {
        const output = commands[cmd];

        if (typeof output === 'function') {
            terminal.textContent += `${prompt.textContent} ${cmd}\n${output()}\n`;
        } else {
            terminal.textContent += `${prompt.textContent} ${cmd}\n${output}\n`;
        }
    } else {
        terminal.textContent += `${prompt.textContent} ${cmd}\nCommand not found. Type 'help' for available commands.\n`;
    }

    commandInput.value = '';
    commandInput.focus();
    cursor.textContent = '_'; // Restore cursor
}

commandInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const command = commandInput.value.trim();
        handleCommand(command);
    }
});
