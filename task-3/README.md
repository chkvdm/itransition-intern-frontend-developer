# General non-transitive one-move game implementation

Realization a generalized rock-paper-scissors game (with the supports of arbitrary odd number of arbitrary combinations).  
When launched with command line parameters it accepts an odd number >=3 non-repeating strings. These passed strings are moves (for example, Rock Paper Scissors or Rock Paper Scissors Lizard Spock or 1 2 3 4 5 6 7 8 9).  
The victory is defined as follows - half of the next moves in the circle wins, half of the previous moves in the circle lose (the semantics of the strings-moves is not important, it plays by the rules build upon the moves order the user, even if the stone loses to scissors in its order - the contents of the strings-moves are not important for you).  
The script generates a cryptographically strong random key (SecureRandom, RandomNumberGenerator, etc. - mandatory!) with a length of at least 256 bits, makes computes move, calculates HMAC (based on SHA2 or SHA3) from the own move as a message with the generated key, displays the HMAC to the user. After that the user gets "menu" 1 - Stone, 2 - Scissors, ...., 0 - Exit. The user makes his choice (in case of incorrect input, the "menu" is displayed again). The script shows who won, the move of the computer and the original key.  
When you select the "help" option in the terminal, you see a table that determines which move wins.

## Local development

The game comes with a basic configuration for local start.

> Start the game.

```bash
node src/index.js Rock Paper Scissors
```

## License

[![Licence](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](https://opensource.org/licenses/MIT)
