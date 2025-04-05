/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'ios-signal-str',
  imports: [CommonModule],
  templateUrl: './signal-str.component.html',
  styleUrl: './signal-str.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalStrComponent {

  /**
   * Signal strength value (0-4)
   */
  value = input<number>(0);

}
