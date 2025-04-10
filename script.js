// You can set your text here:
const text = `Your typing text goes here...`;

const textDisplay = document.getElementById('textDisplay');
const inputArea = document.getElementById('inputArea');
const timerDisplay = document.getElementById('timer');
const resetBtn = document.getElementById('resetBtn');
const restartBtn = document.getElementById('restartBtn');
const quitBtn = document.getElementById('quitBtn');

let startTime;
let timerInterval;

// Render the text as individual span elements
function renderText() {
  textDisplay.innerHTML = '';
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    span.textContent = text[i];
    textDisplay.appendChild(span);
  }
}

// Start the timer
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
      timerDisplay.textContent = `${elapsed}`;
    }, 100);
  }
  
// Stop the timer
function stopTimer() {
  clearInterval(timerInterval);
}

// Reset typing input and text colors
function resetGame() {
    inputArea.value = '';
    renderText();
    timerDisplay.textContent = '0.00';
    stopTimer();
    startTime = null;
  }
  

// Restart game: same as reset
function restartGame() {
  resetGame();
  inputArea.focus();
}

// Quit game: disables input
function quitGame() {
  inputArea.disabled = true;
  stopTimer();
  timerDisplay.textContent = 'Game quit.';
}

// Typing logic
inputArea.addEventListener('input', () => {
  const input = inputArea.value;
  const spans = textDisplay.querySelectorAll('span');

  if (input.length === 1 && !startTime) {
    startTimer();
  }

  for (let i = 0; i < spans.length; i++) {
    const char = input[i];
    const span = spans[i];

    if (char == null) {
      span.className = '';
    } else if (char === text[i]) {
      span.className = 'correct';
    } else {
      span.className = 'incorrect';
    }
  }

  if (input === text) {
    stopTimer();
    const finalTime = ((Date.now() - startTime) / 1000).toFixed(2);
    saveRecentTime(finalTime);
    loadRecents();
    alert(`Completed in ${finalTime} seconds!`);


  }
});

// Button handlers
resetBtn.addEventListener('click', resetGame);
restartBtn.addEventListener('click', restartGame);
quitBtn.addEventListener('click', quitGame);

// Initial render
renderText();


function loadRecents() {
    const recents = JSON.parse(localStorage.getItem('recentTimes')) || [];
    const recentsList = document.getElementById('recentsList');
    recentsList.innerHTML = '';
    recents.forEach((time, index) => {
      const li = document.createElement('li');
      li.textContent = `${index + 1}. ${time} seconds`;
      recentsList.appendChild(li);
    });
  }

  
  function saveRecentTime(time) {
    let recents = JSON.parse(localStorage.getItem('recentTimes')) || [];
    recents.unshift(time); // Add to the beginning
    if (recents.length > 5) recents = recents.slice(0, 5); // Keep max 5
    localStorage.setItem('recentTimes', JSON.stringify(recents));
    
  }