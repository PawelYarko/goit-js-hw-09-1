import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('[name="delay"]');
const inputStep = document.querySelector('[name="step"]');
const inputAmount = document.querySelector('[name="amount"]');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e){
  e.preventDefault();
  let delay = Number(inputDelay.value);
  let step = Number(inputStep.value);
  let amount = inputAmount.value;
  let position = 1;
const mas = [];  
  mas.push({position: position, delay: delay});  
  for(let i = 2; i <= amount; i +=1){
    delay += step;
    position = i;
    mas.push({position: position, delay: delay});
  }

  runPromises(mas);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) =>{
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() =>{
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    },delay)                                                      
  }); 
}

function runPromises(mas){
  for(let i=0; i <= mas.length; i+=1){
  let position = mas[i].position;
  let delay = mas[i].delay;

    createPromise(position, delay)
  .then(({position, delay}) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`);
  })
  .catch(({position, delay}) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`);
  });
  }
}
