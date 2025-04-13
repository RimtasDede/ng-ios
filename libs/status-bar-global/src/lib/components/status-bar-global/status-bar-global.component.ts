import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { STATUS_BAR_IMPORTS } from '@ng-ios/status-bar';
import { LockScreenBoxComponent } from '@ng-ios/lock-screen';
import { MoveEvent } from '@ng-ios/touch';


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

  lockScreenDeltaY?: number;
  lockScreenReleaseDeltaY?: number;


  lockScreenVerticalPan(e: CustomEvent<MoveEvent>) {
    this.lockScreenDeltaY = e.detail.deltaY;
  }

  lockScreenVerticalPanRelease(e: CustomEvent<MoveEvent>) {
    this.lockScreenReleaseDeltaY = e.detail.deltaY;
  }

  lockScreenClose() {
    this.lockScreenDeltaY = undefined;
    this.lockScreenReleaseDeltaY = undefined;
  }

}
