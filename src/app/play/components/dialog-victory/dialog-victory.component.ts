import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SocketInterfaceService } from 'src/app/comm/socket-interface.service';

@Component({
  selector: 'app-dialog-victory',
  templateUrl: './dialog-victory.component.html',
  styleUrls: ['./dialog-victory.component.scss']
})
export class DialogVictoryComponent implements OnInit {
  display = false;
  victory = false;
  tie = false;

  @Output() dialogClose: EventEmitter<any> = new EventEmitter();

  constructor(private socket: SocketInterfaceService) { }

  ngOnInit(): void {
    this.socket.getMatchEndObservable().subscribe(data => {
      console.log('Received game over message. Opening game over dialog in 2 seconds');
      this.victory = data.victory;
      this.tie = data.tie;
      setTimeout(() => {
        this.display = true;
      }, 2000);
    });
  }

  closeDialog(): void {
    this.display = false;
    this.dialogClose.emit(0);
  }
}
