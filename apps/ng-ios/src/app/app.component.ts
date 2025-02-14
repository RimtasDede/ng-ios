import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IOS_SERVICE_PROVIDERS } from '@ng-ios/ios-services';
import { DocumentVisibilityService } from '@ng-ios/utility';
import { TodayViewComponent } from '@ng-ios/today-view';
import {
  HomeScreenFavAppsBarComponent,
} from '@ng-ios/ui';

import { PhoneFrameComponent } from './phone-frame';
import { TimeComponent } from './time';
import { BatteryComponent } from './battery';
import { AppsGridComponent } from './apps-grid';

@Component({
  imports: [
    RouterModule,
    PhoneFrameComponent,
    HomeScreenFavAppsBarComponent,
    TimeComponent,
    BatteryComponent,
    AppsGridComponent,
    TodayViewComponent,
  ],
  providers: [
    ...IOS_SERVICE_PROVIDERS,
    DocumentVisibilityService,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  @ViewChild('todayViewBox') todayViewBox!: ElementRef;
  @ViewChild('blurOverlay') blurOverlay!: ElementRef;

  openTodayView(a: any) {
    console.log('Before First Page', a);

    this.overlayBlur(20, true);

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

  openAppsSearch(a: any) {
    console.log('After Last Page', a);
  }

  panToTodayView(e: any) {
    console.log('panToTodayView', e);
  }

  panToAppsSearch(e: any) {}


  private overlayBlur(x: number, useTransition: boolean = false) {
    const blurOverlay = this.blurOverlay.nativeElement as HTMLElement;

    if (useTransition) {
      // add swipe animation transition
      blurOverlay.classList.add('home-grid-blur-overlay--transition');

      // remove swipe animation transition after it ends
      blurOverlay.addEventListener('transitionend', function handleTransitionEnd() {
        blurOverlay.classList.remove('home-grid-blur-overlay--transition');
        blurOverlay.removeEventListener('transitionend', handleTransitionEnd);
      });
    }

    blurOverlay.style.backdropFilter = `blur(${x}px)`;
  }

}
