import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WifiStrComponent } from '@ng-ios/ui';
import { IosWifiService } from '@ng-ios/ios-services';


@Component({
  selector: 'lib-status-bar-wifi-str',
  imports: [
    CommonModule,
    WifiStrComponent,
  ],
  templateUrl: './status-bar-wifi-str.component.html',
  styleUrl: './status-bar-wifi-str.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBarWifiStrComponent {

  private readonly iosWifiService = inject(IosWifiService);

  signalStrength = this.iosWifiService.signalStrength;

}
