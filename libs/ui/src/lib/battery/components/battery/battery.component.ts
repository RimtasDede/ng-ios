/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'ios-battery',
  imports: [CommonModule],
  templateUrl: './battery.component.html',
  styleUrl: './battery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BatteryComponent {

  /**
   * Battery percentage (0-100)
   */
  percentage = input(0, {
    transform: (value: number) => Math.max(0, Math.min(100, value))
  });

  /**
   * Is battery charging
   */
  isCharging = input<boolean>(false);

  batteryColorClass = computed(() => {
    if (this.isCharging()) {
      return 'battery-charging';
    }

    return this.percentage() > 20
      ? 'battery-regular'
      : 'battery-low';
  });
  batteryPx = computed(() => this.percentageToPx(this.percentage()));

  private percentageToPx(percent: number): number {
    const marginLeft = 125;
    const marginRight = 234;

    return (1024 - marginLeft - marginRight) / 100 * percent + marginLeft;
  }

}
