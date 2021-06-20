import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WstestService } from '../wstest.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  inputURL: FormControl = new FormControl();
  inputMsg: FormControl = new FormControl();
  rcvMsgs: string[] = [];
  connection = false;

  constructor(private wstest: WstestService) { }

  ngOnInit(): void {
    this.wstest.getConnAsObservable().subscribe(n => {
      this.connection = n;
    });
    this.wstest.getMsgAsObservable().subscribe(n => {
      if (n != undefined) {
        this.rcvMsgs.push(n);
      }
    });
  }

  clickConnect(): void {
    console.log('Connecting ...');
    this.wstest.connect(this.inputURL.value);
  }

  clickSend(): void {
    console.log('Sending', this.inputMsg.value);
    this.wstest.send(this.inputMsg.value);
  }

}
