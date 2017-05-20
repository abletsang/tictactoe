var play = document.querySelector(".play");
var playerChoose = document.querySelector("h3");
var chooseO = document.querySelector(".chooseO");
var chooseX = document.querySelector(".chooseX");
var board = document.querySelector("table");
var squares = document.getElementsByTagName("td"); 
var player;
var compPlayer;
var startingTurn = document.querySelector(".turn");
var turn = true;
var playerMoves = [];
var compMoves = [];
var availableMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var winningCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

// ask to play?
play.addEventListener("click", function() {
	play.style.display = "none";
	playerChoose.style.display = "block";
});

// ask X or O
chooseO.addEventListener("click", function() {
	playerChoose.style.display = "none";
	board.style.display = "block";
	document.querySelector("h4").style.display = "block";
	player = "o";
	compPlayer = "x";
	whosTurn();
});

chooseX.addEventListener("click", function() {
	playerChoose.style.display = "none";
	board.style.display = "block";
	player = "x";
	compPlayer = "o";
	whosTurn();
});

// alternate starting or not starting
function whosTurn() {
	if (turn === true) {
		startingTurn.textContent = "You start!";
		setTimeout(function() {
			startingTurn.style.display = "none";
		}, 1000);
	} else {
		startingTurn.textContent = "Computer goes first";
		setTimeout(function() {
			startingTurn.style.display = "none";
		}, 1000);
	}
}


// check for winner


// after 9 moves. draw

// reset game




// players turn
for (var i = 0; i < squares.length; i++) {
	squares[i].addEventListener("click", function() {
		if (turn === true) {
			if (availableMoves[this.id] != -1) {
				this.textContent = player;
				turn = false;
				availableMoves[this.id] = -1;
				playerMoves.push(this.id);
				computerPlay();
			}
			
		}
	});
}

// computers turn
function computerPlay() {
	var temp = Math.floor(Math.random() * 8);
	if (availableMoves[temp] != -1) {
		console.log(temp);
		squares[temp].textContent = compPlayer;
		turn = true;
		return;
	} else {
		computerPlay();
	}
}

// reset board
function reset() {
	availableMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	for (var i = 0; i < squares.length; i++) {
		squares[i].textContent = "";
	}
	playerMoves = [];
	compMoves = [];
}
