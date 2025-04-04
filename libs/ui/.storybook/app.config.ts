import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { TOUCH_PROVIDERS } from '@ng-ios/touch';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideAnimations(),
    provideHttpClient(),
    // provideAngularSvgIcon(),
    ...TOUCH_PROVIDERS,
  ],
};
