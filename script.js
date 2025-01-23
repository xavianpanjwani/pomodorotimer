const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const skipBtn = document.getElementById('skipBtn');
const modeLabel = document.getElementById('modeLabel');
const alertSound = document.getElementById('alertSound');
const clearTasksBtn = document.getElementById('clearTasksBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

let currentMode = 'focus';
let countdown;
let timeLeft = 25 * 60;

function updateDisplay(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${secs}`;
}

function switchMode() {
  clearInterval(countdown);
  currentMode = currentMode === 'focus' ? 'break' : 'focus';
  modeLabel.textContent = currentMode === 'focus' ? 'Focus' : 'Break';
  timeLeft = currentMode === 'focus' ? 25 * 60 : 5 * 60;
  skipBtn.textContent = currentMode === 'focus' ? 'Skip to Break' : 'Skip to Focus';
  updateDisplay(timeLeft);
}

function startTimer() {
  startBtn.disabled = true;
  pauseBtn.disabled = false;

  countdown = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay(timeLeft);
    } else {
      clearInterval(countdown);
      alertSound.play();
      switchMode();
      startTimer();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(countdown);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function resetTimer() {
  clearInterval(countdown);
  currentMode = 'focus';
  modeLabel.textContent = 'Focus';
  timeLeft = 25 * 60;
  updateDisplay(timeLeft);
  skipBtn.textContent = 'Skip to Break';
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function skipToNextMode() {
  clearInterval(countdown);
  switchMode();
  startTimer();
}

function addTask(event) {
  if (event.key === 'Enter' && taskInput.value.trim() !== '') {
    const taskItem = document.createElement('div');
    taskItem.className = 'task';
    taskItem.innerHTML = `
      <input type="checkbox" class="task-checkbox">
      <span>${taskInput.value.trim()}</span>
    `;
    taskList.appendChild(taskItem);
    taskInput.value = '';
  }
}

function clearTasks() {
  taskList.innerHTML = '';
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
skipBtn.addEventListener('click', skipToNextMode);
clearTasksBtn.addEventListener('click', clearTasks);
taskInput.addEventListener('keydown', addTask);

// Initialize
updateDisplay(timeLeft);
