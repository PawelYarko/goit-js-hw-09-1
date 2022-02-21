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
    // delay[0] = delay;
    mas.push({position: position, delay: delay});
  }
  console.log(mas);
  // const promises = mas.map(createPromise);
  const promises = mas.map(elem => createPromise(elem.position, elem.delay));


  console.log(promises);

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

  
  // createPromise(position, delay)
  Promise.all(promises)
  .then(({position, delay}) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`);
  })
  .catch(({position, delay}) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`);
  });
}
