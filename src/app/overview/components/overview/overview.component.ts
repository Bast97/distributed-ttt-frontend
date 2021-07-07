import { Component, OnInit } from '@angular/core';
import { OverviewCommService } from '../../services/overview-comm.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(private overviewService: OverviewCommService) { }

  ngOnInit(): void {
  }

}
