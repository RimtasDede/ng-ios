import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IosBatteryService } from '@ng-ios/ios-services';

@Component({
  selector: 'app-battery',
  imports: [
    CommonModule,
  ],
  templateUrl: './battery.component.svg',
  styleUrl: './battery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BatteryComponent {

  private iosBatteryService = inject(IosBatteryService);

  percentage = this.iosBatteryService.percentage;
  isCharging = this.iosBatteryService.isCharging;
  batteryPx = computed(() => this.percentageToPx(this.percentage()));

  private percentageToPx(percent: number): number {
    const marginLeft = 125;
    const marginRight = 236;

    return (1024 - marginLeft - marginRight) / 100 * percent + marginLeft;
  }

}
