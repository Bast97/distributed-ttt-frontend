import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, Subject } from 'rxjs';
import { INIT, WSBean, WSConfirm, WSError, WSGameOver, WSMatchStart, WSTurn } from './beans';

@Injectable({
  providedIn: 'root'
})

export class SocketInterfaceService {
  private URL = 'TEST';
  private connection: WebSocketSubject<WSBean> | undefined;
  private open = false;

  private subMatchStart: Subject<WSMatchStart> = new Subject<WSMatchStart>();
  private subMatchEnd: Subject<WSGameOver> = new Subject<WSGameOver>();
  private subTurn: Subject<WSTurn> = new Subject<WSTurn>();
  private subConfirm: Subject<WSConfirm> = new Subject<WSConfirm>();
  private subError: Subject<string> = new Subject<string>();

  constructor() { }

  openConnection(): void {
    this.open = false;
    if (this.connection != undefined) {
      this.connection.complete();
    }
    this.connection = webSocket(this.URL);

    this.connection.subscribe(data => {
      switch (data.type) {
        case (INIT): break;
      }
    });
  }

  private getMatchStartObservable(): Observable<WSMatchStart> {
    return this.subMatchStart.asObservable();
  }
  private getMatchEndObservable(): Observable<WSGameOver> {
    return this.subMatchEnd.asObservable();
  }
  private getTurnObservable(): Observable<WSTurn> {
    return this.subTurn.asObservable();
  }
  private getConfirmObservable(): Observable<WSConfirm> {
    return this.subConfirm.asObservable();
  }
  private getErrorObservable(): Observable<string> {
    return this.subError.asObservable();
  }
}
