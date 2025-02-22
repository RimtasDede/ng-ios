import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IosSignalService } from '@ng-ios/ios-services';

@Component({
  selector: 'app-signal-str',
  imports: [
    CommonModule,
  ],
  templateUrl: './signal-str.component.svg',
  styleUrl: './signal-str.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalStrComponent {

  private readonly iosSignalService = inject(IosSignalService);

  signalStr = this.iosSignalService.signalStrength;

}
