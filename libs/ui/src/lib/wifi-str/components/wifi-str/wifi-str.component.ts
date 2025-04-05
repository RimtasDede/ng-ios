/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'ios-wifi-str',
  imports: [CommonModule],
  templateUrl: './wifi-str.component.html',
  styleUrl: './wifi-str.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WifiStrComponent {

  /**
   * Wifi strength value (0-3)
   */
  value = input<number>(0);

}
