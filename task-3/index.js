import { Game } from './game.js';

const moves = process.argv.slice(2);

if (
  moves.length < 3 ||
  moves.length % 2 === 0 ||
  new Set(moves).size !== moves.length
) {
  console.error('Incorrect arguments.');
  console.error('Please provide an odd number of non-repeating strings.');
  console.error('Minimum number of parameters 3 or more.');
  console.error('Example: node play.js Rock Paper Scissors');
} else {
  const game = new Game(moves);
  game.start();
}
