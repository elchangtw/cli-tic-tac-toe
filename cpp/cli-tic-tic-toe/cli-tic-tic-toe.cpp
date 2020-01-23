#include <iostream>
#include "game.h"
using namespace std;

int tic_tac_toe();

int main()
{
    cout << "Welcome to Tic Tac Toe!" << endl;
    while (!tic_tac_toe()) {}
    cout << "Thanks for playing!" << endl;
}