import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeIndicatorComponent } from '@ng-ios/ui';
import { PanUpDirective } from '@ng-ios/touch';
import { LockScreenPanelComponent } from '../lock-screen-panel/lock-screen-panel.component';
import { UnlockScreenPanelComponent } from '../unlock-screen-panel/unlock-screen-panel.component';

@Component({
  selector: 'lib-lock-screen',
  imports: [
    CommonModule,
    LockScreenPanelComponent,
    UnlockScreenPanelComponent,
    HomeIndicatorComponent,
    PanUpDirective,
  ],
  templateUrl: './lock-screen.component.html',
  styleUrl: './lock-screen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LockScreenComponent {

  // @HostListener('panstart', ['$event'])
  // pan1(e: any) {
  //   console.log('pan start', e.distance);
  // }


  // @HostListener('panleft', ['$event'])
  // pan2(e: any) {
  //   console.log('pan', e.velocityX);
  // }

  @HostListener('m-panup', ['$event'])
  mPanUp(e: any) {
    console.log('m-panup', e);
  }


  displayUnlock = false;

  hideUnlock() {
    this.displayUnlock = false;
  }

  showUnlock() {
    this.displayUnlock = true;
  }

  homeIndicatorPanUp(e: any) {
    console.log('m-panup velocity', e.velocityY);
  }

}
