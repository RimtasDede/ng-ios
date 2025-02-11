import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DocumentVisibilityService } from '@ng-ios/utility';
import {
  HomeScreenFavAppsBarComponent,
} from '@ng-ios/ui';

import { PhoneFrameComponent } from './phone-frame';
import { TimeComponent } from './time';
import { BatteryComponent } from './battery';
import { AppsGridComponent } from './apps-grid';

@Component({
  imports: [
    RouterModule,
    PhoneFrameComponent,
    HomeScreenFavAppsBarComponent,
    TimeComponent,
    BatteryComponent,
    AppsGridComponent,
  ],
  providers: [
    DocumentVisibilityService,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

}
