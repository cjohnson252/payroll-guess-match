var beep = new Audio('beep.mp3');
var cheer = new Audio('cheer.mp3');
var boo = new Audio('boo.mp3');

var interval = setInterval(time, 1000);
var count = 0;

function time() {
	count++;
	document.getElementById('timer').innerHTML = count+" seconds!";
	beep.play();
}

var remainingGuesses = 10;
var num = Math.floor(Math.random()*(100)+1);

function checkGuess() {
	document.getElementById('again').style.display = 'none';
	
	var form = document.getElementById("input");
	var guess = form.guess.value;
	var report = "";
	
	if (guess.length == 0) {
		alert("Please enter a value.");
	} else if (isNaN(guess)) { 
		alert("Please enter an integer value.")
	} else {
		remainingGuesses--;
		if (remainingGuesses > 0) {
			if (guess < num) {
				report = "Too low, guess again!";
			} else if (guess > num) {
				report = "Too high, guess again!";
			} else {
				report = "You won! The number was "+num+".";
				document.getElementById('again').style.display = 'block';
				clearInterval(interval);
				document.getElementById('winner').style.display = 'block';
				cheer.play();
			}	
		} else {
			report = "You lost. The number was "+num+".";
			document.getElementById('again').style.display = 'block';
			clearInterval(interval);
			document.getElementById('loser').style.display = 'block';
			boo.play();
		}	
		document.getElementById('remainingGuesses').innerHTML = "Remaining Guesses: "+remainingGuesses;
		document.getElementById('report').innerHTML = report;
	}
}

function reset() {
	document.getElementById('remainingGuesses').innerHTML = "";
	document.getElementById('report').innerHTML = "";
	document.getElementById('again').style.display = 'none';
	document.getElementById('winner').style.display = 'none';
	document.getElementById('loser').style.display = 'none';
	
	remainingGuesses = 10;
	num = Math.floor(Math.random()*(100)+1);
}