import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatteryComponent } from '@ng-ios/ui';
import { IosBatteryService } from '@ng-ios/ios-services';


@Component({
  selector: 'lib-status-bar-battery',
  imports: [
    CommonModule,
    BatteryComponent,
  ],
  templateUrl: './status-bar-battery.component.html',
  styleUrl: './status-bar-battery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBarBatteryComponent {

  private readonly iosBatteryService = inject(IosBatteryService);

  percentage = this.iosBatteryService.percentage;
  isCharging = this.iosBatteryService.isCharging;

}
