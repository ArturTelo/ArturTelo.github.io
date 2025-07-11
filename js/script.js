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
      terminalOutput.scrollTop = terminalOutput.scrollHeight; // 👈 scrolls every char
      i++;
      setTimeout(type, speed);
    } else {
      container.innerHTML = htmlString; // restore styled HTML
      terminalOutput.scrollTop = terminalOutput.scrollHeight; // ensure it's at the bottom
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

  setTimeout(() => {
  terminalOutput.scrollTo({
    top: terminalOutput.scrollHeight,
    behavior: 'smooth'
  });
}, 50);

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
  const footerTime = document.getElementById('footer-time');
  const now = new Date();
  footerTime.textContent = now.toLocaleString();
}

setInterval(updateFooterTime, 1000);
updateFooterTime(); // Initial update

const card = document.getElementById("interactive-card");

let isDragging = false;
let startX = 0;
let startY = 0;
let rotationX = 0;
let rotationY = 0;
let velocityX = 0;
let velocityY = 0;
let animationFrameId = null;

card.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  cancelAnimationFrame(animationFrameId);
  card.style.transition = "none";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const deltaX = e.clientX - startX;
  const deltaY = e.clientY - startY;

  rotationY = Math.max(Math.min(deltaX / 2, 45), -45); // Left-right tilt
  rotationX = Math.max(Math.min(deltaY / 2, 45), -45); // Up-down tilt

  velocityX = deltaX * 0.4;
  velocityY = deltaY * 0.4;

  card.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
});

document.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;
  springBack();
});

function springBack() {
  function animate() {
    velocityX *= 0.85;
    velocityY *= 0.85;

    rotationX -= velocityY;
    rotationY -= velocityX;

    card.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

    if (Math.abs(velocityX) > 0.4 || Math.abs(velocityY) > 0.4) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      card.style.transition = "transform 0.3s ease-out";
      card.style.transform = `rotateX(0deg) rotateY(0deg)`;
    }
  }

  animationFrameId = requestAnimationFrame(animate);
}

function adjustRopeHeight() {
  const cardZone = document.querySelector('.card-zone');
  const rope = document.querySelector('.lanyard-line');

  if (cardZone && rope) {
    const cardTop = cardZone.getBoundingClientRect().top;
    rope.style.height = `${cardTop - 30}px`; // minus some offset for margin
  }
}

window.addEventListener('load', adjustRopeHeight);
window.addEventListener('resize', adjustRopeHeight);

function updateRopeHeight() {
  const leftPanel = document.querySelector('.left-panel');
  const card = document.getElementById('interactive-card');
  const rope = document.querySelector('.lanyard-line');

  if (!leftPanel || !card || !rope) return;

  const panelTop = leftPanel.getBoundingClientRect().top;
  const cardTop = card.getBoundingClientRect().top;

  const height = cardTop - panelTop - 10; // 10px offset for breathing room
  rope.style.height = `${height}px`;
}

// Recalculate on load and resize
window.addEventListener('load', updateRopeHeight);
window.addEventListener('resize', updateRopeHeight);
