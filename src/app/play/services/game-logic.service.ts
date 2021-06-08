import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export enum TTTCellState {
  EMPTY, X, O
}

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {
  private subState: Subject<TTTCellState[]>;
  private subTurn: Subject<boolean>;

  private playerColor: TTTCellState;
  private playerTurn = false;
  private gameState: TTTCellState[] = [
    TTTCellState.EMPTY,
    TTTCellState.EMPTY,
    TTTCellState.EMPTY,
    TTTCellState.EMPTY,
    TTTCellState.EMPTY,
    TTTCellState.EMPTY,
    TTTCellState.EMPTY,
    TTTCellState.EMPTY,
    TTTCellState.EMPTY,
  ];

  constructor() {
    this.playerTurn = true; //TODO: Entfernen!
    this.playerColor = TTTCellState.X;
    this.subState = new Subject<TTTCellState[]>();
    this.subTurn = new Subject<boolean>();
  }

  playTurn(x: number, y: number): void {
    if (this.playerTurn) {
      if (this.setCell(x, y, this.playerColor)) {
        this.playerTurn = false;
        this.notifyTurnChange();

      }
    }
  }

  getGameState(): TTTCellState[] {
    return [...this.gameState];
  }

  getObservableGameState(): Observable<TTTCellState[]> {
    return this.subState.asObservable();
  }

  getObservableTurn(): Observable<boolean> {
    return this.subTurn.asObservable();
  }

  private setCell(x: number, y: number, color: TTTCellState): boolean {
    if (x >= 0 && x < 3 && y >= 0 && y < 3 && this.gameState[(y * 3) + x] === TTTCellState.EMPTY) {
      this.gameState[(y * 3) + x] = color;
      this.notifyStateChange();
      return true;
    } else {
      return false;
    }
  }

  private notifyStateChange(): void {
    this.subState.next([...this.gameState]);
  }

  private notifyTurnChange(): void {
    this.subTurn.next(this.playerTurn);
  }
}
