const rockButton = document.getElementById('rock-button');
const paperButton = document.getElementById('paper-button');
const scissorsButton = document.getElementById('scissors-button');
const resultDiv = document.getElementById('result');

rockButton.addEventListener('click', function() {
  playGame('rock');
});

paperButton.addEventListener('click', function() {
  playGame('paper');
});

scissorsButton.addEventListener('click', function() {
  playGame('scissors');
});

function playGame(playerChoice) {
  const computerChoice = getComputerChoice();
  let resultText = '';
  if (playerChoice === computerChoice) {
    resultText = 'Tie game!';
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    resultText = 'You win!';
  } else {
    resultText = 'You lose!';
  }
  resultDiv.textContent = resultText;
}

function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}