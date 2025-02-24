import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';

import { IosDateTimeService, IosLockService } from '@ng-ios/ios-services';

@Component({
  selector: 'lib-lock-screen-panel',
  imports: [
    CommonModule,
    SvgIconComponent,
  ],
  templateUrl: './lock-screen-panel.component.html',
  styleUrl: './lock-screen-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LockScreenPanelComponent {

  private readonly iosDateTimeService = inject(IosDateTimeService);
  private readonly iosLockService = inject(IosLockService);

  isLocked = this.iosLockService.isLocked;
  datetime = this.iosDateTimeService.datetime;

}
