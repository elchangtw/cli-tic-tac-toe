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

const parseRow = (c) => {
  switch(c) {
    case 'A':
      return 0;
      break;
    case 'B':
      return 1;
      break;
    case 'C':
      return 2;
      break;
    default:
      break;
  } 
}

const parseCol = (c) => {
  switch(c) {
    case '1':
      return 0;
      break;
    case '2':
      return 1;
      break;
    case '3':
      return 2;
      break;
    default:
      break;
  } 
}

const placeMove = (moveStr) => {
  var rowNum = parseRow(moveStr.charAt(0));
  var colNum = parseCol(moveStr.charAt(1));
  if (currPlayer === 1) {
    board[rowNum][colNum] = 'X';
    currPlayer = 2;
  } else if (currPlayer === 2) {
    board[rowNum][colNum] = 'O';
    currPlayer = 1;
  }  
}

const main = () => {
  console.log("Hello, welcome to the command line Tic-Tac-Toe game!\n");
  printBoard();

  readline.question(`What's your move? `, (move) => {
    console.log("???");
    placeMove(move);
    printBoard();
    checkWin();
    readline.close()
  });
  
}

main();