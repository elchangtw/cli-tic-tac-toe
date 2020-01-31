#include <iostream>
#include <vector>
#include "game.h"
using namespace std;

bool tic_tac_toe(vector<vector<state>>& board, int& playerTurn, int& gameStatus);

int main() {
    cout << "Welcome to Tic Tac Toe!" << endl;

    vector<vector<state>> board(ROW_LEN, vector<state>(COL_LEN, state::EMPTY));
    int playerTurn = 0; // 0 = player 1 turn, 1 = player 2 turn
    int gameStatus = 0; // 0 = ongoing, 1 = player 1 win, 2 = player 2 win

    while (!tic_tac_toe(board, playerTurn, gameStatus)) {}

    cout << "Thanks for playing!" << endl;
}