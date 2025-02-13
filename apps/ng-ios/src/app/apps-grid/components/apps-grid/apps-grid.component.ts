import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Application } from '@ng-ios/application';
import { IosScreenService } from '@ng-ios/ios-services';

import { apps } from './data';


@Component({
  selector: 'app-apps-grid',
  imports: [
    CommonModule,
  ],
  templateUrl: './apps-grid.component.html',
  styleUrl: './apps-grid.component.scss',
})
export class AppsGridComponent {

  iosScreen = inject(IosScreenService);

  applications: Application[][] = apps;
  private totalPages = this.applications.length - 1;
  private currPage = 0;

  @ViewChild('appsGrid') appsGrid!: ElementRef;

  swipeStartX?: number;


  @HostListener('panstart', ['$event'])
  panStart(e: HammerInput) {
    this.swipeStartX = e.center.x;
  }

  @HostListener('panleft', ['$event'])
  panLeft(e: HammerInput) {
    if (!this.swipeStartX) {
      return;
    }

    const pageWidth = this.iosScreen.state().width;
    const x = this.currPage * pageWidth * -1 + e.deltaX;

    // prevent swipe to out of pages
    if (!this.canSwipeApps(x)) {
      return;
    }

    this.appsGrid.nativeElement.style.transform = `translateX(${x}px)`;
  }

  @HostListener('panright', ['$event'])
  panRight(e: HammerInput) {
    if (!this.swipeStartX) {
      return;
    }

    const pageWidth = this.iosScreen.state().width;
    const x = this.currPage * pageWidth * -1 + e.deltaX;

    // prevent swipe to out of pages
    if (!this.canSwipeApps(x)) {
      console.log('pan right', x);
      return;
    }

    this.appsGrid.nativeElement.style.transform = `translateX(${x}px)`;
  }

  @HostListener('panend', ['$event'])
  panEnd(e: HammerInput) {
    if (!this.swipeStartX) {
      return;
    }

    const screenState = this.iosScreen.state();
    const pageWidth = screenState.width;
    const halfPageWidth = pageWidth / 2;
    const appsGrid = this.appsGrid.nativeElement as HTMLElement;
    const move = e.deltaX;
    const x = this.currPage * pageWidth * -1 + e.deltaX;
    const direction = move > 0 ? 1 : -1;

    if (this.canSwipeApps(x)) {
      // add swipe animation transition
      appsGrid.classList.add('apps-grid--transition');

      // remove swite animation transition after it ends
      appsGrid.addEventListener('transitionend', function handleTransitionEnd() {
        appsGrid.classList.remove('apps-grid--transition');
        appsGrid.removeEventListener('transitionend', handleTransitionEnd);
      });
    }

    if (
      Math.abs(move) >= halfPageWidth
      && (
        (this.totalPages === this.currPage && direction > 0)
        || (this.currPage === 0 && direction < 0)
      )
    ) {
      // change page
      const newX = this.currPage * pageWidth * -1 + pageWidth * direction;

      this.currPage -= direction;

      this.appsGrid.nativeElement.style.transform = `translateX(${newX}px)`;
    } else {
      // keep same page
      const newX = this.currPage * pageWidth * -1;

      this.appsGrid.nativeElement.style.transform = `translateX(${newX}px)`;
    }

    this.swipeStartX = undefined;
  }

  @HostListener('swipeLeft', ['$event'])
  swipeLeft(e: HammerInput) {
    this.swipe(e);
  }

  @HostListener('swipeRight', ['$event'])
  swipeRight(e: HammerInput) {
    this.swipe(e);
  }


  openApp(): void {
    console.log('open app event');
  }

  /**
   *
   * @param x Horizontal swipe number in px
   */
  private canSwipeApps(x: number): boolean {
    const pageWidth = this.iosScreen.state().width;

    return x < 0 && x > this.totalPages * pageWidth * -1;
  }

  private swipe(e: HammerInput): void {
    const screenState = this.iosScreen.state();
    const pageWidth = screenState.width;
    const x = this.currPage * pageWidth * -1 + e.deltaX;

    if (!this.canSwipeApps(x)) {
      return;
    }

    const appsGrid = this.appsGrid.nativeElement as HTMLElement;
    const move = e.deltaX;
    const direction = move > 0 ? 1 : -1;

    // add swipe animation transition
    appsGrid.classList.add('apps-grid--transition');

    // remove swite animation transition after it ends
    appsGrid.addEventListener('transitionend', function handleTransitionEnd() {
      appsGrid.classList.remove('apps-grid--transition');
      appsGrid.removeEventListener('transitionend', handleTransitionEnd);
    });

    // change page
    const newX = this.currPage * pageWidth * -1 + pageWidth * direction;

    this.currPage -= direction;

    this.appsGrid.nativeElement.style.transform = `translateX(${newX}px)`;
  }

}
