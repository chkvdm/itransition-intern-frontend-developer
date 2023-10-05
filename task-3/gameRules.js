import { mod } from './mod.js';

export class GameRules {
  constructor(moves) {
    this.moves = moves;
  }

  loseWin(pcChoice, userChoice) {
    const x = this.moves.indexOf(pcChoice);
    const y = this.moves.indexOf(userChoice);
    if (x == y) {
      return 'Draw';
    }
    if (mod(x - y, this.moves.length) < this.moves.length / 2) {
      return 'You lose...';
    } else {
      return 'You win!';
    }
  }
}
