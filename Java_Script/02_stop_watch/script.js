const hour = document.getElementById('HH');
const minute = document.getElementById('MM');
const second = document.getElementById('SS');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const stopBtn = document.getElementById('stop');
const lapBtn = document.getElementById('lap');
const lapRec = document.getElementById('lapRecord');
let hh = 0;
let mm = 0;
let ss = 0;
let hhText = "";
let mmText = "";
let ssText = "";

let interval = null;

function startTimer() {
    interval = setInterval(()=>{

        ss++;
        if (ss>=60) {
            mm++;
            ss = 0;
        }
        if (mm>=60) {
            hh++;
            mm = 0;
        }

        hhText = (hh<10) ? ("0" + hh) : hh;
        mmText = (mm<10) ? ("0" + mm) : mm;
        ssText = (ss<10) ? ("0" + ss) : ss;

        second.innerHTML = ssText;
        minute.innerHTML = mmText;
        hour.innerHTML = hhText;

    },1000);
}

startBtn.addEventListener('click',() => {
    startTimer();

    pauseBtn.disabled = false;
    stopBtn.disabled = false;
    startBtn.disabled = true;
    lapBtn.disabled = false;
});


pauseBtn.addEventListener('click',() => {

    if(pauseBtn.innerHTML === "Pause"){
        pauseBtn.innerHTML = "Continue";
        clearInterval(interval);
    }
    else{
        pauseBtn.innerHTML = "Pause";
        startTimer();
    }
});


stopBtn.addEventListener('click',() => {
    clearInterval(interval);
    ss = 0;
    mm = 0;
    hh = 0;

    hour.innerHTML = "00";
    minute.innerHTML = "00";
    second.innerHTML = "00";

    pauseBtn.disabled = true;
    stopBtn.disabled = true;
    startBtn.disabled = false;
    lapBtn.disabled = true;

    pauseBtn.innerHTML= "Pause";
    lapRec.innerHTML = "";
});


lapBtn.addEventListener('click',() =>{
    let newList = document.createElement('li');
    newList.innerText = `🚩   ${hhText}:${mmText}:${ssText}`;
    lapRec.appendChild(newList);
    count++;
});