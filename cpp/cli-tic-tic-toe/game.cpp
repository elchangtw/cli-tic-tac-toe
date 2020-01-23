#include <iostream>
#include <vector>
#include "game.h"
using namespace std;



int tic_tac_toe()
{
    int input;
    cin >> input;
    cout << "Poke." << endl;
    if (input == 0) {
        return true;
    }
    else {
        return false;
    }
}