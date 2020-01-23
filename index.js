const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Place your move> '
});

var currPlayer = 1;
var board = [[' ',' ', ' '],
             [' ',' ', ' '],
             [' ',' ', ' ']];
var rowLen = 3, colLen = 3;
var winner = 0;
var gameEnd = false;

const printBoard = () => {
  console.log("\n");
  console.log("  | 1 | 2 | 3 |");
  console.log("   --- --- --- ");
  console.log("A | " + board[0][0] + " | " + board[0][1] + " | " + board[0][2] + " |");
  console.log("   --- --- --- ");
  console.log("B | " + board[1][0] + " | " + board[1][1] + " | " + board[1][2] + " |");
  console.log("   --- --- --- ");
  console.log("C | " + board[2][0] + " | " + board[2][1] + " | " + board[2][2] + " |");
  console.log("   --- --- --- ");
  if (winner !== 0) {
    console.log("Winner: Player " + winner + "\n");
  } else {
    console.log("Current Player: " + currPlayer + "\n");
  }  
}

const checkRow = (rowNum) => {
  console.log('check row: '+ rowNum);
  var first = board[rowNum][0];
  for (var i = 1; i < rowLen; i++) {
    if (board[rowNum][i] !== first) {
      return false;
    }
  }  
  if (first === 'X') { winner = 1; }
  else if (first === 'O') { winner = 2; }
  return true;
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
  if (first === 'X') { winner = 1; }
  else if (first === 'O') { winner = 2; }
  return true;
}

const checkCols = () => {
  var flag = false;
  for (var i = 0; i < colLen; i++) {
    if (board[0][i] !== ' ') {
      if ( checkCol(i) ) {
        flag = true;
      }
    }
  }
  return flag;
}

const checkDiagonalMajor = () => {
  var first = board[0][0];
  for (var i = 0, j = 0; i < rowLen, j < colLen; i++, j++) {
    if (board[i][j] !== first) {
      return false;
    }
  }
  if (first === 'X') { winner = 1; }
  else if (first === 'O') { winner = 2; }
  return true;
}

const checkDiagonalMinor = () => {
  var first = board[0][colLen - 1];
  for (var i = 0, j = colLen - 1; i < rowLen, j >= 0; i++, j--) {
    if (board[i][j] !== first) {
      return false;
    }
  }
  if (first === 'X') { winner = 1; }
  else if (first === 'O') { winner = 2; }
  return true;
}

const checkDiagonals = () => {
  var flag = false;
  if (board[0][0] !== ' ') {
    if ( checkDiagonalMajor() ) {
      flag = true;
    }
  }
  if (board[0][colLen - 1] !== ' ') {
    if ( checkDiagonalMinor() ) {
      flag = true;
    }
  }
  return flag;
}

const checkWin = () => {
  if (checkRows() || checkCols() || checkDiagonals()) {
    gameEnd = true;
    // return true;
  } else {
    // gameEnd = false;
    // return false;
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
  if (board[rowNum][colNum] === ' ') {
    if (currPlayer === 1) {
      board[rowNum][colNum] = 'X';
      currPlayer = 2;
    } else if (currPlayer === 2) {
      board[rowNum][colNum] = 'O';
      currPlayer = 1;
    }
    return true;
  } else {
    return false;
  }
}

const main = () => {
  console.log("Hello, welcome to the command line Tic-Tac-Toe game!");
  printBoard();

  readline.prompt();

  readline.on('line', (line) => {
    if (placeMove(line)) {
      checkWin();
    } else {
      console.log("\nInvalid move!\n");
    }
    printBoard();   
    
    if (gameEnd) {
      readline.close();
    } else {
      readline.prompt();
    }
  }).on('close', () => {
    console.log('Thanks for playing!\n');
    process.exit(0);
  });
  
}

main();