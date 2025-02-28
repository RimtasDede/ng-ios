import { Component, ElementRef, Renderer2, ViewChild, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TodayViewComponent } from '@ng-ios/today-view';
import { AppLibraryComponent } from '@ng-ios/app-library';
import { LockScreenComponent } from '@ng-ios/lock-screen';
import {
  HomeScreenFavAppsBarComponent,
} from '@ng-ios/ui';

import { PhoneFrameComponent } from './phone-frame';
import { TimeComponent } from './time';
import { BatteryComponent } from './battery';
import { WifiStrComponent } from './wifi-str';
import { SignalStrComponent } from './signal-str';
import { AppsGridComponent } from './apps-grid';
import { IosWallpaperService } from '../../../../libs/ios-services/src/lib/services/ios-wallpaper.service';

@Component({
  imports: [
    RouterModule,
    PhoneFrameComponent,
    HomeScreenFavAppsBarComponent,
    TimeComponent,
    BatteryComponent,
    WifiStrComponent,
    SignalStrComponent,
    AppsGridComponent,
    TodayViewComponent,
    AppLibraryComponent,
    LockScreenComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  private readonly renderer = inject(Renderer2);
  private readonly iosWallpaperService = inject(IosWallpaperService);

  @ViewChild('homeApps') homeApps!: ElementRef;
  @ViewChild(AppsGridComponent) appsGrid!: AppsGridComponent;
  @ViewChild('todayViewBox') todayViewBox!: ElementRef;
  @ViewChild('appLibraryBox') appLibraryBox!: ElementRef;
  @ViewChild('blurOverlay') blurOverlay!: ElementRef;

  constructor() {
    this.iosWallpaperService.active$
      .subscribe(res => {
        const elements = [
          document.querySelector('body'),
          document.querySelector('.screen') as HTMLElement,
          document.querySelector('.lock-screen-box') as HTMLElement,
        ];

        elements.forEach(el => {
          this.renderer.setStyle(el, 'background-image', `url('${res}')`);
        });
      });
  }

  openTodayView(a: any) {
    this.overlayBlur(20, 0.15, true);
    this.scaleHomeApps();

    const todayViewBox = this.todayViewBox.nativeElement as HTMLElement;

    // add swipe animation transition
    todayViewBox.classList.add('today-view-box--transition');

    // remove swipe animation transition after it ends
    todayViewBox.addEventListener('transitionend', function handleTransitionEnd() {
      todayViewBox.classList.remove('today-view-box--transition');
      todayViewBox.removeEventListener('transitionend', handleTransitionEnd);
    });

    todayViewBox.style.transform = 'translateX(100%)';
  }

  closeTodayView(e: any) {
    this.overlayBlur(0, 0, true);
    this.resetScaleHomeApps();

    const todayViewBox = this.todayViewBox.nativeElement as HTMLElement;

    // add swipe animation transition
    todayViewBox.classList.add('today-view-box--transition');

    // remove swipe animation transition after it ends
    todayViewBox.addEventListener('transitionend', function handleTransitionEnd() {
      todayViewBox.classList.remove('today-view-box--transition');
      todayViewBox.removeEventListener('transitionend', handleTransitionEnd);
    });

    todayViewBox.style.transform = 'translateX(0)';
  }


  openAppLibrary(a: any) {
    this.overlayBlur(20, 0.15, true);
    this.scaleHomeApps();

    const appLibraryBox = this.appLibraryBox.nativeElement as HTMLElement;

    // add swipe animation transition
    appLibraryBox.classList.add('app-library-box--transition');

    // remove swipe animation transition after it ends
    appLibraryBox.addEventListener('transitionend', function handleTransitionEnd() {
      appLibraryBox.classList.remove('app-library-box--transition');
      appLibraryBox.removeEventListener('transitionend', handleTransitionEnd);
    });

    appLibraryBox.style.transform = 'translateX(-100%)';
  }

  closeAppLibrary(e: any) {
    this.overlayBlur(0, 0, true);
    this.resetScaleHomeApps();

    const appLibraryBox = this.appLibraryBox.nativeElement as HTMLElement;

    // add swipe animation transition
    appLibraryBox.classList.add('app-library-box--transition');

    // remove swipe animation transition after it ends
    appLibraryBox.addEventListener('transitionend', function handleTransitionEnd() {
      appLibraryBox.classList.remove('app-library-box--transition');
      appLibraryBox.removeEventListener('transitionend', handleTransitionEnd);
    });

    appLibraryBox.style.transform = 'translateX(0)';
  }



  panToTodayView(e: any) {
    // console.log('panToTodayView', e);
  }

  panToAppsSearch(e: any) {}


  private overlayBlur(x: number, opacity: number, useTransition: boolean = false) {
    const blurOverlay = this.blurOverlay.nativeElement as HTMLElement;

    if (useTransition) {
      // add swipe animation transition
      blurOverlay.classList.add('home-blur-overlay--transition');

      // remove swipe animation transition after it ends
      blurOverlay.addEventListener('transitionend', function handleTransitionEnd() {
        blurOverlay.classList.remove('home-blur-overlay--transition');
        blurOverlay.removeEventListener('transitionend', handleTransitionEnd);
      });
    }

    blurOverlay.style.backdropFilter = `blur(${x}px)`;
    blurOverlay.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
  }

  /**
   * Change current page scale
   * @param scale transform: scale() value
   */
  scaleHomeApps(scale: number = 0.94) {
    const activeAppsGridPanel = this.homeApps.nativeElement;

    // add scale animation transition
    activeAppsGridPanel.classList.add('home-apps--transition');

    // remove scale animation transition after it ends
    activeAppsGridPanel.addEventListener('transitionend', function handleTransitionEnd() {
      activeAppsGridPanel.classList.remove('home-apps--transition');
      activeAppsGridPanel.removeEventListener('transitionend', handleTransitionEnd);
    });

    activeAppsGridPanel.style.transform = `scale(${scale})`;
  }

  resetScaleHomeApps() {
    this.scaleHomeApps(1);
  }


}
