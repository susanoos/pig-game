'use strict';
const player1 = document.querySelector('.player--0');
const player1Score = document.getElementById('score--0');
const p1CurrentScore = document.getElementById('current--0');
const player2 = document.querySelector('.player--1');
const p2CurrentScore = document.getElementById('current--1');
const player2Score = document.getElementById('score--1');
const btnRollDice = document.querySelector('.btn--roll');
const btnHoldDice = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
const dice = document.querySelector('.dice');
let player1CurrentScore = 0;
let player2CurrentScore = 0;
let p1Score = 0;
let p2Score = 0;

player1Score.textContent = 0;
player2Score.textContent = 0;

// Generates a random dice
const rollDice = () => {
  let dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);
  return dice;
};

// Game logic function
const game = () => {
  btnRollDice.addEventListener('click', () => {
    let randomDice = rollDice();
    // sets randome dice image
    dice.src = `dice-${randomDice}.png`;
    // checks if it is player 1's turn by checking the classList and if the dice is not equal to 1 then player 1 keeps playing
    if (player1.classList.contains('player--active') && randomDice != 1) {
      player1CurrentScore += randomDice;
      p1CurrentScore.textContent = player1CurrentScore;

      // same logic as player 1 but for player 2
    } else if (
      player2.classList.contains('player--active') &&
      randomDice != 1
    ) {
      player2CurrentScore += randomDice;
      p2CurrentScore.textContent = player2CurrentScore;

      // checks if the dice is equal to one and if it is then it will switch player
    } else if (
      player1.classList.contains('player--active') &&
      randomDice === 1
    ) {
      player1CurrentScore = 0;
      p1CurrentScore.textContent = player1CurrentScore;
      player1.classList.remove('player--active');
      player2.classList.add('player--active');

      // same as the logic above
    } else if (
      player2.classList.contains('player--active') &&
      randomDice === 1
    ) {
      player2CurrentScore = 0;
      p2CurrentScore.textContent = player2CurrentScore;
      player2.classList.remove('player--active');
      player1.classList.add('player--active');
    }
  });
};

// hold button function
const hold = () => {
  btnHoldDice.addEventListener('click', () => {
    // will save the current score for player 1 and switch to player 2 and will remove 'player--active' class and add to player 2
    if (player1.classList.contains('player--active')) {
      p1Score += player1CurrentScore;
      player1Score.textContent = p1Score;
      player1CurrentScore = 0;
      p1CurrentScore.textContent = player1CurrentScore;
      player1.classList.remove('player--active');
      player2.classList.add('player--active');

      // same as the logic above but for player 2
    } else {
      p2Score += player2CurrentScore;
      player2Score.textContent = p2Score;
      player2CurrentScore = 0;
      p2CurrentScore.textContent = player2CurrentScore;
      player2.classList.remove('player--active');
      player1.classList.add('player--active');
    }

    // winning conditions will add to the player with the score equal to or greater than, adds 'player--winner' class and removes 'player--active' class
    if (p1Score >= 75) {
      player1.classList.add('player--winner');
      player2.classList.remove('player--active');
    } else if (p2Score >= 75) {
      player2.classList.add('player--winner');
      player1.classList.remove('player--active');
    }
  });
};

// new game function resets all values and classes to default, player 1 is the active player
const newGame = () => {
  btnNewGame.addEventListener('click', () => {
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
    player1.classList.remove('player--winner');
    player2.classList.remove('player--winner');
    player1CurrentScore = 0;
    player2CurrentScore = 0;
    p1Score = 0;
    p2Score = 0;
    p1CurrentScore.textContent = player1CurrentScore;
    p2CurrentScore.textContent = player2CurrentScore;
    player1Score.textContent = player1CurrentScore;
    player2Score.textContent = player2CurrentScore;
  });
};

game();
hold();
newGame();
