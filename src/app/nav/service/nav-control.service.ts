import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

export interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NavControlService {
  private menuList: NavItem[] = [];
  private subjectMenuItemList: Subject<NavItem[]>;

  constructor() {
    this.subjectMenuItemList = new Subject();
  }

  setMenu(menu: NavItem[]): void {
    if (menu != undefined) {
      this.menuList = menu;
      this.subjectMenuItemList.next(this.menuList);
    }
  }

  pushMenuEntry(item: NavItem): void {
    if (item != undefined) {
      this.menuList.push(item);
      this.subjectMenuItemList.next(this.menuList);
    }
  }

  getMenuList(): NavItem[] {
    return [...this.menuList]; // Return shallow copy of the menu list, so that no one can change the list without the setter
  }

  getChangeObservable(): Observable<NavItem[]> {
    return this.subjectMenuItemList.asObservable();
  }
}
