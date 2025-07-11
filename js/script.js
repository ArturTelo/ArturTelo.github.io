const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

const commands = {
  help: `
<span class="cmd-blue">Available commands:</span>
- <span class="cmd-blue">about</span>
- <span class="cmd-blue">skills</span>
- <span class="cmd-blue">projects</span>
- <span class="cmd-blue">contact</span>
- <span class="cmd-blue">clear</span>
  `,
  about: `
<span class="section-title">👋 Hello, I'm <span class="cmd-blue">Artur Telo</span>!</span>

I'm a <span class="cmd-blue">Full Stack Developer</span> focused on Laravel, JavaScript, and clean UI/UX.

<span class="cmd-blue">Background:</span>
- Junior Full Stack Developer
- Skilled in Laravel, Vue, Tailwind, and Node.js
- Passionate about UI/UX and creative coding

When I'm not coding, I explore animation and creative technology.
  `,
  skills: `
<span class="section-title">🧠 Skills:</span>
- JavaScript / PHP / Python
- Laravel / React / Vue / Node
- Tailwind / Bootstrap / SCSS
- MySQL / MongoDB / Firebase
- Git / GitHub / Docker
  `,
  projects: `
<span class="section-title">📁 Projects:</span>
1. Portfolio Website (You’re looking at it!)
2. Blog Engine with Laravel
3. Real-time Chat App (Node + Socket.io)
4. Creative AI Toybox (JS experiments)
  `,
  contact: `
<span class="section-title">📬 Contact:</span>
- Email: <a href="mailto:up202104487@up.pt">up202104487@up.pt</a>
- GitHub: <a href="https://github.com/yourusername" target="_blank">github.com/yourusername</a>
- LinkedIn: <a href="https://linkedin.com/in/yourusername" target="_blank">linkedin.com/in/yourusername</a>
  `
};

function typeWriterEffect(htmlString, container, callback) {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = htmlString;

  const fullText = tempElement.innerText;
  let i = 0;
  const speed = 1;

  function type() {
    if (i < fullText.length) {
      container.innerText += fullText.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      container.innerHTML = htmlString; // Restore styled HTML
      if (callback) callback();
    }
  }

  type();
}

function handleCommand(input) {
  const command = input.trim().toLowerCase();

  // Print typed command
  const commandLine = document.createElement('p');
  commandLine.innerHTML = `<span class="prompt">artur@portfolio:~$</span> ${command}`;
  terminalOutput.appendChild(commandLine);

  // Clear screen
  if (command === 'clear') {
    terminalOutput.innerHTML = '';
    return;
  }

  // Create output container
  const outputLine = document.createElement('p');
  terminalOutput.appendChild(outputLine);

  // Output content
  if (commands[command]) {
    typeWriterEffect(commands[command], outputLine);
  } else if (command !== '') {
    typeWriterEffect(
      `<span class="error">Command not found: ${command}</span>. Type '<span class="cmd-blue">help</span>' for available commands.`,
      outputLine
    );
  }

  // Auto scroll
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Enter key listener
terminalInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    handleCommand(terminalInput.value);
    terminalInput.value = '';
  }
});

// Focus on load
window.onload = () => {
  terminalInput.focus();
};

function updateFooterTime() {
  const timeEl = document.getElementById('footer-time');
  const now = new Date();
  timeEl.textContent = now.toLocaleString();
}

// Update time every second
setInterval(updateFooterTime, 1000);
updateFooterTime(); // Initial call
