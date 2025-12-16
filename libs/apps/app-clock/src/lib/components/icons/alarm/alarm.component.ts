/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'icon-alarm',
  templateUrl: './alarm.component.html',
  styleUrl: './alarm.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlarmComponent {}
