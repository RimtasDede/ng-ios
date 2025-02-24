import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';

import { IosDateTimeService, IosLockService } from '@ng-ios/ios-services';

@Component({
  selector: 'lib-lock-screen',
  imports: [
    CommonModule,
    SvgIconComponent,
  ],
  templateUrl: './lock-screen.component.html',
  styleUrl: './lock-screen.component.scss',
})
export class LockScreenComponent {

  private readonly iosDateTimeService = inject(IosDateTimeService);
  private readonly iosLockService = inject(IosLockService);

  isLocked = this.iosLockService.isLocked;
  datetime = this.iosDateTimeService.datetime;

}
