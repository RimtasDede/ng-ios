import { AppCategory, Application } from '@ng-ios/types';

import { AppClockComponent, AppClockIconComponent } from '@ng-ios/app-clock';

export const manifest: Application = {
  category: AppCategory.Other,
  label: 'Clock',
  icon: AppClockIconComponent,
  app: AppClockComponent,
};
