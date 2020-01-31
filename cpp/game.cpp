#include <iostream>
#include <vector>
#include <string>
#include "game.h"
using namespace std;

char getBoardIcon(state &s)
{
    char result;
    if (s == state::X)
    {
        result = 'X';
    }
    else if (s == state::O)
    {
        result = 'O';
    }
    else
    {
        result = ' ';
    }
    return result;
}

void printBoard(vector<vector<state>> &board, int &gameStatus, int &playerTurn)
{
    cout << endl;
    cout << "   | 1 | 2 | 3 " << endl;
    cout << "    --- --- ---" << endl;
    cout << " A | " << getBoardIcon(board[0][0]) << " | " << getBoardIcon(board[0][1]) << " | " << getBoardIcon(board[0][2]) << " " << endl;
    cout << "    --- --- ---" << endl;
    cout << " B | " << getBoardIcon(board[1][0]) << " | " << getBoardIcon(board[1][1]) << " | " << getBoardIcon(board[1][2]) << " " << endl;
    cout << "    --- --- ---" << endl;
    cout << " C | " << getBoardIcon(board[2][0]) << " | " << getBoardIcon(board[2][1]) << " | " << getBoardIcon(board[2][2]) << " " << endl;
    if (gameStatus == 1 || gameStatus == 2)
    {
        cout << "Player " << gameStatus << " wins." << endl;
    }
    else if (gameStatus == 3)
    {
        cout << "It's a tie." << endl;
    }
    else
    {
        cout << "Player this turn: " << playerTurn + 1 << endl;
    }
    cout << endl;
}

int getRowNum(char &row)
{
    if (row == 'A')
    {
        return 0;
    }
    else if (row == 'B')
    {
        return 1;
    }
    else if (row == 'C')
    {
        return 2;
    }
    else
    {
        return 3;
    }
}

int getColNum(char &col)
{
    if (col == '1')
    {
        return 0;
    }
    else if (col == '2')
    {
        return 1;
    }
    else if (col == '3')
    {
        return 2;
    }
    else
    {
        return 3;
    }
}

bool placeMove(vector<vector<state>> &board, string &move, int &playerTurn)
{
    int rowNum = getRowNum(move[0]);
    int colNum = getColNum(move[1]);
    if (rowNum == 3 || colNum == 3 || board[rowNum][colNum] != state::EMPTY)
    {
        cout << endl;
        cout << "Invalid move." << endl;
        return false;
    }
    board[rowNum][colNum] = (playerTurn == 0) ? state::X : state::O;
    return true;
}

void checkDiagonals(vector<vector<state>> &board, int &gameStatus)
{
    if (board[0][0] != state::EMPTY)
    {
        if (board[0][0] == board[1][1] && board[0][0] == board[2][2])
        {
            gameStatus = board[0][0] == state::X ? 1 : 2;
        }
    }
    if (board[0][2] != state::EMPTY)
    {
        if (board[0][2] == board[1][1] && board[0][2] == board[2][0])
        {
            gameStatus = board[0][2] == state::X ? 1 : 2;
        }
    }
}

void checkCols(vector<vector<state>> &board, int &gameStatus)
{
    for (int i = 0; i < COL_LEN; i++)
    {
        if (board[0][i] != state::EMPTY)
        {
            if (board[0][i] == board[1][i] && board[0][i] == board[2][i])
            {
                gameStatus = board[0][i] == state::X ? 1 : 2;
            }
        }
    }
}

void checkRows(vector<vector<state>> &board, int &gameStatus)
{
    for (int i = 0; i < ROW_LEN; i++)
    {
        if (board[i][0] != state::EMPTY)
        {
            if (board[i][0] == board[i][1] && board[i][0] == board[i][2])
            {
                gameStatus = board[i][0] == state::X ? 1 : 2;
            }
        }
    }
}

void checkTie(vector<vector<state>> &board, int &gameStatus)
{
    bool flag = false;
    for (int i = 0; i < ROW_LEN; i++) {
        for (int j = 0; j < COL_LEN; j++) {
            if (board[i][j] == state::EMPTY) {
                flag = true;
                break;
            }
        }
    }
    if (!flag) {
        gameStatus = 3;
    }
}

void checkWin(vector<vector<state>> &board, int &gameStatus)
{
    checkRows(board, gameStatus);
    checkCols(board, gameStatus);
    checkDiagonals(board, gameStatus);
    if (gameStatus == 0) {
        checkTie(board, gameStatus);
    }
}

bool tic_tac_toe(vector<vector<state>> &board, int &playerTurn, int &gameStatus)
{
    printBoard(board, gameStatus, playerTurn);

    cout << "Place Move: ";
    string input;
    cin >> input;

    if (placeMove(board, input, playerTurn))
    {
        checkWin(board, gameStatus);
        playerTurn = (playerTurn == 0) ? 1 : 0;
    }

    if (gameStatus != 0)
    {
        printBoard(board, gameStatus, playerTurn);
        cout << "Enter anything to end." << endl;
        int end;
        cin >> end;
        return true;
    }
    else
    {
        return false;
    }
}