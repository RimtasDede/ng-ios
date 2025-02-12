import { Provider } from '@angular/core';

import { IosBatteryService } from './lib/services/ios-battery.service';
import { IosDateTimeService } from './lib/services/ios-date-time.service';

export {
  IosBatteryService,
  IosDateTimeService,
};

export const IOS_SERVICE_PROVIDERS: Provider[] = [
  IosBatteryService,
  IosDateTimeService,
];
