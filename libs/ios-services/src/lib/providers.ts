import { Provider } from '@angular/core';

import { IosBatteryService } from './services/ios-battery.service';
import { IosCommonService } from './services/ios-common.service';
import { IosDateTimeService } from './services/ios-date-time.service';
import { IosInstalledAppsService } from './services/ios-installed-apps.service';
import { IosLockService } from './services/ios-lock.service';
import { IosScreenService } from './services/ios-screen.service';
import { IosSignalService } from './services/ios-signal.service';
import { IosWallpaperService } from './services/ios-wallpaper.service';
import { IosWifiService } from './services/ios-wifi.service';


export const IOS_SERVICE_PROVIDERS: Provider[] = [
  IosBatteryService,
  IosCommonService,
  IosDateTimeService,
  IosInstalledAppsService,
  IosLockService,
  IosScreenService,
  IosSignalService,
  IosWallpaperService,
  IosWifiService,
];
