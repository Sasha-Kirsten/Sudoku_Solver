//TASK ONE

function makeRows(row) {
	var puzzle = [];
	for(var i = 0; i < row.length; i++){
		puzzle.push(row.slice());
	}
	return puzzle;
}

console.log('Task one: ')
var row = [1 , 2 , 3 , 4];
console.log(makeRows(row));
console.log('The correct answer should be: [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]]')

//TASK TWO
// this is the constructor of the queue data structure
function Queue() {
	this.arr = [];
	this.head = function() {
		return this.arr[0];
	};
	this.dequeue = function() {
		if (this.arr.length == 0) {
			return "Queue underflow!";
		} else {
			return this.arr.shift();
		}
	};
	this.enqueue = function(o) {
		this.arr.push(o);
	};
	this.isEmpty = function() {
		return this.arr.length == 0;
	};
}

function permuteRow(row, p) {
	queue = new Queue();

	for(var i=0 ; i < row.length ;i++){
		queue.enqueue(row[i]);
	}

	while(p > 0){
		queue.enqueue(queue.head());
		queue.dequeue();
		p--;
	}
	var array = [];

	while(!queue.isEmpty()){
		array.push(queue.head());
		queue.dequeue();
	}
	return array;
}

function permutePuzzle(puzzle, p, q, r) {
	var perms = [p,q,r];
    for (var i=0; i<3; i++){
        puzzle[i + 1] = permuteRow(puzzle[i + 1], perms[i]);
    }
    return puzzle;
}

console.log('Task two: ')
var row = [1 , 2 , 3 , 4];
console.log(permuteRow(row,2));
console.log('The correct answer should be: [3, 4, 1, 2]')

//TASK THREE

function linearSearch(array, item) {
	var n = array.length;
	for (var i = 0; i < n; i++) {
		if (array[i] == item) {
			return true;
		}
 	}
	return false;
}

function checkColumn(puzzle, j) {
	//first make an array out of the values stored in column j
    arrayBool = false;
    array = [];
    
    for(var i = 0; i < puzzle.length; i++){
        array.push(puzzle[i][j]);
    }

	//call linearSearch on the array of column values for all values of k from 1 to 4
    
    if(linearSearch(array, 1) && 
       linearSearch(array, 2) &&
       linearSearch(array, 3) &&
       linearSearch(array, 4)){
        arrayBool = true;
       }
    return arrayBool;
}

console.log('Task three')
var puzzle = [[1,2,3,4],[2,3,4,1],[3,4,1,2],[4,1,2,3]];
console.log(checkColumn(puzzle,1));
puzzle = [[1,2,3,4],[2,3,4,1],[2,3,4,1],[4,1,2,3]];
console.log(checkColumn(puzzle,2));
console.log('The correct answer should be:  true, false')

//TASK FOUR

function colCheck(puzzle) {
    puzzleBool = true;
    
    for(var i=0; i<puzzle.length; i++){
        if(!checkColumn(puzzle, i)){
           puzzleBool = false;
        }
    }
    return puzzleBool;
}

console.log('Task four: ')
var puzzle = [[1, 2, 3, 4], [2, 3, 4, 1], [3, 4, 1, 2], [4, 1, 2, 3]]; 
console.log(colCheck(puzzle));
puzzle = [[1, 2, 3, 4], [2, 3, 4, 1], [2, 3, 4, 1], [4, 1, 2, 3]]; 
console.log(colCheck(puzzle));
console.log('The correct answer should be:  true, false')

//TASK FIVE

function makeGrid(puzzle, row1, row2, col1, col2) {
	//this copies all elements in a grid from co-ordinates (row1, col1) to (row2,col2) to an array
	var array = [];
	for (var i = row1; i <= row2; i++) {
		for (var j = col1; j <= col2; j++){
			array.push(puzzle[i][j]);
		}
	}
	return array;
}

function checkGrid(puzzle, row1, row2, col1, col2) {
    checkGridPuzzle = makeGrid(puzzle, row1, row2, col1, col2);
    
    if(linearSearch(checkGridPuzzle, 1) && 
        linearSearch(checkGridPuzzle, 2) && 
        linearSearch(checkGridPuzzle, 3) && 
        linearSearch(checkGridPuzzle, 4)){
    	return true;
    }
    return false;
}

