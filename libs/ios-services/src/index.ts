import { StateManagerComponent } from './lib/components/state-manager/state-manager.component';

import { WallpaperDirective } from './lib/directives/wallpaper/wallpaper.directive';

import { IosBatteryService } from './lib/services/ios-battery.service';
import { IosCommonService } from './lib/services/ios-common.service';
import { IosDateTimeService } from './lib/services/ios-date-time.service';
import { IosInstalledAppsService } from './lib/services/ios-installed-apps.service';
import { IosLockService, PassCode } from './lib/services/ios-lock.service';
import { IosScreenService } from './lib/services/ios-screen.service';
import { IosSignalService } from './lib/services/ios-signal.service';
import { IosWallpaperService } from './lib/services/ios-wallpaper.service';
import { IosWifiService } from './lib/services/ios-wifi.service';


export * from './lib/providers';

export {
  StateManagerComponent,

  WallpaperDirective,
  IosBatteryService,
  IosCommonService,
  IosDateTimeService,
  IosInstalledAppsService,
  IosLockService,
  IosScreenService,
  IosSignalService,
  IosWallpaperService,
  IosWifiService,

  PassCode,
};
