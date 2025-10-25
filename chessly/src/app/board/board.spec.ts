import { provideZonelessChangeDetection } from '@angular/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { BoardComponent } from './board';

describe('BoardComponent', () => {
  let spectator: Spectator<BoardComponent>;
  const createComponent = createComponentFactory({
    component: BoardComponent,
    providers: [provideZonelessChangeDetection()]
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should initialize board with 8 rows', () => {
    expect(spectator.component.rows.length).toBe(8);
  });

  it('should initialize board with 8 columns per row', () => {
    spectator.component.rows.forEach(row => {
      expect(row.length).toBe(8);
    });
  });

  it('should render 64 squares', () => {
    const squares = spectator.queryAll('.square');
    expect(squares.length).toBe(64);
  });

  it('should have alternating light and dark squares', () => {
    const lightSquares = spectator.queryAll('.square.light');
    const darkSquares = spectator.queryAll('.square.dark');
    expect(lightSquares.length).toBe(32);
    expect(darkSquares.length).toBe(32);
  });

  it('should select a square when clicking on a piece', () => {
    const squareWithPiece = spectator.component.rows
      .flat()
      .find(square => square.piece !== null);

    if (squareWithPiece) {
      spectator.component.onSquareClick(squareWithPiece);
      expect(spectator.component.selectedSquare).toBe(squareWithPiece);
    }
  });

  it('should deselect square after invalid move', () => {
    const pawn = spectator.component.rows
      .flat()
      .find(square => square.piece === 'p');

    if (pawn) {
      spectator.component.onSquareClick(pawn);
      expect(spectator.component.selectedSquare).toBe(pawn);

      // Try an invalid move (same square)
      spectator.component.onSquareClick(pawn);
      expect(spectator.component.selectedSquare).toBeNull();
    }
  });

  it('should return correct piece image path', () => {
    const whitePawn = { name: 'e2', light: true, piece: 'p', color: 'w' };
    const blackKnight = { name: 'b8', light: false, piece: 'n', color: 'b' };

    expect(spectator.component.getPieceImage(whitePawn)).toBe('assets/white-pawn.png');
    expect(spectator.component.getPieceImage(blackKnight)).toBe('assets/black-knight.png');
  });

  it('should return null for empty square', () => {
    const emptySquare = { name: 'e4', light: true, piece: null, color: null };
    expect(spectator.component.getPieceImage(emptySquare)).toBeNull();
  });

  it('should start with gameOver as false', () => {
    expect(spectator.component.gameOver).toBe(false);
  });

  it('should not allow moves when game is over', () => {
    spectator.component.gameOver = true;
    const squareWithPiece = spectator.component.rows
      .flat()
      .find(square => square.piece !== null);

    if (squareWithPiece) {
      spectator.component.onSquareClick(squareWithPiece);
      expect(spectator.component.selectedSquare).toBeNull();
    }
  });

  it('should reset game when resetGame is called', () => {
    spectator.component.gameOver = true;
    spectator.component.winner = 'White';
    spectator.component.isCheckmate = true;

    spectator.component.resetGame();

    expect(spectator.component.gameOver).toBe(false);
    expect(spectator.component.winner).toBeNull();
    expect(spectator.component.isCheckmate).toBe(false);
    expect(spectator.component.selectedSquare).toBeNull();
  });

  it('should display game over overlay when checkmate', () => {
    spectator.component.gameOver = true;
    spectator.component.isCheckmate = true;
    spectator.component.winner = 'White';
    spectator.detectChanges();

    const overlay = spectator.query('.game-over-overlay');
    expect(overlay).toBeTruthy();

    const message = spectator.query('.game-over-overlay h2');
    expect(message?.textContent).toContain('Checkmate');
  });
});
