/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'icon-timers',
  templateUrl: './timers.component.html',
  styleUrl: './timers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimersComponent {}
