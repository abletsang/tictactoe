var play = document.querySelector(".play");
var playerChoose = document.querySelector("h3");
var chooseO = document.querySelector(".chooseO");
var chooseX = document.querySelector(".chooseX");
var board = document.querySelector("table");
var squares = document.getElementsByTagName("td"); 
var player;
var compPlayer;
var turn = true;

// ask to play?

// ask X or O

// alternate starting or not starting

// after 9 moves. win, lose or draw

// reset game

play.addEventListener("click", function() {
	play.style.display = "none";
	playerChoose.style.display = "block";
});

chooseO.addEventListener("click", function() {
	playerChoose.style.display = "none";
	board.style.display = "block";
	player = "o";
	compPlayer = "x";
});

chooseX.addEventListener("click", function() {
	playerChoose.style.display = "none";
	board.style.display = "block";
	player = "x";
	compPlayer = "o";
});

for (var i = 0; i < squares.length; i++) {
	squares[i].addEventListener("click", function() {
		if (turn === true) {
			if (availableMoves[this.id] != -1) {
				this.classList.add(player);
				turn = false;
				availableMoves[this.id] = -1;
				computerPlay();
			}
			
		}
	});
}

function computerPlay() {
	var temp = Math.floor(Math.random() * 8);
	if (availableMoves[temp] != -1) {
		console.log(temp);
		squares[temp].classList.add(compPlayer);
		turn = true;
		return;
	} else {
		computerPlay();
	}
}

function reset() {
	availableMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	for (var i = 0; i < squares.length; i++) {
		squares[i].classList.remove("o");
		squares[i].classList.remove("x");
	}
}
var availableMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];