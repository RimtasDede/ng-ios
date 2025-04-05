/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'ios-time',
  imports: [CommonModule],
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeComponent {

  /**
   * Unix time
   */
  datetime = input<number>();

}
