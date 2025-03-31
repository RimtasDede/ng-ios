import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject, Renderer2, Input, signal, computed, viewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
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
  },
})
export class LockScreenComponent implements AfterViewChecked {

  /**
   * Is in transition and some content should not be rendered
   */
  @Input() inTransition = false;


  private readonly renderer = inject(Renderer2);
  private readonly cd = inject(ChangeDetectorRef);
  private readonly iosScreenService = inject(IosScreenService);
  private readonly iosWallpaperService = inject(IosWallpaperService);

  @ViewChild('wpBox') wpBox!: ElementRef<HTMLElement>;
  private slider = viewChild('slider', { read: ElementRef });

  screen = this.iosScreenService.state;
  displayUnlock = false;
  displayLockScreen = true;
  wallpapers = this.iosWallpaperService.all;
  activeWallpaper = this.iosWallpaperService.active;
  activeWallpaperIndex = computed(() => this.wallpapers().findIndex(val => val === this.iosWallpaperService.active()));
  customizationMode = signal<boolean>(false);

  ngAfterViewChecked(): void {
  }


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
    const isCurrCustomizationMode = this.customizationMode();

    if (isCurrCustomizationMode) { // close customization mode
      const listener = this.renderer.listen(this.slider()?.nativeElement, 'transitionend', () => {
        this.customizationMode.set(false);
        listener();
      });

      this.renderer.setStyle(this.slider()?.nativeElement, 'scale', 1 / 0.7);
    } else { // open customization mode
      this.customizationMode.set(true);
      this.cd.detectChanges();

      this.renderer.setStyle(this.slider()?.nativeElement, 'scale', '1');
    }
  }

  enterCustomizationMode() {
    this.customizationMode.set(true);
    this.cd.detectChanges();

    this.renderer.setStyle(this.slider()?.nativeElement, 'scale', '1');
  }

  leaveCustomizationMode(wallpaper: string) {
    const listener = this.renderer.listen(this.slider()?.nativeElement, 'transitionend', () => {
      this.customizationMode.set(false);
      listener();
    });

    this.iosWallpaperService.active.set(wallpaper);
    this.renderer.setStyle(this.slider()?.nativeElement, 'scale', 1 / 0.7);
  }

}
