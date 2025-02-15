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

  @ViewChild(AppsGridComponent) appsGrid!: AppsGridComponent;
  @ViewChild('todayViewBox') todayViewBox!: ElementRef;
  @ViewChild('blurOverlay') blurOverlay!: ElementRef;

  openTodayView(a: any) {
    this.overlayBlur(20, 0.15, true);
    this.appsGrid.scaleCurrentPage();

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
    this.appsGrid.resetScaleCurrentPage();

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

  openAppsSearch(a: any) {
    // console.log('After Last Page', a);
  }

  panToTodayView(e: any) {
    // console.log('panToTodayView', e);
  }

  panToAppsSearch(e: any) {}


  private overlayBlur(x: number, opacity: number, useTransition: boolean = false) {
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
    blurOverlay.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
  }

}
