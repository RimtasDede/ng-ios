import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-battery',
  imports: [CommonModule],
  templateUrl: './battery.component.svg',
  styleUrl: './battery.component.scss',
})
export class BatteryComponent {

  percentage = 19;
  batteryPx = this.percentageToPx(this.percentage);

  private percentageToPx(percent: number): number {
    const marginLeft = 125;
    const marginRight = 236;

    return (1024 - marginLeft - marginRight) / 100 * percent + marginLeft;
  }

}
