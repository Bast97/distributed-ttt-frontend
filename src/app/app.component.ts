import { Component } from '@angular/core';
import { NavControlService } from './nav/service/nav-control.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Distributed TTT';

  constructor(private navService: NavControlService) {
    this.navService.setMenu([
      {
        label: 'Play',
        path: 'play'
      },
      {
        label: 'Overview',
        path: 'overview'
      },
      {
        label: 'Test',
        path: 'test'
      }
    ]);
  }
}
