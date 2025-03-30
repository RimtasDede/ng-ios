import 'zone.js';
import '!style-loader!css-loader!sass-loader!./styles.scss';
import { applicationConfig } from '@storybook/angular';

import { appConfig } from './app.config';

export const decorators = [
  applicationConfig(appConfig)
];
