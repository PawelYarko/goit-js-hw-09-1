const btnStart = document.querySelector('.btn-start');
const btnStop = document.querySelector('.btn-stop');
const bgcBody = document.querySelector('body');
let timerId = null;

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick)




function onBtnStartClick(){
    btnStart.disabled = true;
    timerId = setInterval(() =>{
        bgcBody.style.backgroundColor = getRandomHexColor();
    }, 1000);
}
function onBtnStopClick(){
    btnStart.disabled = false;
    clearInterval(timerId);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }






