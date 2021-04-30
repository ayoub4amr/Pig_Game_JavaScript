'use strict';

// select elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const switchPlayer = function () {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const insertCurrent = function () {
  player0El.classList.contains('player--active')
    ? (current0El.textContent = current)
    : (current1El.textContent = current);
};

const checkScore = function (score, player) {
  if (score >= 100) {
    player.classList.add('player--winner');
    player.classList.remove('player--active');
    playing = false;
  } else {
    switchPlayer();
  }
};

// initialize elements
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let current = 0;
let score0 = 0;
let score1 = 0;
let playing = true;

btnRoll.onclick = function () {
  if (playing) {
    const number = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${number}.png`;
    if (number !== 1) {
      current += number;
      insertCurrent();
    } else {
      current = 0;
      insertCurrent();
      switchPlayer();
    }
  }
};

btnHold.addEventListener('click', function () {
  if (playing) {
    current = 0;
    if (player0El.classList.contains('player--active')) {
      score0 += Number(current0El.textContent);
      score0El.textContent = score0;
      current0El.textContent = 0;
      checkScore(score0, player0El);
    } else {
      score1 += Number(current1El.textContent);
      score1El.textContent = score1;
      current1El.textContent = 0;
      checkScore(score1, player1El);
    }
  }
});

btnNew.onclick = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  current = 0;
  score0 = 0;
  score1 = 0;
  playing = true;
  player0El.classList.contains('player--winner')
    ? player0El.classList.remove('player--winner')
    : player1El.classList.remove('player--winner');

  player1El.classList.contains('player--active')
    ? player1El.classList.remove('player--active')
    : player0El.classList.remove('player--active');

  player0El.classList.add('player--active');
};
