/* eslint-disable @angular-eslint/directive-selector */
import { computed, Directive, inject } from '@angular/core';

import { IosSignalService } from '@ng-ios/ios-services';
import { SignalStrComponent } from '@ng-ios/ui';


/**
 * Automatically set value to ios-signal-str component
 */
@Directive({
  selector: 'ios-signal-str',
})
export class SignalStrDirective {

  private host = inject(SignalStrComponent);
  private iosSignalService = inject(IosSignalService);

  constructor() {
    this.host.value = computed(() => this.iosSignalService.signalStrength()) as any;
  }

}
