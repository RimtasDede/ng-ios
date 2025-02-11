import { Provider } from '@angular/core';

import { IosBatteryService } from './lib/services/ios-battery.service';

export { IosBatteryService };

export const IOS_SERVICE_PROVIDERS: Provider[] = [
  IosBatteryService,
];
