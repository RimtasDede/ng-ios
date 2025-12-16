import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTabsComponent, AppTabComponent, AppTabIconComponent, AppTabLabelComponent } from '@ng-ios/ui';

import { GlobeComponent } from '../icons/globe/globe.component';
import { AlarmComponent } from '../icons/alarm/alarm.component';
import { StopwatchComponent } from '../icons/stopwatch/stopwatch.component';
import { TimersComponent } from '../icons/timers/timers.component';


@Component({
  selector: 'lib-app-clock',
  imports: [
    CommonModule,
    AppTabsComponent,
    AppTabComponent,
    AppTabIconComponent,
    AppTabLabelComponent,
    GlobeComponent,
    AlarmComponent,
    TimersComponent,
    StopwatchComponent,
],
  templateUrl: './app-clock.component.html',
  styleUrl: './app-clock.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppClockComponent {}
