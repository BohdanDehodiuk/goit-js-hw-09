import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputCalendar: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysValeu: document.querySelector('[data-days]'),
  hoursValeu: document.querySelector('[data-hours]'),
  minutesValeu: document.querySelector('[data-minutes]'),
  secondsValeu: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

let timerId = null;
let selectDate = 0;
let timeLeft;

let options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    selectDate = selectedDates[0];
    if (selectDate < options.defaultDate) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    refs.startBtn.disabled = false;
  },
};

flatpickr(refs.inputCalendar, options);

refs.startBtn.addEventListener('click', startTimer);

function startTimer() {
  refs.startBtn.removeEventListener('click', startTimer);
  timerId = setInterval(() => {
    let nowDate = Date.now();
    timeLeft = selectDate - nowDate;
    updateTimer(convertMs(timeLeft));
    console.log(timeLeft);
    if (timeLeft < 1000) {
      clearInterval(timerId);
    }
  }, 1000);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.daysValeu.innerHTML = `${days}`;
  refs.hoursValeu.innerHTML = `${hours}`;
  refs.minutesValeu.innerHTML = `${minutes}`;
  refs.secondsValeu.innerHTML = `${seconds}`;
}