console.log('Task five: ')
var puzzle = [[1, 2, 3, 4], [2, 3, 4, 1], [3, 4, 1, 2], [4, 1, 2, 3]]; 
console.log(checkGrid(puzzle , 0, 1, 2, 3));
puzzle = [[1, 2, 3, 4], [3, 4, 1, 2], [4, 1, 2, 3], [4, 1, 2, 3]]; 
console.log(checkGrid(puzzle , 0, 1, 0, 1));
console.log('The correct answer should be:  false, true')

//TASK SIX

function checkGrids(puzzle) {

	if(checkGrid(puzzle, 0, 1, 0, 1) == false){
		return false;
	}

	if(checkGrid(puzzle, 0, 1, 2, 3) == false){
		return false;
	}

	if(checkGrid(puzzle, 2, 3, 0, 1) == false){
		return false;
	}

	if(checkGrid(puzzle, 2, 3, 2, 3) == false){
		return false;
	}
	return true;
}
console.log('Task six: ')
var puzzle = [[1, 2, 3, 4], [2, 3, 4, 1], [3, 4, 1, 2], [4, 1, 2, 3]]; 
console.log(checkGrids(puzzle));
puzzle = [[1, 2, 3, 4], [3, 4, 1, 2], [4, 1, 2, 3], [2, 3, 4, 1],]; 
console.log(checkGrids(puzzle));
console.log('The correct answer should be: false, true')

//TASK SEVEN

function makeSolution(row) {
	var array = [];
	var puzzle = makeRows(row);
  
	for(var p = 0; p < row.length; p++){
		for(var q = 0; q < row.length; q++){
			for(var r = 0; r < row.length; r++){
				array.push(permutePuzzle(puzzle.slice(), p, q, r));
			}
		}
	}
	for(var i = 0; i < array.length; i++){
		if(colCheck(array[i])){
			if(checkGrids(array[i])){
				return array[i];
			}
		}
	}
}

 var row = [1, 2, 3, 4]; 
 console.log("Task SEVEN: ")
 console.log(makeSolution(row));

// TASK EIGHT

// a function to randomly select n (row,column) entries of a 2d array
function entriesToDel(n) {
	var array = [];
	for (var i = 0; i < n; i++) {
		var row = Math.round(3*Math.random());
		var col = Math.round(3*Math.random());
		array.push([row,col]);
		for(var j = 0; j < array.length; j++){
			if(array[j] === array[-1]){
				array.pop();
				i--;
			}
		}
	}
	return array;
}

function genPuzzle(row, n) {
	if (n >= 16) {
		return "Error! Too many blank spaces!";
	}
	var solution = makeSolution(row);
	var blanks = entriesToDel(n);
	for (var i = 0; i < blanks.length; i++) {
		solution[blanks[i][0]][blanks[i][1]] = " ";
	}
	return solution;
}

console.log("Task EIGHT: ")
console.log(entriesToDel(6));

// The following function is used to visualise the puzzles

function visPuzzle(puzzle) {
	var viz = "";

	for (var i = 0; i < puzzle.length; i++) {
		for (var j = 0; j < puzzle.length; j++) {
			viz = viz + "----";
		}
		viz = viz + "-\n";
		for (var j = 0; j < puzzle.length; j++) {
			viz = viz + "| " + puzzle[i][j] + " ";
		}
		viz = viz + "| " + "\n";
	}
	for (var j = 0; j < puzzle.length; j++) {
			viz = viz + "----";
	}
	viz = viz + "-";
	return viz;
}


// DO NOT DELETE BELOW THIS LINE OR NOTHING WILL WORK
module.exports = {makeRows : makeRows, makeSolution : makeSolution, genPuzzle : genPuzzle, checkGrid : checkGrid, checkGrids : checkGrids, colCheck : colCheck, checkColumn : checkColumn, permuteRow : permuteRow, permutePuzzle : permutePuzzle};
