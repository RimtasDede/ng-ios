/* eslint-disable @angular-eslint/directive-selector */
import { computed, Directive, inject } from '@angular/core';

import { IosBatteryService } from '@ng-ios/ios-services';
import { BatteryComponent } from '@ng-ios/ui';


@Directive({
  selector: 'ios-battery',
})
export class BatteryDirective {

  private host = inject(BatteryComponent);
  private iosBatteryService = inject(IosBatteryService);

  constructor() {
    this.host.percentage = computed(() => this.iosBatteryService.percentage()) as any;
    this.host.isCharging = computed(() => this.iosBatteryService.isCharging()) as any;
  }

}
