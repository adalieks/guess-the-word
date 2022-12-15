const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const hiddenButton = document.querySelector(".play-again");

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
}

getWord();

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordProgress.innerText = placeholderLetters.join("");
};

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
        countGuesses(guess);
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

  const countGuesses = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Hmm...looks like there isn't a ${guess}, try again.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Nice guess! There is a ${guess} in the word.`
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
  };