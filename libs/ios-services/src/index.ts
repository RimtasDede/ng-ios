import { Provider } from '@angular/core';

import { IosBatteryService } from './lib/services/ios-battery.service';
import { IosCommonService } from './lib/services/ios-common.service';
import { IosDateTimeService } from './lib/services/ios-date-time.service';
import { IosLockService, PassCode } from './lib/services/ios-lock.service';
import { IosScreenService } from './lib/services/ios-screen.service';
import { IosSignalService } from './lib/services/ios-signal.service';
import { IosWallpaperService } from './lib/services/ios-wallpaper.service';
import { IosWifiService } from './lib/services/ios-wifi.service';

export {
  IosBatteryService,
  IosCommonService,
  IosDateTimeService,
  IosLockService,
  IosScreenService,
  IosSignalService,
  IosWallpaperService,
  IosWifiService,

  PassCode,
};

export const IOS_SERVICE_PROVIDERS: Provider[] = [
  IosBatteryService,
  IosCommonService,
  IosDateTimeService,
  IosLockService,
  IosScreenService,
  IosSignalService,
  IosWallpaperService,
  IosWifiService,
];
