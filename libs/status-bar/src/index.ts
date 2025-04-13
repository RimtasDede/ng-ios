export * from './lib/components/status-bar/status-bar.component';
export * from './lib/components/status-bar-left/status-bar-left.component';
export * from './lib/components/status-bar-right/status-bar-right.component';
export * from './lib/components/status-bar-battery/status-bar-battery.component';
export * from './lib/components/status-bar-signal-str/status-bar-signal-str.component';
export * from './lib/components/status-bar-time/status-bar-time.component';
export * from './lib/components/status-bar-wifi-str/status-bar-wifi-str.component';

import { StatusBarComponent } from './lib/components/status-bar/status-bar.component';
import { StatusBarLeftComponent } from './lib/components/status-bar-left/status-bar-left.component';
import { StatusBarRightComponent } from './lib/components/status-bar-right/status-bar-right.component';
import { StatusBarBatteryComponent } from './lib/components/status-bar-battery/status-bar-battery.component';
import { StatusBarSignalStrComponent } from './lib/components/status-bar-signal-str/status-bar-signal-str.component';
import { StatusBarTimeComponent } from './lib/components/status-bar-time/status-bar-time.component';
import { StatusBarWifiStrComponent } from './lib/components/status-bar-wifi-str/status-bar-wifi-str.component';

export const STATUS_BAR_IMPORTS = [
  StatusBarComponent,
  StatusBarLeftComponent,
  StatusBarRightComponent,
  StatusBarBatteryComponent,
  StatusBarSignalStrComponent,
  StatusBarTimeComponent,
  StatusBarWifiStrComponent,
];
