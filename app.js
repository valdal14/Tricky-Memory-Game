"use strict";

let counter = 0;
let count = 1;
let firstItem = "";
let firstItemValue = "";
let secondItemValue = "";
let secondItem = "";
let num = null;
let index = null;
let array = [0, 1, 1, 2, 2, 3, 3, 4, 4];
let guessesArray = [];
let score = 0;
let attempt = 0;
let timer = 0;
let gameOver = document.getElementById("gameOver");

/**
 * Create the array with value and start the game
 */
window.onload = function() {
  generateArray();
};

setInterval(function() {
  timer += 1;
}, 1000);

/**
 * Place values from the array inside the box
 */
function setupGame() {
  for (let i = 0; i < guessesArray.length; i++) {
    document.getElementById(`row${i + 1}`).childNodes[0].innerText =
      guessesArray[i];
  }
}

/**
 * Generate an array with hidden value
 */
function generateArray() {
  var guessCounter = 0;

  while (guessesArray.length !== 9) {
    num = Math.floor(Math.random() * (5 - 0)) + 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i] === num) {
        index = array.indexOf(num);
        if (index > -1) {
          array.splice(index, 1);
        }
        guessesArray[guessCounter] = num;
        guessCounter += 1;
      }
    }
  }
  // setup game
  setupGame();
}

/**
 * Setup boxes in UI and handle user interaction
 * @param {*} elementId
 */
function selectedRow(elementId) {
  counter += 1;
  document
    .getElementById(elementId)
    .classList.add("clicked", "animated", "flipInX");

  // show the text when a box is clicked
  document.getElementById(elementId).childNodes[0].style.visibility = "visible";

  if (counter === 1) {
    firstItemValue = document.getElementById(elementId).childNodes[0]
      .textContent;
    firstItem = document.getElementById(elementId);
    // check if the user clicked on the 0 value box
    loseGame(firstItemValue);
  }

  if (counter === 2) {
    // prevent user to click more than twice before the check
    document.getElementById("body").style.pointerEvents = "none";

    secondItemValue = document.getElementById(elementId).childNodes[0]
      .textContent;
    secondItem = document.getElementById(elementId);
    // check if the user clicked on the 0 value box
    loseGame(secondItemValue);

    if (doTheyMatch(firstItemValue, secondItemValue)) {
      // remove previous classes
      secondItem.classList.remove("clicked", "animated", "flipInX");
      firstItem.classList.remove("clicked", "animated", "flipInX");
      // add new classes
      setTimeout(() => {
        // reset the counter
        counter = 0;
        // enable the click event again
        document.getElementById("body").style.pointerEvents = "auto";

        secondItem.classList.add("animated", "rubberBand", "guessed");
        firstItem.classList.add("animated", "rubberBand", "guessed");
      }, 100);

      // increment player attempts
      attempt += 1;
      // increment the score
      score += 1;
      // check if the player won the game
      gameResults(score);
    } else {
      // remove previous classes
      secondItem.classList.remove("clicked", "animated", "flipInX");
      firstItem.classList.remove("clicked", "animated", "flipInX");

      // add new classes
      setTimeout(() => {
        secondItem.classList.add("animated", "shake", "selected");
        firstItem.classList.add("animated", "shake", "selected");
      }, 100);

      // restore default
      setTimeout(() => {
        secondItem.classList.remove("animated", "shake", "selected");
        firstItem.classList.remove("animated", "shake", "selected");
        // hide the value if the player missed it
        secondItem.childNodes[0].style.visibility = "hidden";
        firstItem.childNodes[0].style.visibility = "hidden";
        // reset the counter
        counter = 0;
        // enable the click event again
        document.getElementById("body").style.pointerEvents = "auto";
      }, 1500);

      // increment player attempts
      attempt += 1;
    }
  }
}

/**
 * If the value is == "0" the player lose the game automatically
 * @param {*} value
 */
function loseGame(value) {
  if (value === "0") {
    document
      .getElementById("gameContainer")
      .classList.add("animated", "bounceOut");

    setTimeout(() => {
      document.getElementById("titleGame").style.visibility = "hidden";
      gameOver.style.visibility = "visible";
      gameOver.classList.add("animated", "bounceIn");
    }, 1000);
  }
}

/**
 * Check if the values match
 * @param {*} valueOne
 * @param {*} valueTwo
 */
function doTheyMatch(valueOne, valueTwo) {
  return valueOne === valueTwo;
}

/**
 * Get a score and check if the player won
 * @param {*} playerScore
 */
function gameResults(playerScore) {
  if (playerScore === 4) {
    document.getElementById("gameFinalResults").style.visibility = "visible";
    document.getElementById("numberOfAttempts").textContent = attempt;
    document.getElementById("timing").textContent = timer + "s";
  }
}

/**
 * Reset the Game
 */
document.getElementById("restartBtn").addEventListener("click", () => {
  location.reload();
});
