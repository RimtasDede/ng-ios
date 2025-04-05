export * from './lib/directives/battery.directive';
export * from './lib/directives/signal-str.directive';
export * from './lib/directives/time.directive';
export * from './lib/directives/wifi-str.directive';

export * from './lib/components/status-bar/status-bar.component';
export * from './lib/components/status-bar-left/status-bar-left.component';
export * from './lib/components/status-bar-right/status-bar-right.component';

import { StatusBarComponent } from './lib/components/status-bar/status-bar.component';
import { StatusBarLeftComponent } from './lib/components/status-bar-left/status-bar-left.component';
import { StatusBarRightComponent } from './lib/components/status-bar-right/status-bar-right.component';

import { BatteryDirective } from './lib/directives/battery.directive';
import { SignalStrDirective } from './lib/directives/signal-str.directive';
import { TimeDirective } from './lib/directives/time.directive';
import { WifiStrDirective } from './lib/directives/wifi-str.directive';

export const STATUS_BAR_IMPORTS = [
  StatusBarComponent,
  StatusBarLeftComponent,
  StatusBarRightComponent,
  BatteryDirective,
  SignalStrDirective,
  TimeDirective,
  WifiStrDirective,
];
