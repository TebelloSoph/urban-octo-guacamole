import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chess, Square } from 'chess.js';

@Component({
  selector: 'app-board',
  imports: [CommonModule],
  templateUrl: './board.html',
  styleUrls: ['./board.scss']
})
export class BoardComponent {
  rows: { name: string; light: boolean; piece: string | null; }[][] = [];
  private chess = new Chess();
  selectedSquare: { name: string; piece: string | null; } | null = null;

  constructor() {
    this.initializeBoard();
    console.log('BoardComponent initialized: ', this.chess.ascii());
  }

  initializeBoard() {
    const board = this.chess.board();
    this.rows = board.map((row, i) => {
      return row.map((square, j) => {
        const light = (i + j) % 2 !== 0;
        const piece = square ? square.type : null;
        return { name: String.fromCharCode(97 + j) + (8 - i), light, piece };
      });
    });
  }

  onSquareClick(square: { name: string; piece: string | null; }) {
    if (this.selectedSquare) {
      try {
        this.chess.move({ from: this.selectedSquare.name as Square, to: square.name as Square });
        this.initializeBoard();
        this.selectedSquare = null;
      } catch (e) {
        // Invalid move
        this.selectedSquare = null;
      }
    } else if (square.piece) {
      this.selectedSquare = square;
    }
  }
}
