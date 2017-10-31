var canClick = false;
var interval2;

var eights = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
var tens = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
var twelves = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12];

eights.sort(function(a, b){return 0.5 - Math.random()});
tens.sort(function(a, b){return 0.5 - Math.random()});
twelves.sort(function(a, b){return 0.5 - Math.random()});

function play() {
	var form = document.getElementById("input");
	var tiles = form.tiles.value;
	var difficulty = form.difficulty.value;
	
	if (tiles == "" || difficulty == "") {
		alert("Please select the number of tiles and difficulty.");
		return false;
	}
	
	document.getElementById('input').style.display = 'none';
	document.getElementById('timer').style.display = 'block';
	
	var showTime = 0;
	if (difficulty == 1) {
		showTime = 8;
	}
	if (difficulty == 2) {
		showTime = 5;
	}
	if (difficulty == 3) {
		showTime = 3;
	}
	
	var guessTime = 0;
	if (tiles == 8) {
		
		for(i=0; i<eights.length; i++) {
			var id = "t8"+(i+1);
			var img = "<img src=\"p"+eights[i]+".jpg\"/>";
			document.getElementById(id).innerHTML = img;
		}
		
		document.getElementById('t8_show').style.display = 'block';
		guessTime = 120;
	} 
	if (tiles == 10) {
		
		for(i=0; i<tens.length; i++) {
			var id = "t10"+(i+1);
			var img = "<img src=\"p"+tens[i]+".jpg\"/>";
			document.getElementById(id).innerHTML = img;
		}
		
		document.getElementById('t10_show').style.display = 'block';
		guessTime = 150;
	}
	if (tiles == 12) {
		
		for(i=0; i<twelves.length; i++) {
			var id = "t12"+(i+1);
			var img = "<img src=\"p"+twelves[i]+".jpg\"/>";
			document.getElementById(id).innerHTML = img;
		}
		
		document.getElementById('t12_show').style.display = 'block';
		guessTime = 180;
	} 
	
	var count2 = 0;

	
	function time2() {
		
		var timeRemaining = guessTime - count2;
		document.getElementById('timer').innerHTML = "Time Remaining: "+timeRemaining+" seconds";
		
		count2++;
		if (count2 > guessTime) {
			if (tiles == 8) {
				document.getElementById('t8_show').style.display = 'none';
			} 
			if (tiles == 10) {
				document.getElementById('t10_show').style.display = 'none';
			}
			if (tiles == 12) {
				document.getElementById('t12_show').style.display = 'none';
			}
			document.getElementById('loss').style.display = 'block';
			document.getElementById('again').style.display = 'block';
			document.getElementById('timer').style.display = 'none';
			document.getElementById('t8_show').style.display = 'none';
			document.getElementById('t10_show').style.display = 'none';
			document.getElementById('t12_show').style.display = 'none';
			clearInterval(interval2);
			canClick = false;
		}
	}
	
	function time1() {
		
		var timeRemaining = showTime - count1;
		document.getElementById('timer').innerHTML = "Time Remaining: "+timeRemaining+" seconds";
		
		count1++;
		if(count1 > showTime) {
			if (tiles == 8) {
				for(i=0; i<eights.length; i++) {
					var id = "t8"+(i+1);
					var img = "<img src=\"bone.png\"/>";
					document.getElementById(id).innerHTML = img;
				}
			} 
			if (tiles == 10) {
				for(i=0; i<tens.length; i++) {
					var id = "t10"+(i+1);
					var img = "<img src=\"bone.png\"/>";
					document.getElementById(id).innerHTML = img;
				}
			}
			if (tiles == 12) {
				for(i=0; i<twelves.length; i++) {
					var id = "t12"+(i+1);
					var img = "<img src=\"bone.png\"/>";
					document.getElementById(id).innerHTML = img;
				}
			}
			clearInterval(interval1);
			interval2 = setInterval(time2, 1000);
			canClick = true;
		}
	}
	
	var count1 = 0;
	var interval1 = setInterval(time1, 1000);
	
}

var imgs = [];
var ids = [];
var count = 0;
var numMatches = 0;

function check(numTiles, a) {
	if (canClick) {
		
		var id = "t"+numTiles+a;
		var img = "";
		
		if (numTiles == 8) img = "<img src=\"p"+eights[a-1]+".jpg\"/>";
		if (numTiles == 10) img = "<img src=\"p"+tens[a-1]+".jpg\"/>";
		if (numTiles == 12) img = "<img src=\"p"+twelves[a-1]+".jpg\"/>";
		
		imgs[count] = img;
		ids[count] = id;
		count++;
	
		document.getElementById(id).innerHTML = img;
		
		if (count == 2) {
			if(imgs[0] == imgs[1] && ids[0] != ids[1]) {
				numMatches++;
			} else {
				document.getElementById(ids[1]).innerHTML = "<img src=\"bone.png\"/>";
				document.getElementById(ids[0]).innerHTML = "<img src=\"bone.png\"/>";
			}
			
			imgs = [];
			ids = [];
			count = 0;
		}
		
		if (numMatches == numTiles) {
			document.getElementById('win').style.display = 'block';
			document.getElementById('again').style.display = 'block';
			document.getElementById('timer').style.display = 'none';
			document.getElementById('t8_show').style.display = 'none';
			document.getElementById('t10_show').style.display = 'none';
			document.getElementById('t12_show').style.display = 'none';
			clearInterval(interval2);
			canClick = false;
		}
	}
}

function reset() {
	document.getElementById('t8_show').style.display = 'none';
	document.getElementById('t10_show').style.display = 'none';
	document.getElementById('t12_show').style.display = 'none';
	document.getElementById('input').style.display = 'block';
	document.getElementById('win').style.display = 'none';
	document.getElementById('loss').style.display = 'none';
	document.getElementById('timer').style.display = 'none';
	
	eights.sort(function(a, b){return 0.5 - Math.random()});
	tens.sort(function(a, b){return 0.5 - Math.random()});
	twelves.sort(function(a, b){return 0.5 - Math.random()});
}