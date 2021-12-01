import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      }
      // Reject
      reject({ position, delay });
    }, delay);
  });
}

const refs = {
  mainForm: document.querySelector('.form'),
  firstInput: document.querySelector('input[name="delay"]'),
  stepInput: document.querySelector('input[name="step"]'),
  amountInput: document.querySelector('input[name="amount"]'),
  submitBtn: document.querySelector('button[type="submit"]'),
};

let delay;

refs.mainForm.addEventListener('submit', startMakePromise);

function startMakePromise(e) {
  e.preventDefault();

  const firstInputDelay = Number(refs.firstInput.value);
  const stepInputDelay = Number(refs.stepInput.value);
  const amountCounter = Number(refs.amountInput.value);

  delay = firstInputDelay;

  for (let position = 1; position <= amountCounter; position++) {
    delay += stepInputDelay;
    console.log(delay);

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
