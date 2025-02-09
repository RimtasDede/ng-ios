import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  HomeScreenFavAppsBarComponent,
} from '@ng-ios/ui';

import { PhoneFrameComponent } from './phone-frame';
import { TimeComponent } from './time';

@Component({
  imports: [
    RouterModule,
    PhoneFrameComponent,
    HomeScreenFavAppsBarComponent,
    TimeComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
}
