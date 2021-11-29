function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let body = document.body;
const PROMPT_DELAY = 1000;
let promptCounter = 0;
let intervalId = null;
let isActive = false;

startBtn.addEventListener('click', startChangeColor);

stopBtn.addEventListener('click', stopChangeColor);

function startChangeColor() {
  if (isActive) {
    return;
  }

  const makeDisable = stopBtn.hasAttribute('disabled');
  if (makeDisable) {
    stopBtn.removeAttribute('disabled');
  }

  startBtn.setAttribute('disabled', 'disabled');
  isActive = true;

  intervalId = setInterval(() => {
    body.style.background = getRandomHexColor();
    promptCounter += 1;
  }, PROMPT_DELAY);
}

function stopChangeColor() {
  if (isActive) {
    clearInterval(intervalId);
    stopBtn.setAttribute('disabled', 'disabled');
    startBtn.removeAttribute('disabled');
    isActive = false;
    return;
  }
}
