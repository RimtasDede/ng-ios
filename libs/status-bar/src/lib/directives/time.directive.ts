/* eslint-disable @angular-eslint/directive-selector */
import { computed, Directive, inject } from '@angular/core';

import { IosDateTimeService } from '@ng-ios/ios-services';
import { TimeComponent } from '@ng-ios/ui';


/**
 * Automatically set value to ios-time component
 */
@Directive({
  selector: 'ios-time',
})
export class TimeDirective {

  private host = inject(TimeComponent);
  private iosDateTimeService = inject(IosDateTimeService);

  constructor() {
    this.host.datetime = computed(() => this.iosDateTimeService.datetime()) as any;
  }

}
