import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GameLogicService } from 'src/app/play/services/game-logic.service';

@Component({
  selector: 'app-play-ui',
  templateUrl: './play-ui.component.html',
  styleUrls: ['./play-ui.component.scss']
})
export class PlayUIComponent implements OnInit {
  formInputURL: FormControl = new FormControl();
  matchActive = false;

  constructor(private gameLogic: GameLogicService) {
  }

  ngOnInit(): void {}

  clickPlay(): void {
    if (this.formInputURL.value) {
      console.log('clicked play');
      console.log(this.formInputURL.value);
      this.matchActive = true;
      this.gameLogic.newMatch(this.formInputURL.value, "test-uid");
    }
  }
}
