import { Provider } from '@angular/core';

import { IosBatteryService } from './lib/services/ios-battery.service';
import { IosDateTimeService } from './lib/services/ios-date-time.service';
import { IosScreenService } from './lib/services/ios-screen.service';
import { IosSignalService } from './lib/services/ios-signal.service';
import { IosWallpaperService } from './lib/services/ios-wallpaper.service';
import { IosWifiService } from './lib/services/ios-wifi.service';

export {
  IosBatteryService,
  IosDateTimeService,
  IosScreenService,
  IosSignalService,
  IosWallpaperService,
  IosWifiService,
};

export const IOS_SERVICE_PROVIDERS: Provider[] = [
  IosBatteryService,
  IosDateTimeService,
  IosScreenService,
  IosSignalService,
  IosWallpaperService,
  IosWifiService,
];
