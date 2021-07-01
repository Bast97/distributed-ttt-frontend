import { Injectable, OnDestroy } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, Subject } from 'rxjs';
import { ERROR, GAME_OVER, INIT, MATCH_START, TURN, WSBean, WSGameState, WSError, WSGameOver, WSMatchStart, WSTurn } from './beans';

let connection: WebSocketSubject<WSBean>;

@Injectable({
  providedIn: 'root'
})
export class SocketInterfaceService implements OnDestroy{
  private URL = 'TEST';
  private open = true;

  private subMatchStart: Subject<WSMatchStart> = new Subject<WSMatchStart>();
  private subMatchEnd: Subject<WSGameOver> = new Subject<WSGameOver>();
  private subTurn: Subject<WSGameState> = new Subject<WSGameState>();
  private subGameState: Subject<WSGameState> = new Subject<WSGameState>();
  private subError: Subject<string> = new Subject<string>();

  constructor() {
  }

  ngOnDestroy(): void {
    if (connection != undefined) {
      console.log('Socket Service - Destroy');
      connection.complete();
    }
  }

  openConnection(url: string): void {
    this.open = false;
    if (connection != undefined) {
      connection.complete();
    }
    connection = webSocket(url);
    console.log('opened WebSocket connection to:', url);
    this.open = true;
    connection.subscribe(msg => {
      switch (msg.type) {
        case (INIT):
          this.handlerInit(msg);
          break;
        case (TURN):
          this.handlerTurn(msg);
          break;
        case (MATCH_START):
          this.handlerMatchStart(msg);
          break;
        case (GAME_OVER):
          this.handlerGameOver(msg);
          break;
        case (ERROR):
          this.handlerError(msg);
          break;
      }
    });
  }

  sendRequestTurn(turn: WSTurn): void {
    if (this.open && connection != undefined) {
      connection.next({
        type: TURN,
        data: JSON.stringify(turn)
      });
    } else {
      console.log('Connection is currently closed');
      this.subError.next('There is currently no connection to server. Please try to reconnect!');
    }
  }

  getMatchStartObservable(): Observable<WSMatchStart> {
    return this.subMatchStart.asObservable();
  }
  getMatchEndObservable(): Observable<WSGameOver> {
    return this.subMatchEnd.asObservable();
  }
  getTurnObservable(): Observable<WSGameState> {
    return this.subTurn.asObservable();
  }
  getStateObservable(): Observable<WSGameState> {
    return this.subGameState.asObservable();
  }
  getErrorObservable(): Observable<string> {
    return this.subError.asObservable();
  }

  private handlerInit(bean: WSBean): void {
    console.log('Connection Initialised!');
    this.open = true;
  }
  private handlerTurn(bean: WSBean): void {
    console.log('handling turn');
    console.log(bean);
    if (bean.data != undefined) {
      const data: WSGameState = JSON.parse(bean.data);
      this.subTurn.next(data);
    }
  }
  private handlerMatchStart(bean: WSBean): void {
    if (bean.data != undefined) {
      const data: WSMatchStart = JSON.parse(bean.data);
      this.subMatchStart.next(data);
    }
  }
  private handlerGameOver(bean: WSBean): void {
    if (bean.data != undefined) {
      const data: WSGameOver = JSON.parse(bean.data);
      this.subMatchEnd.next(data);
    }
  }
  private handlerError(bean: WSBean): void {
    if (bean.data != undefined) {
      const data: WSError = JSON.parse(bean.data);
      this.subError.next(data.msg);
      if (data.fatal) {
        connection.complete();
        this.open = false;
      }
    }
  }
}
