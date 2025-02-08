import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule, HammerModule } from '@angular/platform-browser';

// import 'hammerjs';

@Component({
  selector: 'lib-home-screen-fav-apps-bar',
  imports: [
    CommonModule,
    // HammerModule,
  ],
  templateUrl: './home-screen-fav-apps-bar.component.html',
  styleUrl: './home-screen-fav-apps-bar.component.css',
})
export class HomeScreenFavAppsBarComponent {

  apps = [
    {},
    {},
    {},
    {},
  ];

  openContextMenu(e: any): void {
    console.log('openContextMenu event', e);
  }

}
