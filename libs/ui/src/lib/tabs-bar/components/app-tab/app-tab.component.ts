/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ios-app-tab',
  imports: [CommonModule],
  templateUrl: './app-tab.component.html',
  styleUrl: './app-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.active]': 'active()',
  },
})
export class AppTabComponent {

  active = input<boolean>(false);

}
