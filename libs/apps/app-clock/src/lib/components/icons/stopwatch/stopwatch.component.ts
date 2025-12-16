/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'icon-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrl: './stopwatch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StopwatchComponent {}
