const refs = {
  startBtnEl: document.querySelector('[data-start]'),
  stopBtnEl: document.querySelector('[data-stop]'),
};

const { startBtnEl, stopBtnEl } = refs;

let changeColorInterval = null;

stopBtnEl.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const changeBodyColor = () => {
  document.body.style.backgroundColor = getRandomHexColor();
};

const toggleDisabledAttr = (startEl, stopEl) => {
  startEl.disabled = !startEl.disabled;
  stopEl.disabled = !stopEl.disabled;
};

const startChangeBodyColor = () => {
  changeColorInterval = setInterval(changeBodyColor, 1000);
  toggleDisabledAttr(startBtnEl, stopBtnEl);
};

const stopChangeBodyColor = () => {
  clearInterval(changeColorInterval);
  toggleDisabledAttr(startBtnEl, stopBtnEl);
};

startBtnEl.addEventListener('click', startChangeBodyColor);
stopBtnEl.addEventListener('click', stopChangeBodyColor);

















