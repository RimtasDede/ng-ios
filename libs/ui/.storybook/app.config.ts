import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { TOUCH_PROVIDERS } from '@ng-ios/touch';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideHttpClient(),
    // provideAngularSvgIcon(),
    ...TOUCH_PROVIDERS,
  ],
};
