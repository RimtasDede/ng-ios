export * from './lib/directives/pan-up.directive';

export * from './lib/directives/press.directive';
export * from './lib/directives/press-ani.directive';

import { TouchService } from './lib/services/touch.service';

export const TOUCH_PROVIDERS = [
  TouchService,
];
