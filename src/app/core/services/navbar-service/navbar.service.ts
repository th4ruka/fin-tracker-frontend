import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor() { }

  // Observable show/hide Menu Button
  private showMenuButtonSubject = new BehaviorSubject<boolean>(false);
  showMenuButton$ = this.showMenuButtonSubject.asObservable(); // showMenuButton$ observable

  //Observable to toggle SideMenu
  private toggleMenuButtonSubject = new BehaviorSubject<boolean>(false);
  toggleMenuButton$ = this.toggleMenuButtonSubject.asObservable();

  showMenuButton(show: boolean) {
    this.showMenuButtonSubject.next(show);
  }

  toggleMenuButton(toggle: boolean){
    this.toggleMenuButtonSubject.next(toggle);
  }
}
