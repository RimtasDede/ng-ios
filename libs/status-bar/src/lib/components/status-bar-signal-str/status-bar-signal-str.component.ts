import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignalStrComponent } from '@ng-ios/ui';
import { IosSignalService } from '@ng-ios/ios-services';


@Component({
  selector: 'lib-status-bar-signal-str',
  imports: [
    CommonModule,
    SignalStrComponent,
  ],
  templateUrl: './status-bar-signal-str.component.html',
  styleUrl: './status-bar-signal-str.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBarSignalStrComponent {

  private readonly iosSignalService = inject(IosSignalService);

  signalStrength = this.iosSignalService.signalStrength;

}
