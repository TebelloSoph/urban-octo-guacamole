import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chess, Square } from 'chess.js';

interface SquareData {
  name: string;
  light: boolean;
  piece: string | null;
  color: string | null;
}

@Component({
  selector: 'app-board',
  imports: [CommonModule],
  templateUrl: './board.html',
  styleUrls: ['./board.scss']
})
export class BoardComponent {
  rows: SquareData[][] = [];
  private chess = new Chess();
  selectedSquare: SquareData | null = null;
  gameOver = false;
  winner: string | null = null;
  isCheckmate = false;
  isStalemate = false;
  isDraw = false;

  constructor() {
    this.initializeBoard();
    console.log('BoardComponent initialized: ', this.chess.ascii());
  }

  initializeBoard() {
    const board = this.chess.board();
    this.rows = board.map((row, i) => {
      return row.map((square, j) => {
        const light = (i + j) % 2 === 0;
        const piece = square ? square.type : null;
        const color = square ? square.color : null;
        return { name: String.fromCharCode(97 + j) + (8 - i), light, piece, color };
      });
    });
    this.checkGameStatus();
  }

  getPieceImage(square: SquareData): string | null {
    if (!square.piece || !square.color) {
      return null;
    }

    const colorName = square.color === 'w' ? 'white' : 'black';
    const pieceNames: { [key: string]: string } = {
      'p': 'pawn',
      'n': 'knight',
      'b': 'bishop',
      'r': 'rook',
      'q': 'queen',
      'k': 'king'
    };

    const pieceName = pieceNames[square.piece];
    return `assets/${colorName}-${pieceName}.png`;
  }

  onSquareClick(square: SquareData) {
    if (this.gameOver) return;
    
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

  checkGameStatus() {
    if (this.chess.isCheckmate()) {
      this.gameOver = true;
      this.isCheckmate = true;
      // The player who just moved wins, so the current turn (who can't move) lost
      this.winner = this.chess.turn() === 'w' ? 'Black' : 'White';
    } else if (this.chess.isStalemate()) {
      this.gameOver = true;
      this.isStalemate = true;
    } else if (this.chess.isDraw()) {
      this.gameOver = true;
      this.isDraw = true;
    }
  }

  resetGame() {
    this.chess.reset();
    this.gameOver = false;
    this.winner = null;
    this.isCheckmate = false;
    this.isStalemate = false;
    this.isDraw = false;
    this.selectedSquare = null;
    this.initializeBoard();
  }
}
