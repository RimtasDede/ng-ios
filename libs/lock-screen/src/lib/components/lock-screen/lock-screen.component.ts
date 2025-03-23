import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeIndicatorComponent } from '@ng-ios/ui';
import { MoveEvent } from '@ng-ios/touch';

import { LockScreenPanelComponent } from '../lock-screen-panel/lock-screen-panel.component';
import { UnlockScreenPanelComponent } from '../unlock-screen-panel/unlock-screen-panel.component';

const UNLOCK_SWIPE_DELTAY_BP = -28;

@Component({
  selector: 'lib-lock-screen',
  imports: [
    CommonModule,
    LockScreenPanelComponent,
    UnlockScreenPanelComponent,
    HomeIndicatorComponent,
  ],
  templateUrl: './lock-screen.component.html',
  styleUrl: './lock-screen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LockScreenComponent {

  @ViewChild('wpBox') wpBox!: ElementRef<HTMLElement>;

  private readonly renderer = inject(Renderer2);

  displayUnlock = false;

  hideUnlock() {
    this.displayUnlock = false;
  }

  showUnlock() {
    this.displayUnlock = true;
  }

  homeIndicatorPanUp(e: CustomEvent<MoveEvent>) {
    const deltaY = e.detail.deltaY;

    // over bp
    if (deltaY < UNLOCK_SWIPE_DELTAY_BP) {
      this.resetPanUpState(0);
      this.showUnlock();
    } else {
      const el = this.wpBox.nativeElement;

      this.renderer.setStyle(el, 'transform', `translateY(${deltaY}px)`);
    }
  }

  resetPanUpState(e: any) {
    const el = this.wpBox.nativeElement;

    this.renderer.removeStyle(el, 'transform');
  }

}
