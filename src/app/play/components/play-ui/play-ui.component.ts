import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatchmakingService } from 'src/app/comm/matchmaking.service';
import { GameLogicService } from 'src/app/play/services/game-logic.service';

@Component({
  selector: 'app-play-ui',
  templateUrl: './play-ui.component.html',
  styleUrls: ['./play-ui.component.scss']
})
export class PlayUIComponent implements OnInit {
  formInputURL: FormControl = new FormControl();
  formInputUID: FormControl = new FormControl();
  formInputPlayerX: FormControl = new FormControl(false);
  formInputMatchMaker: FormControl = new FormControl();
  formInputBaseSocketURL: FormControl = new FormControl();
  matchActive = false;

  constructor(private gameLogic: GameLogicService, private matchmaker: MatchmakingService) {
  }

  ngOnInit(): void {}

  clickDirectConnect(): void {
    if (this.formInputURL.value && this.formInputUID.value?.length > 0 && this.formInputPlayerX.value != undefined) {
      console.log(this.formInputURL.value);
      this.matchActive = true;
      this.gameLogic.newMatch(this.formInputURL.value, this.formInputUID.value, this.formInputPlayerX.value ? 1 : 2);
    }
  }

  clickMatchMaker(): void {
    if(this.formInputMatchMaker.value && this.formInputBaseSocketURL.value) {
      console.log('Requesting match from', this.formInputMatchMaker.value);
      this.matchmaker.getMatch(this.formInputMatchMaker.value).subscribe({
        next: data => {
          this.gameLogic.newMatch(this.formInputBaseSocketURL.value + '/' + data.matchId, data.playerId, data.playerNum)
        },
        error: msg => {
          console.log(msg);
        }
      });
    }
  }
}
