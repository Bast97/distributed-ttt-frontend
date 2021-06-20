import { Injectable, OnDestroy } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, Subject } from 'rxjs';
import { CONFIRM, ERROR, GAME_OVER, INIT, MATCH_START, TURN, WSBean, WSConfirm, WSError, WSGameOver, WSMatchStart, WSTurn } from './beans';

@Injectable({
  providedIn: 'root'
})

export class SocketInterfaceService implements OnDestroy{
  private URL = 'TEST';
  private connection: WebSocketSubject<WSBean> | undefined;
  private open = true;

  private subMatchStart: Subject<WSMatchStart> = new Subject<WSMatchStart>();
  private subMatchEnd: Subject<WSGameOver> = new Subject<WSGameOver>();
  private subTurn: Subject<WSTurn> = new Subject<WSTurn>();
  private subConfirm: Subject<WSConfirm> = new Subject<WSConfirm>();
  private subError: Subject<string> = new Subject<string>();

  constructor() { }

  ngOnDestroy(): void {
    if (this.connection != undefined) {
      this.connection.complete();
    }
  }

  openConnection(url: string): void {
    this.open = false;
    if (this.connection != undefined) {
      this.connection.complete();
    }
    this.connection = webSocket(url);
    console.log("opened WebSocket connection to:" + url);
    this.open = true;
    this.connection.subscribe(msg => {
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
        case (CONFIRM):
          this.handlerConfirm(msg);
          break;
        case (ERROR):
          this.handlerError(msg);
          break;
      }
    });
  }

  sendRequestTurn(turn: WSTurn): void {
    console.log("sending turn to WS");
    console.log(this.open);
    if (this.open) {
      this.connection?.next({
        type: TURN,
        data: JSON.stringify(turn)
      });
    } else {
      this.subError.next('There is currently no connection to server. Please try to reconnect!');
    }
  }

  getMatchStartObservable(): Observable<WSMatchStart> {
    return this.subMatchStart.asObservable();
  }
  getMatchEndObservable(): Observable<WSGameOver> {
    return this.subMatchEnd.asObservable();
  }
  getTurnObservable(): Observable<WSTurn> {
    return this.subTurn.asObservable();
  }
  getConfirmObservable(): Observable<WSConfirm> {
    return this.subConfirm.asObservable();
  }
  getErrorObservable(): Observable<string> {
    return this.subError.asObservable();
  }

  private handlerInit(bean: WSBean): void {
    console.log('Connection Initialised!');
    this.open = true;
  }
  private handlerTurn(bean: WSBean): void {
    console.log("handling turn");
    if (bean.data != undefined) {
      const data: WSTurn = JSON.parse(bean.data);
      console.log(bean.data);
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
  private handlerConfirm(bean: WSBean): void {
    if (bean.data != undefined) {
      const data: WSConfirm = JSON.parse(bean.data);
      this.subConfirm.next(data);
    }
  }
  private handlerError(bean: WSBean): void {
    if (bean.data != undefined) {
      const data: WSError = JSON.parse(bean.data);
      this.subError.next(data.msg);
      if (data.fatal) {
        this.connection?.complete();
        this.open = false;
      }
    }
  }
}
