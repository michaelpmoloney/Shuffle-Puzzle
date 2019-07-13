
//Global variables. Editable.
var Xspace = 300;
var Yspace = 300;
var pieces = [];

//Load Page
window.onload = function() {
  createpieces();
  $("shufflebutton").observe("click", shuffle);
};

//The board function. Separate Divs act as a table
function createpieces() {
	pieces = $$('#game div');
	var j = 0;
	var t = 3;
	for (var i = 0; i < pieces.length; i++) {
		for (var x = 0; x <= t; x++) {
			pieces[i].addClassName("puzzlepiece");
			pieces[i].style.top = 100 * j + "px";
			pieces[i].style.left = 100 * x  + "px";
			pieces[i].style.backgroundPosition = -x * 100 + "px " + j * -100 + "px";
			pieces[i].observe("click", moveTile);
			pieces[i].observe("mouseover", hover);
			i++;
		}
		j++;
		if (j > 2) {
			t = 2;
		}
		i--;
	}
}	

//Hover event. Calls Neighbortest Method.
function hover(event) {
	if (neighborTest(this.style.left, this.style.top)) {
		this.addClassName("movablepiece");
	} else if (this.hasClassName("movablepiece")) {
		this.removeClassName("movablepiece");
	}
}

//Getter Algorithm.
function moveTileHelp(tile) {
	if (neighborTest(tile.style.left, tile.style.top)) {
		var newX = tile.style.left;
		var newY = tile.style.top;
		tile.style.left = Xspace + "px";
		tile.style.top = Yspace + "px";
		Xspace = parseInt(newX);
		Yspace = parseInt(newY);
	}
}

//Setter. O(N)
function moveTile(event) {
	moveTileHelp(this);
}

//Random tile mover based on Neighbortest and movetile method
function shuffle() {
	var reg = [];
	for (var i = 0; i < 200; i++) {
		for (var j = 0; j < pieces.length; j++) {
			if (neighborTest(pieces[j].style.left, pieces[j].style.top)) {
				reg.push(pieces[j]);
			}
		}
		moveTileHelp(reg[Math.floor(Math.random() * reg.length)]);
		reg = [];
	}
}



//Check is neighbor is present and tile can be moved.
function neighborTest(x, y) {
	if (Math.abs(Yspace - parseInt(y)) == 100) {
		if (Math.abs(Xspace - parseInt(x)) == 0) {
			return true;
		}
	} else if (Math.abs(Xspace - parseInt(x)) == 100) {
		if (Math.abs(Yspace - parseInt(y)) == 0) {
			return true;
		}
	}
	return false;
}


