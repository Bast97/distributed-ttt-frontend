import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WSGameOver, WSGameState, WSMatchStart, WSTurn } from 'src/app/comm/beans';
import { SocketInterfaceService } from 'src/app/comm/socket-interface.service';

export enum TTTCellState {
  EMPTY, X, O
}

interface Turn {
  x: number;
  y: number;
}

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {
  private subState: Subject<TTTCellState[][]>;
  private subTurn: Subject<boolean>;

  private lastPlayerTurn: Turn | null = null;

  private playerColor: TTTCellState;
  private playerTurn = true;
  private gameState: TTTCellState[][] = [[TTTCellState.EMPTY, TTTCellState.EMPTY, TTTCellState.EMPTY],
                      [TTTCellState.EMPTY, TTTCellState.EMPTY, TTTCellState.EMPTY],
                      [TTTCellState.EMPTY, TTTCellState.EMPTY, TTTCellState.EMPTY]];

  constructor(private socket: SocketInterfaceService) {
    // this.playerTurn = false; // TODO: Entfernen!
    this.playerColor = TTTCellState.X;
    this.subState = new Subject<TTTCellState[][]>();
    this.subTurn = new Subject<boolean>();

    this.socket.getMatchStartObservable().subscribe(data => {
      this.handlerMatchStart(data);
    });

    this.socket.getMatchEndObservable().subscribe(data => {
      this.handlerMatchEnd(data);
    });

    this.socket.getTurnObservable().subscribe(data => {
      this.handlerTurn(data);
    });
  }

  newMatch(url: string): void {
    console.log('Starting new match');
    // Reset everything
    this.playerTurn = true;
    this.gameState = [[TTTCellState.EMPTY, TTTCellState.EMPTY, TTTCellState.EMPTY],
                      [TTTCellState.EMPTY, TTTCellState.EMPTY, TTTCellState.EMPTY],
                      [TTTCellState.EMPTY, TTTCellState.EMPTY, TTTCellState.EMPTY]];
    this.notifyStateChange();
    this.notifyTurnChange();

    this.socket.openConnection(url);
  }

  playTurn(x: number, y: number): void {
    if (this.playerTurn) {
      console.log('Turn', x, y, 'was played');
      if (this.gameState[y][x] === TTTCellState.EMPTY) {
        this.playerTurn = false;
        this.notifyTurnChange();
        const turn: WSTurn = {
          x,
          y,
          color: this.playerColor === TTTCellState.X ? 1 : 2
        };
        this.socket.sendRequestTurn(turn);
      }
    }
  }

  getGameState(): TTTCellState[][] {
    return [...this.gameState];
  }

  getObservableGameState(): Observable<TTTCellState[][]> {
    return this.subState.asObservable();
  }

  getObservableTurn(): Observable<boolean> {
    return this.subTurn.asObservable();
  }

  private setCell(x: number, y: number, color: TTTCellState): boolean {
    if (x >= 0 && x < 3 && y >= 0 && y < 3 && this.gameState[y][x] === TTTCellState.EMPTY) {
      this.gameState[y][x] = color;
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

  private handlerTurn(data: WSGameState | string[][]): void {
    if (data != undefined) {
      console.log(data);
      var squares: any = data;
      console.log(squares.length);
      // squares.forEach( (element) => {
      //   console.log("oi");
      // });
      for(let y = 0; y < squares.length; y++) {
        for(let x = 0; x < squares[y].length; x++) {
          if(squares[y][x] == "EMPTY") {
            this.gameState[y][x] = TTTCellState.EMPTY;
          } else if(squares[y][x] == "X") {
            this.gameState[y][x] = TTTCellState.X;
          } else if(squares[y][x] == "O") {
            this.gameState[y][x] = TTTCellState.O;
          }
        }
      }

      // for (let i = 0; i < this.gameState.length && i < data.gamestate.length; i++) {
      //   if (data.gamestate[i] === 0) {
      //     this.gameState[i] = TTTCellState.EMPTY;
      //   } else if (data.gamestate[i] === 1) {
      //     this.gameState[i] = TTTCellState.X;
      //   } else if (data.gamestate[i] === 2) {
      //     this.gameState[i] = TTTCellState.O;
      //   }
      // }

      // console.log(this.gameState);
      this.notifyStateChange();
    }
  }
  private handlerMatchStart(data: WSMatchStart): void {
    if (data != undefined) {
      this.playerColor = data.color === 1 ? TTTCellState.X : TTTCellState.O;
      this.playerTurn = data.turn;
      this.notifyTurnChange();
    }
  }
  private handlerMatchEnd(data: WSGameOver): void {
    if (data != undefined) {
      this.playerTurn = false;
      this.notifyTurnChange();
      window.alert('Game over' + data.tie + data.victory); // TODO: Hier muss noch was ordentliches implementiert werden!
    }
  }
}
