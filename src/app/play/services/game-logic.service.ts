import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WSConfirm, WSGameOver, WSMatchStart, WSTurn } from 'src/app/comm/beans';
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
  private subState: Subject<TTTCellState[]>;
  private subTurn: Subject<boolean>;

  private lastPlayerTurn: Turn | null = null;

  private playerColor: TTTCellState;
  private opponentColor: TTTCellState;
  private playerTurn = true;
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

  constructor(private socket: SocketInterfaceService) {
    // this.playerTurn = false; // TODO: Entfernen!
    this.playerColor = TTTCellState.X;
    this.opponentColor = TTTCellState.O;
    this.subState = new Subject<TTTCellState[]>();
    this.subTurn = new Subject<boolean>();

    this.socket.getMatchStartObservable().subscribe(data => {
      this.handlerMatchStart(data);
    });

    this.socket.getMatchEndObservable().subscribe(data => {
      this.handlerMatchEnd(data);
    });

    this.socket.getTurnObservable().subscribe(data => {
      this.handlerOpponentTurn(data);
    });

    this.socket.getConfirmObservable().subscribe(data => {
      this.handlerConfirm(data);
    });
  }

  newMatch(url: string): void {
    console.log("starting new match");
    // Reset everything
    this.playerTurn = true;
    this.gameState = [
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
    this.notifyStateChange();
    this.notifyTurnChange();

    this.socket.openConnection(url);
  }

  playTurn(x: number, y: number): void {
    if (this.playerTurn) {
    console.log("turn " + x + " " + y + " was played");
      if (this.setCell(x, y, this.playerColor)) {
        this.playerTurn = false;
        this.notifyTurnChange();
        let turn: WSTurn = { x:x, y:y, color:"X" };
        this.socket.sendRequestTurn(turn);
      }
      this.notifyStateChange();
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

  private handlerOpponentTurn(data: WSTurn): void {
    if (data != undefined) {
      if (this.gameState[(data.y * 3) + data.x] === TTTCellState.EMPTY) {
        this.gameState[(data.y * 3) + data.x] = this.playerColor === TTTCellState.X ? TTTCellState.O : TTTCellState.X;
        this.notifyStateChange();
        this.playerTurn = true;
        setTimeout(() => {
          this.notifyTurnChange();
        }, 500);
      } else {
        console.log('Sync Error!', this.gameState, data);
      }
    }
  }
  private handlerConfirm(data: WSConfirm): void {
    if (data != undefined) {
      for (const entry of data.gamestate) {
        console.log(entry); // TODO: Hier noch eine richtige Kontrolle einfügen
      }
    }
  }
  private handlerMatchStart(data: WSMatchStart): void {
    if (data != undefined) {
      this.playerColor = data.color === 'X' ? TTTCellState.X : TTTCellState.O;
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
