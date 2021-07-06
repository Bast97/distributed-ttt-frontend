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
  formInputIP: FormControl = new FormControl('34.149.46.105');
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

  clickPlay(): void {
    if (this.formInputIP.value) {
      let matchmakerURL = 'http://' + this.formInputIP.value + '/newmatch';
      let websocketURL = 'ws://' + this.formInputIP.value + '/game';
      console.log('Requesting match from', matchmakerURL);
      this.matchmaker.getMatch(matchmakerURL).subscribe({
        next: data => {
          this.gameLogic.newMatch(websocketURL + '/' + data.matchId, data.playerId, data.playerNum);
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
