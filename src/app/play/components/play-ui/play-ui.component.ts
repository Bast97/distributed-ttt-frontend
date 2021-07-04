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
  formInputMatchMaker: FormControl = new FormControl('http://localhost:8080/newmatch');
  formInputBaseSocketURL: FormControl = new FormControl('ws://localhost:8765/game');
  matchActive = false;
  playerColor = '';
  turn = false;
  gameOver = false;

  constructor(private gameLogic: GameLogicService, private matchmaker: MatchmakingService) {
  }

  ngOnInit(): void {
    this.gameLogic.getObservableTurn().subscribe( t => {
      this.turn = t;
    });
  }

  clickDirectConnect(): void {
    if (this.formInputURL.value && this.formInputUID.value?.length > 0 && this.formInputPlayerX.value != undefined) {
      console.log(this.formInputURL.value);
      this.playerColor = this.formInputPlayerX.value ? 'X' : 'O';
      this.matchActive = true;
      this.gameLogic.newMatch(this.formInputURL.value, this.formInputUID.value, this.formInputPlayerX.value ? 1 : 2);
    }
  }

  clickMatchMaker(): void {
    if (this.formInputMatchMaker.value && this.formInputBaseSocketURL.value) {
      console.log('Requesting match from', this.formInputMatchMaker.value);
      this.matchmaker.getMatch(this.formInputMatchMaker.value).subscribe({
        next: data => {
          this.gameLogic.newMatch(this.formInputBaseSocketURL.value + '/' + data.matchId, data.playerId, data.playerNum);
          this.playerColor = data.playerNum === 1 ? 'X' : 'O';
          this.gameOver = false;
          this.matchActive = true;
        },
        error: msg => {
          console.log(msg);
        }
      });
    }
  }

  onVictoryDialogClose(): void {
    this.gameOver = true;
  }

  onCloseMatch(): void {
    this.playerColor = '';
    this.turn = false;
    this.gameOver = false;
    this.matchActive = false;
  }
}
