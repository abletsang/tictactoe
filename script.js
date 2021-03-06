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
var playerScoreDisplay = document.querySelector(".playerScore");
var compScoreDisplay = document.querySelector(".compScore");
var playerScore = 0;
var compScore = 0;
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
	player = "o";
	compPlayer = "x";
	showBoard();
});

chooseX.addEventListener("click", function() {
	player = "x";
	compPlayer = "o";
	showBoard();
});

function showBoard() {
	playerChoose.style.display = "none";
	board.style.display = "block";
	document.querySelector("h4").style.display = "block";
	whosTurn();
}

// alternate starting or not starting
function whosTurn() {
	if (turn === true) {
		startingTurn.style.display = "block";
		startingTurn.textContent = "You start!";
		clearStartingTurn();
	} else {
		startingTurn.style.display = "block";
		startingTurn.textContent = "Computer goes first!";
		clearStartingTurn();
	}
}

function clearStartingTurn() {
	setTimeout(function() {
		startingTurn.style.display = "none";
	}, 1000);
}


// players turn
for (var i = 0; i < squares.length; i++) {
	squares[i].addEventListener("click", function() {
		if (turn === true) {
			if (availableMoves.indexOf(Number(this.id)) != -1) {
				this.textContent = player;
				turn = false;
				var index = availableMoves.indexOf(Number(this.id));
				availableMoves.splice(index, 1);
				playerMoves.push(Number(this.id));
				var result = winner(playerMoves);
				if (result === false) {
					computerPlay();
				}
			}
		}
	});
}

// computers turn
function computerPlay() {
	var index = null;
	// if find that they are about to win
	if (almostWin() !== false) {
		temp = almostWin();
		index = availableMoves.indexOf(temp);
			} else {
		index = Math.floor(Math.random() * availableMoves.length);
	}
	for (var i = 0; i < squares.length; i++) {
		if (Number(squares[i].id) === availableMoves[index]) {
			squares[i].textContent = compPlayer;
			turn = true;
			compMoves.push(availableMoves[index]);
			availableMoves.splice(index, 1);
			winner(compMoves);
			return;
		}
	}
}

function almostWin() {
	// iterating over the winning combos
	for (var i = 0; i < 8; i++) {
		var temp = winningCombos[i];
		var hasArr = [];
		var missingArr;
		temp.forEach(function (num) {
			if (playerMoves.indexOf(num) !== -1) {
				hasArr.push(num);
			} else {
				missingArr = num;
			}
		});
		if (hasArr.length === 2 && compMoves.indexOf(missingArr) == -1) {
			return missingArr;
		}
	}
	return false;
}

// check for winner
function winner(arr) {
	for (var i = 0; i < 8; i++) {
		if (arr.indexOf(winningCombos[i][0]) != -1 &&
			arr.indexOf(winningCombos[i][1]) != -1 &&
			arr.indexOf(winningCombos[i][2]) != -1) {
			if (arr === playerMoves) {
				document.querySelector("body").style.background = "pink";
				board.style.display = "none";
				document.querySelector(".status").textContent = "YOU WON!";
				setTimeout(function() {
					reset();
					playerScore++;
					playerScoreDisplay.textContent = playerScore;
				}, 1000);
			return true;
			} else {
				document.querySelector("body").style.background = "black";
				board.style.display = "none";
				document.querySelector(".status").style.color = "white";
				document.querySelector(".status").textContent = "You lost...";
				setTimeout(function() {
					reset();
					compScore++;
					compScoreDisplay.textContent = compScore;
				}, 1000);
				return true;
			}
		}
	}
	// if draw
	if (availableMoves.length == 0) {
		board.style.display = "none";
		document.querySelector(".status").textContent = "It was a draw!";
		setTimeout(function() {
		reset();
	}, 1000);
	return true;
}
return false;
}

// reset game function
function reset() {
	availableMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	document.querySelector("body").style.background = "white";
	board.style.display = "block";
	document.querySelector(".status").textContent = "";
	for (var i = 0; i < squares.length; i++) {
		squares[i].textContent = "";
	}
	playerMoves = [];
	compMoves = [];
	if (turn === false) {
		whosTurn();
		computerPlay();
		return;
	}
	whosTurn();
}
