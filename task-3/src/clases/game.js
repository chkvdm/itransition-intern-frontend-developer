import readline from 'readline';
import _ from 'lodash';
import { GameRules } from './gameRules.js';
import { KeyGenerator } from './keyGenerator.js';
import { TableGenerator } from './tableGenerator.js';

export class Game {
  constructor(moves) {
    this.moves = moves;
    this.gameRules = new GameRules(moves);
    this.keyGenerator = new KeyGenerator(moves);
    this.tableGenerator = new TableGenerator(moves);
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  gameMenu() {
    function menu(moves) {
      console.log('Available moves:');
      for (let i = 1; i <= moves.length; i++) {
        console.log(`${i} - ${moves[i - 1]}`);
      }
      console.log('0 - Exit\n? - Help');
    }

    this.rl.question('Enter you move: ', menu(this.moves), (choice) => {
      if (choice === '?') {
        console.log('Table of moves and results.');
        console.log('The computer selection is indicated vertically.');
        console.log('Your choice horizontally.');
        console.log('At the intersection is the result of the drawing.');
        this.tableGenerator.displayTable();
        this.gameMenu();
      } else {
        const userMove = parseInt(choice, 10);
        if (isNaN(userMove) || userMove < 0 || userMove > this.moves.length) {
          console.log('Invalid input. Please choose a valid option.');
          this.gameMenu();
        }
        if (userMove === 0) {
          this.rl.close();
        }
        if (_.inRange(userMove, 1, this.moves.length + 1)) {
          this.playRound(this.computerMove, this.moves[userMove - 1]);
          this.rl.close();
        }
      }
    });
  }

  generateComputerMove() {
    return this.moves[Math.floor(Math.random() * this.moves.length)];
  }

  playRound(computerMove, userMove) {
    const result = this.gameRules.getGameResult(computerMove, userMove);
    console.log(`Your move: ${userMove}`);
    console.log(`Computer move: ${computerMove}`);
    console.log(`Result: ${result}`);
    console.log(`HMAC key: ${this.key.toString('hex')}\n`);
  }

  start() {
    this.computerMove = this.generateComputerMove();
    this.key = this.keyGenerator.generateKey();
    const hmac = this.keyGenerator.generateHMAC(this.computerMove, this.key);
    console.log(`\nHMAC: ${hmac}`);
    this.gameMenu();
  }
}
