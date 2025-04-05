/* eslint-disable @angular-eslint/directive-selector */
import { computed, Directive, inject } from '@angular/core';

import { IosWifiService } from '@ng-ios/ios-services';
import { WifiStrComponent } from '@ng-ios/ui';


@Directive({
  selector: 'ios-wifi-str',
})
export class WifiStrDirective {

  private host = inject(WifiStrComponent);
  private iosWifiService = inject(IosWifiService);

  constructor() {
    this.host.value = computed(() => this.iosWifiService.signalStrength()) as any;
  }

}
