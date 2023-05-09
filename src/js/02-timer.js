import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  dateInput: document.getElementById('datetime-picker'),
  timerStartBtnEl: document.querySelector('[data-start]'),
  timerContainerEls: document.querySelectorAll(
    '[data-days], [data-hours], [data-minutes], [data-seconds]'
  ),
};

const { dateInput, timerStartBtnEl, timerContainerEls } = refs;

timerStartBtnEl.disabled = true;

let selectedDate = 0;

let dateTimer = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    const dateDifference = selectedDates[0] - new Date();
    const isFutureTimeChosen = dateDifference > 0;
    if (!isFutureTimeChosen) {
      timerStartBtnEl.disabled = true;
      Notify.failure('Please choose a date in the future');
    } else {
      timerStartBtnEl.disabled = false;
    }
  },
};

flatpickr(dateInput, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return (paddedValue = value.padStart(2, '0'));
}

function handleTimer() {
  const dateDifference = selectedDate - new Date();
  const dateObjValues = Object.values(convertMs(dateDifference));
  timerContainerEls.forEach((el, i) => {
    el.textContent = addLeadingZero(dateObjValues[i].toString());
  });
  timerStartBtnEl.disabled = true;
  if (dateDifference <= 999) {
    clearInterval(dateTimer);
  }
}

timerStartBtnEl.addEventListener(
  'click',
  () => (dateTimer = setInterval(handleTimer, 1000))
);
