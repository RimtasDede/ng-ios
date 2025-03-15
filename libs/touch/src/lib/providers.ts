import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

import { TouchService } from './services/touch.service';
import { TouchEventManagerService } from './services/touch-event-manager.service';
import { TouchOptionsDirective } from './directives/touch-options.directive';

/**
 * All global Touch gestures providers.
 * Should be imported only once in root config.
 */
export const TOUCH_PROVIDERS = [
  // provideAppInitializer(() => {
  //   inject(TouchService);
  //   console.log('Touch initialized');
  // }),
  {
    multi: true,
    provide: EVENT_MANAGER_PLUGINS,
    useClass: TouchEventManagerService,
  },
  TouchService,
  TouchOptionsDirective,
];
