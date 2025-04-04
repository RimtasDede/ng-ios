import { ApplicationConfig, importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HammerModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAngularSvgIcon } from 'angular-svg-icon';

import { DocumentVisibilityService } from '@ng-ios/utility';
import { TOUCH_PROVIDERS } from '@ng-ios/touch';
import { IOS_SERVICE_PROVIDERS } from '@ng-ios/ios-services';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(HammerModule),
    provideAngularSvgIcon(),
    DocumentVisibilityService,
    ...IOS_SERVICE_PROVIDERS,
    ...TOUCH_PROVIDERS,
  ],
};
