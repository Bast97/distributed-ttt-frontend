import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WstestService } from 'src/app/test/wstest.service';
import { GameLogicService } from 'src/app/play/services/game-logic.service'
import { SocketInterfaceService } from 'src/app/comm/socket-interface.service'

@Component({
  selector: 'app-play-ui',
  templateUrl: './play-ui.component.html',
  styleUrls: ['./play-ui.component.scss']
})
export class PlayUIComponent implements OnInit {
  formInputURL: FormControl = new FormControl();
  matchActive = false;
  websocket?: SocketInterfaceService;
  gameLogic?: GameLogicService;

  constructor(private ws: WstestService) { }

  ngOnInit(): void {
    console.log("ngOnInit");
  }

  clickPlay(): void {
    if (this.formInputURL.value) {
      console.log("clicked play");
      console.log(this.formInputURL.value);
      this.websocket = new SocketInterfaceService();
      this.gameLogic = new GameLogicService(this.websocket);
      this.matchActive = true;
      this.gameLogic.newMatch(this.formInputURL.value);
    }
  }
}
