let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCounter = 0;

const timeDisplay = document.getElementById('time-display');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const lapButton = document.getElementById('lap-button');
const lapsList = document.getElementById('laps-list');

pauseButton.disabled = true;
resetButton.disabled = true;
lapButton.disabled = true;

startButton.onclick = function() {
    if (!running) {
        running = true;
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getTime, 1);
        startButton.textContent = "Resume";
        pauseButton.disabled = false;
        resetButton.disabled = false;
        lapButton.disabled = false;
    }
};

pauseButton.onclick = function() {
    if (running) {
        running = false;
        clearInterval(tInterval);
        pauseButton.textContent = "Paused";
        startButton.textContent = "Resume";
    }
};

resetButton.onclick = function() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    timeDisplay.textContent = "00:00:00";
    startButton.textContent = "Start";
    pauseButton.disabled = true;
    resetButton.disabled = true;
    lapButton.disabled = true;
    pauseButton.textContent = "Pause";
    lapsList.innerHTML = "";
    lapCounter = 0;
};

lapButton.onclick = function() {
    lapCounter++;
    const lapTime = document.createElement('li');
    lapTime.textContent = `Lap ${lapCounter}: ${timeDisplay.textContent}`;
    lapsList.appendChild(lapTime);
};

function getTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    timeDisplay.textContent = hours + ":" + minutes + ":" + seconds;
}
