import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handleSubmitForm(evt) {
  const { delay, step, amount } = Object.fromEntries(
    new FormData(evt.currentTarget)
  );

  const numAmount = parseInt(amount);
  const numDelay = parseInt(delay);
  const numStep = parseInt(step);

  for (let i = 0; i < numAmount; i += 1) {
    createPromise(i + 1, numDelay + i * numStep)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

formEl.addEventListener('submit', evt => {
  evt.preventDefault();
  handleSubmitForm(evt);
  evt.currentTarget.reset();
});
