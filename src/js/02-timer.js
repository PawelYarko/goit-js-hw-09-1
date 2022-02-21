import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const btnStart = document.querySelector('.btn-start');
const dataPicker = document.querySelector('#datetime-picker');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');


// btnStart.setAttribute('disabled', 'disabled');
btnStart.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    // dateFormat: 'd-H-i-S',
    defaultDate: Date.now(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const startTime = selectedDates[0];
      const currentTime = Date.now();
      let timerId = null;

      if(startTime < currentTime){
        Notiflix.Notify.failure('Please choose a date in the future');
        btnStart.disabled = true;
      }else if(startTime > currentTime){
        btnStart.disabled = false;
      }
      

      const timer ={
    start() {
      const startTime = selectedDates[0];
      const INTERVAL = 1000;
      timerId = setInterval(()=>{
        const currentTime = Date.now();
        const deltaTime =  startTime - currentTime;
        const time = convertMs(deltaTime);
        updateClockFace(time);
        if(deltaTime < 1000){
          timer.stop();
        }
      },INTERVAL) 
    }, 
    stop() {
        clearInterval(timerId);  
    },
  };
  timer.stop();  
  btnStart.addEventListener('click', ()=>{
    timer.start();
    btnStart.removeAttribute('unable', 'unable');
    btnStart.setAttribute('disabled', 'disabled');
   });
    },
  };
  

  let date = flatpickr(dataPicker, options);
  dataPicker.addEventListener('input', ()=>{         
  });





function updateClockFace({ days, hours, minutes, seconds }){
    dataDays.textContent = days;
    dataHours.textContent = hours;
    dataMinutes.textContent = minutes;
    dataSeconds.textContent = seconds;
    
  }

  

  function pad (value){
    return String(value).padStart(2 , '0');
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