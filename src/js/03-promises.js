import Notiflix from 'notiflix';

const refs = {
  formArea: document.querySelector('form'),
  inputsArea: document.querySelectorAll('input'),
};
let inputValue = [];
let timerId = null;
let counter = 0;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } else {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  }
}

refs.formArea.addEventListener('submit', startPromisEvent);

function startPromisEvent(e) {
  e.preventDefault();
  refs.inputsArea.forEach(takeInputsValue);
  let [delay, step, amount] = inputValue;

  timerId = setInterval(() => {
    counter += 1;
    if (amount <= counter) {
      clearInterval(timerId);
    }
    createPromise(counter, delay);
    delay += step;
    console.log(counter);
  }, delay);
}

function takeInputsValue(input) {
  return inputValue.push(Number(input.value));
}
