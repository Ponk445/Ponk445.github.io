let startTime;
let elapsedTime = 0;
let timerInterval;

const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
const timeInput = document.getElementById("timeInput");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const resetButtonTimer = document.getElementById("resetButtonTimer");
const timeLeft = document.getElementById("timeLeft");
let timeLeftInterval;
let timeLeftSeconds;
let timeEndedSound = document.getElementById("timeEndedSound");

playButton.addEventListener("click", start);
pauseButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButtonTimer.addEventListener("click", resetTimer);

function start() {
	startTime = Date.now() - elapsedTime;
	timerInterval = setInterval(function printTime() {
		elapsedTime = Date.now() - startTime;
		document.getElementById("display").innerHTML = timeToString(elapsedTime);
	}, 10);
	playButton.style.display = "none";
	pauseButton.style.display = "block";
}

function pause() {
	clearInterval(timerInterval);
	playButton.style.display = "block";
	pauseButton.style.display = "none";
}

function reset() {
	clearInterval(timerInterval);
	elapsedTime = 0;
	document.getElementById("display").innerHTML = timeToString(elapsedTime);
	playButton.style.display = "block";
	pauseButton.style.display = "none";
}

function timeToString(time) {
	let diffInHrs = time / 3600000;
	let hh = Math.floor(diffInHrs);
	let diffInMin = (diffInHrs - hh) * 60;
	let mm = Math.floor(diffInMin);
	let diffInSec = (diffInMin - mm) * 60;
	let ss = Math.floor(diffInSec);
	let diffInMs = (diffInSec - ss) * 100;
	let ms = Math.floor(diffInMs);
	let formattedMM = mm.toString().padStart(2, "0");
	let formattedSS = ss.toString().padStart(2, "0");
	let formattedMS = ms.toString().padStart(2, "0");
	return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

function startTimer() {
	if (timeInput.value <= 0 || timeInput.value > 3600) {
		alert("Please enter a valid time (1 to 3600 seconds).");
		return;
	}
	timeLeftSeconds = parseInt(timeInput.value);
	timeLeft.innerHTML = formatTime(timeLeftSeconds);
	startButton.style.display = "none";
	stopButton.style.display = "block";
	timeLeftInterval = setInterval(() => {
		timeLeftSeconds--;
		timeLeft.innerHTML = formatTime(timeLeftSeconds);
		if (timeLeftSeconds <= 0) {
			stopTimer();
			playTimeEndedSound();
		}
	}, 1000);
}

function stopTimer() {
	clearInterval(timeLeftInterval);
	startButton.style.display = "block";
	stopButton.style.display = "none";
	timeLeftSeconds = parseInt(timeInput.value);
	timeInput.value = "";
}

function resetTimer() {
	stopTimer();
	timeLeft.innerHTML = "00:00";
}

function formatTime(timeLeftSeconds) {
	let minutes = Math.floor(timeLeftSeconds / 60);
	let seconds = timeLeftSeconds % 60;
	return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function playTimeEndedSound() {
	timeEndedSound.play();
}

// Play/pause the stopwatch on click
document.addEventListener("click", (event) => {
	if (event.target == document.querySelector("body")) {
		if (elapsedTime === 0) {
			start();
		} else {
			pause();
		}
	}
});

// Hide the stopwatch on mobile
window.addEventListener("resize", () => {
	if (window.innerWidth < 768) {
		document.querySelector(".stopwatch").style.display = "none";
	} else {
		document.querySelector(".stopwatch").style.display = "block";
	}
});

// Play the stopwatch mobile
document.addEventListener("touchstart", (event) => {
	if (elapsedTime === 0 && window.innerWidth >= 768) {
		start();
	}
});

// Pause the stopwatch mobile
document.addEventListener("touchend", (event) => {
	if (elapsedTime > 0 && window.innerWidth >= 768) {
		pause();
	}
});