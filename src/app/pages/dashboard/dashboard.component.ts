import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarService } from '../../core/services/navbar-service/navbar.service';

import { MatSidenavModule, MatDrawer } from "@angular/material/sidenav";
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from "@angular/material/list";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CreateAccountDialogComponent } from '../../core/components/create-account-dialog/create-account-dialog/create-account-dialog.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTooltipModule, MatSidenavModule, MatButtonModule, MatListModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  showFiller = false;

  //"!" says certainly drawer will be assigned a value before used.
  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(
    private navBarService: NavbarService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.navBarService.toggleMenuButton$.subscribe(toggleSideNav => {
      if (this.drawer) {
        this.drawer.toggle(toggleSideNav);
      }
    })
    this.navBarService.showMenuButton(true); //emits a new value to showMenuButton$ observable
  }

  openCreateAccountDialog(): void {
    this.dialog.open(CreateAccountDialogComponent, {
      width: '300px',
      data: { /* pass data to the dialog here if needed */ },
      disableClose: true
    });
  }


}
