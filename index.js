const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

var currPlayer = 1;
var board = [[' ',' ', ' '],
             [' ',' ', ' '],
             [' ',' ', ' ']];
var rowLen = 3, colLen = 3;
var winner = 0;
// var gameEnd = false;

const printBoard = () => {
  console.log("  | 1 | 2 | 3 |");
  console.log("   --- --- --- ");
  console.log("A | " + board[0][0] + " | " + board[0][1] + " | " + board[0][2] + " |");
  console.log("   --- --- --- ");
  console.log("B | " + board[1][0] + " | " + board[1][1] + " | " + board[1][2] + " |");
  console.log("   --- --- --- ");
  console.log("C | " + board[2][0] + " | " + board[2][1] + " | " + board[2][2] + " |");
  console.log("   --- --- --- ");
  if (winner !== 0) {
    console.log("Winner: Player " + winner + "!\n");
  } else {
    console.log("Current Player: " + currPlayer + "\n");
  }  
}

const checkRow = (rowNum) => {
  var flag = board[rowNum].every( (val, i, arr) => { val === arr[0] } );
  if (flag) {
    winner = board[rowNum][0];
    return true;
  } else {
    return false;
  }
}

const checkRows = () => {
  var flag = false;
  for (var i = 0; i < rowLen; i++) {
    if ( board[i][0] !== ' ' ){
      if ( checkRow(i) ) {
        flag = true;
      }
    }
  }
  return flag;
}

const checkCol = (colNum) => {
  var first = board[0][colNum];
  for (var i = 1; i < colLen; i++) {
    if (board[i][colNum] !== first) {
      return false;
    }
  }
  winner = first;
  return true;
}

const checkCols = () => {
  var flag = false;
  for (var i = 0; i < colLen; i++) {
    if (board[0][i] !== ' ') {
      if ( checkCol[i] ) {
        flag = true;
      }
    }
  }
  return flag;
}

const checkWin = () => {
  if (checkRows() || checkCols()) {
    return true;
  } else {
    return false;
  }
}

const main = () => {
  console.log("Hello, welcome to the command line Tic-Tac-Toe game!\n");
  printBoard();

  readline.question(`What's your move? `, (name) => {
    console.log(`Hi ${name}!`)
    readline.close()
  });
  
}

main();