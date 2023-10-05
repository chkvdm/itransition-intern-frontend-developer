import { mod } from './mod.js';
import { AsciiTable3 } from 'ascii-table3';

export class TableGenerator {
  constructor(moves) {
    this.moves = moves;
  }

  generateTable() {
    const moveNums = this.moves.length;
    const rulesTable = {};

    for (let i = 0; i < moveNums; i++) {
      const move = this.moves[i];
      rulesTable[move] = {};
      for (let j = 0; j < moveNums; j++) {
        const versusMove = this.moves[j];
        if (i === j) {
          rulesTable[move][versusMove] = 'Draw';
        } else if (mod(j - i, moveNums) < moveNums / 2) {
          rulesTable[move][versusMove] = 'Win';
        } else {
          rulesTable[move][versusMove] = 'Lose';
        }
      }
    }
    return rulesTable;
  }

  displayTable() {
    const rulesTable = this.generateTable();
    const helpTable = new AsciiTable3(`\x1b[36m${'Game Rules'}\x1b[0m`);
    const headings = [...new Set(Object.keys(rulesTable))];
    helpTable.setHeading('v PC | User > ', ...headings);
    const rowData = [];
    for (const key in rulesTable) {
      const row = { 'PC move': key };
      for (const head of headings) {
        row[head] = rulesTable[key][head];
      }
      rowData.push(row);
    }
    for (const row of rowData) {
      const rowValues = Object.values(row);
      helpTable.addRow(...rowValues);
    }
    console.log(helpTable.toString());
  }
}
