
//Global variables. Editable.
var $x = jQuery.noConflict();
var Xspace = 300;
var Yspace = 300;
var pieces = [];

//Load Page
window.onload = function() {
  createpieces();
  $("shufflebutton").observe("click", shuffle);

//change background image
$x('#image_1').click(function(){
        // If radiobuton is checked
  if ($x(this).is(':checked'))
  {
    // Change background image
    $x('.puzzlepiece').css("background-image", "url(http://codd.cs.gsu.edu/~mmoloney1/projects/project3/image1.jpg)");
  }
  });
$x('#image_2').click(function(){
        // If radiobuton is checked
  if ($x(this).is(':checked'))
  {
    // Change background image
    $x('.puzzlepiece').css("background-image", "url(http://codd.cs.gsu.edu/~mmoloney1/projects/project3/image2.jpg)");
  }
  });
$x('#image_3').click(function(){
        // If radiobuton is checked
  if ($x(this).is(':checked'))
  {
    // Change background image
    $x('.puzzlepiece').css("background-image", "url(http://codd.cs.gsu.edu/~mmoloney1/projects/project3/image3.jpg)");
  }
  });
$x('#image_4').click(function(){
        // If radiobuton is checked
  if ($x(this).is(':checked'))
  {
    // Change background image
    $x('.puzzlepiece').css("background-image", "url(http://codd.cs.gsu.edu/~mmoloney1/projects/project3/image4.jpg)");
  }
  });

//creates the hover css for valid squares
$x('#game > div').hover(
    function() {
    	if(xPlaneTest($(this).style.left, $(this).style.top)){
    		let xShifts=(Xspace-parseInt($(this).style.left))/100;
    		let ycoord= parseInt($(this).style.top);
    		let xcoord= parseInt($(this).style.left);
    		if(xShifts>0){
    			for(xShifts>0;xShifts--;){
    				let x=xcoord+(xShifts*100);
    				$x($(x+'_'+ycoord)).addClass('active');
    			}
    		}
    		if(xShifts<0){
    			xShifts=(Math.abs(xShifts));
    			for(xShifts>0;xShifts--;){
    				let x=xcoord-(xShifts*100);
    				$x($(x+'_'+ycoord)).addClass('active'); 
    			}   		
    		}
    	}
    	if(yPlaneTest($(this).style.left, $(this).style.top)){
    		let yShifts=(Yspace-parseInt($(this).style.top))/100;
    		let ycoord= parseInt($(this).style.top);
    		let xcoord= parseInt($(this).style.left);
    		if(yShifts>0){
    			for(yShifts>0;yShifts--;){
    				let y=ycoord+(yShifts*100);
    				$x($(xcoord+'_'+y)).addClass('active');
    			}
    		}
    		if(yShifts<0){
    			yShifts=(Math.abs(yShifts));
    			for(yShifts>0;yShifts--;){
    				let y=ycoord-(yShifts*100);
    				$x($(xcoord+'_'+y)).addClass('active');   
    			} 		
    		}
		}
    },
    function() {
        $x('#game > div').removeClass('active');
    }
);
};

//The board function. Separate Divs act as a table
function createpieces() {
	pieces = $$('#game > div');
	var j = 0;
	var t = 3;
	for (var i = 0; i < pieces.length;) {
		for (var x = 0; x <= t; x++) {
			pieces[i].addClassName("puzzlepiece");
			pieces[i].style.top = 100 * j + "px";
			pieces[i].style.left = 100 * x  + "px";
			pieces[i].style.backgroundPosition = -x * 100 + "px " + j * -100 + "px";
			pieces[i].observe("click", moveTile);
			i++;
		}
		j++;
		if (j > 2) {
			t = 2;
		}
	}
}	

//Setter. O(N)
function moveTile(event) {
	Test(this);
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



//Check if neighbor is present and tile can be moved.
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

//check if blank square is on x-coordinate
function xPlaneTest(x,y){
	if(Yspace == parseInt(y)){
		return true;
	}
}

//check if blank square is on y-coordinate
function yPlaneTest(x,y){
	if(Xspace == parseInt(x)){
		return true;
	}
}





//Getter Algorithm.
function moveTileHelp(tile) {
	if (neighborTest(tile.style.left, tile.style.top)) {
		var newX = tile.style.left;
		var newY = tile.style.top;
		tile.style.left = Xspace + "px";
		tile.style.top = Yspace + "px";
		console.log($x(tile).attr('id'));
		$x(tile).attr('id', Xspace+'_'+Yspace);
		console.log($x(tile).attr('id'));
		Xspace = parseInt(newX);
		Yspace = parseInt(newY);
	}
}

//Getter Algorithm.
function moveTileHelp2(tile) {
		var newX = $(tile).style.left;
		var newY = $(tile).style.top;
		$(tile).style.left = Xspace + "px";
		$(tile).style.top = Yspace + "px";
		$x('#'+tile).attr('id', Xspace+'_'+Yspace);
		Xspace = parseInt(newX);
		Yspace = parseInt(newY);
}
//move mutlipe blocks at once function
function Test(tile){
    	if(xPlaneTest(tile.style.left, tile.style.top)){
    		let xShifts=(Xspace-parseInt(tile.style.left))/100;
    		let ycoord= parseInt(tile.style.top);
    		let xcoord= parseInt(tile.style.left);
    		if(xShifts>0){
    			for(xShifts>0;xShifts--;){
    				let x=xcoord+(xShifts*100);
    				moveTileHelp2(x+'_'+ycoord);
    			}
    			xShifts++;
    		}
    		if(xShifts<0){
    			xShifts=(Math.abs(xShifts));
    			for(xShifts>0;xShifts--;){
    				let x=xcoord-(xShifts*100);
    				moveTileHelp2(x+'_'+ycoord);
    			}   
    			xShifts++;		
    		}
    	}
    	if(yPlaneTest(tile.style.left, tile.style.top)){
    		let yShifts=(Yspace-parseInt(tile.style.top))/100;
    		let ycoord= parseInt(tile.style.top);
    		let xcoord= parseInt(tile.style.left);
    		if(yShifts>0){
    			for(yShifts>0;yShifts--;){
    				let y=ycoord+(yShifts*100);
    				moveTileHelp2(xcoord+'_'+y);
    			}
    			yShifts++;
    		}
    		if(yShifts<0){
    			yShifts=(Math.abs(yShifts));
    			for(yShifts>0;yShifts--;){
    				let y=ycoord-(yShifts*100);
    				moveTileHelp2(xcoord+'_'+y);   
    			} 	
    			yShifts++;	
    		}
		}
}