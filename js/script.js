const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const hiddenButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    const guessAttempt = validateInput(guess);
    
    if (guessAttempt) {
        makeGuess(guess)
    }
    letterInput.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter."
    } else if (input.length > 1) {
        message.innerText = "Uh oh. Did you enter more than one letter?"
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A-Z."
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "Oops, You've already guessed that letter. Try again."
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        updateLettersGuessed();
        updateWordInProgress(guessedLetters);
    }
};

const updateLettersGuessed = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealCharacters = [];

    for (const letter of wordArray) {
      if (guessedLetters.includes(letter)) {
        revealCharacters.push(letter.toUpperCase());
      } else {
        revealCharacters.push("●");
      }
    }

    //console.log(revealCharacters);
    wordProgress.innerText = revealCharacters.join("");
    winCheck();
  };
  
  const winCheck = function () {
    if (word.toUpperCase() === wordProgress.innerText) {
        message.classList.add("wid");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`
    }
  };
