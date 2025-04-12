import { ChangeDetectionStrategy, Component, ElementRef, inject, Renderer2, signal, computed, viewChild, input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, group, query, style, transition, trigger } from '@angular/animations';

import { IosScreenService, IosWallpaperService } from '@ng-ios/ios-services';
import { BatteryComponent, HomeIndicatorComponent, SignalStrComponent, SliderComponent, SliderSlideDirective, TimeComponent, WifiStrComponent } from '@ng-ios/ui';
import { animateChildAnimation, delayedInAnimation, renderFadeInOutAnimation } from '@ng-ios/animations';
import { MoveEvent } from '@ng-ios/touch';
import { STATUS_BAR_IMPORTS } from '@ng-ios/status-bar';

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
    STATUS_BAR_IMPORTS,
    TimeComponent,
    SignalStrComponent,
    WifiStrComponent,
    BatteryComponent,
  ],
  templateUrl: './lock-screen.component.html',
  styleUrl: './lock-screen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    animateChildAnimation(),
    renderFadeInOutAnimation('250ms'),
    delayedInAnimation('250ms'),

    trigger('renderScaleInOut', [
      transition(':enter', [
        group([
          style({ scale: 1 / 0.7 }),
          animate(
            '250ms ease-out',
            style({ scale: 1 }),
          ),
          query(
            'lib-home-indicator',
            [
              style({
                opacity: 1,
              }),
              animate(
                '250ms',
                style({
                  opacity: 0,
                })
              )
            ]
          ),
        ]),
      ]),
      transition(':leave', [
        group([
          animate(
            '250ms ease-out',
            style({ scale: 1 / 0.7 }),
          ),
          query(
            'lib-home-indicator',
            [
              style({
                opacity: 0,
              }),
              animate(
                '250ms',
                style({
                  opacity: 1,
                })
              )
            ]
          ),
        ]),
      ]),
    ]),
  ],
  host: {
    '[@.disabled]': 'disableAnimations',
    '[@animateChild]': 'true',
    '[class.in-transition]': 'inTransition()',
  },
})
export class LockScreenComponent implements AfterViewInit {

  /**
   * Is in transition and some content should not be rendered
   */
  inTransition = input<boolean>(false);


  private readonly renderer = inject(Renderer2);
  private readonly iosScreenService = inject(IosScreenService);
  private readonly iosWallpaperService = inject(IosWallpaperService);

  private screenBox = viewChild<ElementRef<HTMLElement>>('screenBox');

  disableAnimations = true;
  screenWidth = this.iosScreenService.width;
  screenHeight = this.iosScreenService.height;
  displayUnlock = false;
  wallpapers = this.iosWallpaperService.all;
  activeWallpaper = this.iosWallpaperService.active;
  activeWallpaperIndex = computed(() => this.wallpapers().findIndex(val => val === this.iosWallpaperService.active()));
  customizationMode = signal<boolean>(false);


  ngAfterViewInit(): void {
    this.disableAnimations = false;
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
      const el = this.screenBox()?.nativeElement;

      this.renderer.setStyle(el, 'transform', `translateY(${deltaY}px)`);
    }
  }

  resetPanUpState(e: any) {
    const el = this.screenBox()?.nativeElement;

    this.renderer.removeStyle(el, 'transform');
  }

  enterCustomizationMode() {
    this.customizationMode.set(true);
  }

  leaveCustomizationMode(wallpaper: string) {
    this.customizationMode.set(false);

    this.iosWallpaperService.active.set(wallpaper);
  }

}
