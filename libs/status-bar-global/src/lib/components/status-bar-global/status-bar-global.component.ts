import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { STATUS_BAR_IMPORTS } from '@ng-ios/status-bar';
import { LockScreenBoxComponent, LockScreenService } from '@ng-ios/lock-screen';
import { MoveEvent } from '@ng-ios/touch';
import { IosLockService } from '@ng-ios/ios-services';


@Component({
  selector: 'lib-status-bar-global',
  imports: [
    CommonModule,
    STATUS_BAR_IMPORTS,
    LockScreenBoxComponent,
  ],
  templateUrl: './status-bar-global.component.html',
  styleUrl: './status-bar-global.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBarGlobalComponent {

  private readonly iosLockService = inject(IosLockService);
  private readonly lockScreenService = inject(LockScreenService);

  isLocked = this.iosLockService.isLocked;
  lockScreenDeltaY = 0;

  lockScreenVerticalPan(e: CustomEvent<MoveEvent>) {
    this.lockScreenDeltaY = e.detail.deltaY;
    this.lockScreenService.swipe.set(e.detail);
  }

  lockScreenVerticalPanRelease(e: CustomEvent<MoveEvent>) {
    setTimeout(() => {
      this.lockScreenService.swipe.set(e.detail);
    });
  }

  lockScreenClose() {
    this.lockScreenDeltaY = 0;
  }

  openLockScreen(e: CustomEvent<MoveEvent>) {
    this.lockScreenService.swipe.set(e.detail);
  }

}
