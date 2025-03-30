import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject, Renderer2, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeIndicatorComponent, SliderComponent, SliderSlideDirective } from '@ng-ios/ui';
import { MoveEvent } from '@ng-ios/touch';
import { IosScreenService, IosWallpaperService } from '@ng-ios/ios-services';

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
    SliderComponent,
    SliderSlideDirective,
  ],
  templateUrl: './lock-screen.component.html',
  styleUrl: './lock-screen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.in-transition]': 'inTransition',
    '[class.in-customization-mode]': 'customizationMode()',
    '[class.is-customization-mode-toggled]': 'customizationModeToggled',
  },
})
export class LockScreenComponent {

  /**
   * Is in transition and some content should not be rendered
   */
  @Input() inTransition = false;

  @ViewChild('wpBox') wpBox!: ElementRef<HTMLElement>;

  private readonly renderer = inject(Renderer2);
  private readonly iosScreenService = inject(IosScreenService);
  private readonly iosWallpaperService = inject(IosWallpaperService);

  screen = this.iosScreenService.state;
  displayUnlock = false;
  wallpapers = this.iosWallpaperService.all;
  activeWallpaper = computed(() => this.wallpapers().findIndex(val => val === this.iosWallpaperService.active()));
  customizationMode = signal<boolean>(true);
  customizationModeToggled = false;

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

  toggleCustomizationMode() {
    this.customizationMode.set(!this.customizationMode());
    this.customizationModeToggled = true;
  }

}
