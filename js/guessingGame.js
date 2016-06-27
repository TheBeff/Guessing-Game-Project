/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
    winningNumber = generateWinningNumber(),
	guessArray = [],
	numGuesses = 0,
	hintArray = [randomNum(), randomNum(), randomNum(), randomNum(), randomNum(), randomNum(), randomNum(), winningNumber];


/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return Math.floor(Math.random() * 100) + 1;
}

// Fetch the Players Guess

function playersGuessSubmission(){
	playersGuess = parseInt(document.getElementById("number").value);
	document.getElementById("number").value = "";
	checkGuess();
	
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	if(playersGuess > winningNumber){
	  return "Aim lower!";
	} else if(playersGuess < winningNumber){
	  return "Aim higher!";
	}; 
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	if ( isNaN(playersGuess) || playersGuess > 100 || playersGuess < 1) {
		$("label").html("<h2>Please input a number between 1 and 100</h2>");
	} else if (playersGuess === winningNumber){
		$("label").html("<h2>You won!</h2>");
	  } else if(guessArray.includes(playersGuess) === true){ 
			  $("label").html("<h2>You already guessed that, fool. Try again.</h2>");
			} else if (numGuesses === 4){
				$("label").html("<h2>You lost!</h2>");
				$('[type="submit"]').hide();
				$('[name="Button2"]').hide();
				$("img").toggle("puff");
				} else {
					$("label").html("<h2>Try again!</h2>");
					numGuesses++;
					guessArray.push(playersGuess);
					alert(guessMessage());
			  	  };
}

// Returns a string to guide the player once checkGuess is run

function guessMessage(){
	var distance = function(){
		if (Math.abs(winningNumber - playersGuess) <= 5){
			return " You're close! Your guess is within 5 digits."
		} else if (Math.abs(winningNumber - playersGuess) <= 10){
			return " You're SUPER close! Your guess is within 5 digits."
		} else return "...But you're not even close."
	}
	return lowerOrHigher() + distance();
}

// Create a provide hint button that provides additional clues to the "Player"

function randomNum(){
	return Math.floor(Math.random() * 100) + 1
};

Array.prototype.shuffle = function() {
    var input = this;
     
    for (var i = input.length-1; i >=0; i--) {
     
        var randomIndex = Math.floor(Math.random()*(i+1)); 
        var itemAtIndex = input[randomIndex]; 
         
        input[randomIndex] = input[i]; 
        input[i] = itemAtIndex;
    }
    return input;
}

function provideHint(){
	switch(guessArray.length) {
		case 0: 
			return "You don't need a hint yet, silly";
		case 1:
			return "You've used 1/5 guesses. One of these is the winning number: " + hintArray.shuffle().join(", ");
		case 2: 
			hintArray = hintArray.slice(2);
			return "You've used 2/5 guesses. One of these is the winning number: " + hintArray.shuffle().join(", ");
		case 3:
			hintArray = hintArray.slice(4);
			return "You've used 3/5 guesses. One of these is the winning number: " + hintArray.shuffle().join(", ");
		case 4:
			hintArray = hintArray.slice(6);
			return "You've used 4/5 guesses. One of these is the winning number: " + hintArray.shuffle().join(", ");
		case 5:
			return "Game Over!";
	};
}

// Allow the "Player" to Play Again

function playAgain(){
	winningNumber = generateWinningNumber();
	guessArray = [];
	numGuesses = 0;
	hintArray = [randomNum(), randomNum(), randomNum(), randomNum(), randomNum(), randomNum(), randomNum(), winningNumber];
	$(".buttons p").remove();
	$("label").html("<h2>Guess the number:</h2>");
	$('[name="Button2"]').show();
	$('[type="submit"]').show();
}


/* **** Event Listeners/Handlers ****  */
$('[name="Button2"').on("click", function(){
	$(".buttons p").remove();
	$(".buttons").append('<p>' + provideHint() + '</p>');
});

$('[name="Button1"').on("click", function(){
	playAgain();
});

$('[type="text"').keydown(function (e){
	if (e.which == 13) {
      $('[type="submit"').trigger('click');
    }
});
