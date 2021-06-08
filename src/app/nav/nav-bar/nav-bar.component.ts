import { Component, OnInit} from '@angular/core';
import { NavItem } from '../service/nav-control.service';
import { NavControlService } from '../service/nav-control.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  items: NavItem[] = [];
  constructor(private navControl: NavControlService, private router: Router) { }

  ngOnInit(): void {
    this.navControl.getChangeObservable().subscribe( list => {
      this.items = list;
    });
    this.items = this.navControl.getMenuList();
  }

  onClick(link: string): void {
    this.router.navigateByUrl(link);
  }
}
