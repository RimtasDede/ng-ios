import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IosWifiService } from '@ng-ios/ios-services';

@Component({
  selector: 'app-wifi-str',
  imports: [
    CommonModule,
  ],
  templateUrl: './wifi-str.component.svg',
  styleUrl: './wifi-str.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WifiStrComponent {

  private readonly iosWifiService = inject(IosWifiService);

  wifiStr = this.iosWifiService.signalStrength;

}
