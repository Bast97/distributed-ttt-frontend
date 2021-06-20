import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WstestService } from 'src/app/test/wstest.service';

@Component({
  selector: 'app-play-ui',
  templateUrl: './play-ui.component.html',
  styleUrls: ['./play-ui.component.scss']
})
export class PlayUIComponent implements OnInit {
  formInputURL: FormControl = new FormControl();
  matchActive = false;

  constructor(private ws: WstestService) { }

  ngOnInit(): void {
  }

  clickPlay(): void {
    
  }
}
