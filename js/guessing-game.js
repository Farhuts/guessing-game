/*

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

// */

function generateWinningNumber(){
  if(Math.round(Math.random() * 100) ===0){
    return 1;
  }
   return Math.round(Math.random() * 100);
}

function shuffle(arr){
  var i = arr.length, j, temp;
  while(--i > 0){
    j = Math.floor(Math.random() * (i+1));

    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

class Game {
  constructor(){
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber()
  }
  difference(){
    return Math.abs(this.playersGuess - this.winningNumber);
  }
  isLower(){
    if(this.playersGuess < this.winningNumber){
      return true;
    }else{
      return false;
    }
  }
  playersGuessSubmission(num){
    if(num < 1 || num > 100 || isNaN(num)){
      return 'That is an invalid guess.';
    }
    this.playersGuess = num;
    return this.checkGuess(num)
    }
    checkGuess(){
      let result = '';
      if(this.playersGuess === this.winningNumber){
        return 'You Win!';
      }if(this.pastGuesses.includes(this.playersGuess)){
         result = 'You have already guessed that number.'
      }else{
        this.pastGuesses.push(this.playersGuess);
        let diff = this.difference();

      if(this.pastGuesses.length >=5){
         result = "You Lose.";
      }else if(diff < 100){
         // this.pastGuesses.push(this.playersGuess);
         result = "You're ice cold!";

         if(diff < 50)result = "You're a bit chilly.";
         if(diff < 25) result =  "You're lukewarm.";
         if(diff < 10) result =  "You're burning up!";
      }
     }
     return result;
   }
     provideHint(){
       let arr = [this.winningNumber];
       arr.push(generateWinningNumber(), generateWinningNumber(), generateWinningNumber());
       return shuffle(arr);
     }
   }

function newGame(){
  return new Game();
}

// eventlisteners
const submitButton = document.getElementById('submitGuess');
const resetButton = document.getElementById('Reset');
const hintButton = document.getElementById('Hint');
const message = document.getElementById('message')
const userInput= document.getElementById('input');
const pastGuess = document.getElementsByClassName("output-num");
// display previous guesses
//
function play(){
  var game = newGame();
  var getHint = game.provideHint();

  submitButton.addEventListener('click', function(){
    var text = userInput.value;
    userInput.value = '';
    message.innerHTML = game.playersGuessSubmission(Number(text));
    for(let i = 0; i < pastGuess.length, i< game.pastGuesses.length; i++){
      pastGuess[i].value = game.pastGuesses[i];
    }
  })

  document.getElementById('input').addEventListener('keypress', function(e){
    var key = e.which || e.keyCode;
    if(key === 13){
      var text = userInput.value;
      userInput.value = '';
      message.innerHTML = game.playersGuessSubmission(Number(text));
      for(let i = 0; i < pastGuess.length, i< game.pastGuesses.length; i++){
        pastGuess[i].value = game.pastGuesses[i];
      }
    }
  })

  hintButton.addEventListener('click', function(){
    message.innerHTML = `The winning number is either "${game.provideHint()}"`;
  })

  resetButton.addEventListener('click', function(){
    console.log(game = newGame())
    console.log(message.innerHTML = `The winning number is either "${game.provideHint()}"`);
    message.innerHTML = `Guess a number between 1-100!`;
    for(let i = 0; i < pastGuess.length; i++){
      pastGuess[i].value = '';
    }
  })
}
play()
