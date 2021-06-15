import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WstestService {
  private connection: WebSocketSubject<string> | undefined;

  private subConn: Subject<boolean> = new Subject<boolean>();
  private subMsg: Subject<string> = new Subject<string>();

  constructor() { }

  connect(url: string): void {
    if (this.connection != undefined) {
      this.connection.complete();
    }
    this.connection = webSocket(url);
    this.connection.asObservable().subscribe(n => {
      this.subMsg.next(n);
    });
  }

  send(msg: string): void {
    this.connection?.next(msg);
  }

  getConnAsObservable(): Observable<boolean> {
    return this.subConn.asObservable();
  }

  getMsgAsObservable(): Observable<string> {
    return this.subMsg.asObservable();
  }
}
