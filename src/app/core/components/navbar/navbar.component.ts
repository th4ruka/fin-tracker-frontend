import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarService } from '../../services/navbar-service/navbar.service';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatToolbarModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit{
  showMenuButton = false;
  toggleMenuButton = false;

  constructor(private navBarService: NavbarService){}

  ngOnInit() {
    this.navBarService.showMenuButton$.subscribe(show =>{this.showMenuButton = show})
  }

  onMenuButtonClick(){
    this.toggleMenuButton = ! this.toggleMenuButton;
    this.navBarService.toggleMenuButton(this.toggleMenuButton);
  }

}
