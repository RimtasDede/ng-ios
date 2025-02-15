import { Component, ElementRef, EventEmitter, HostListener, inject, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
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

  @Output() swipeBeforeFirstPage = new EventEmitter<any>();
  @Output() swipeAfterLastPage = new EventEmitter<any>();
  @Output() panBeforeFirstPage = new EventEmitter<any>();
  @Output() panAfterLastPage = new EventEmitter<any>();

  iosScreen = inject(IosScreenService);

  applications: Application[][] = apps;
  private totalPages = this.applications.length - 1;
  private currPage = 0;

  @ViewChild('appsGrid') appsGrid!: ElementRef;
  @ViewChildren('appsGridPanel') appsGridPanels!: QueryList<ElementRef>;

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
      this.panAfterLastPage.emit(e);

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
      this.panBeforeFirstPage.emit(e);

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

      appsGrid.style.transform = `translateX(${newX}px)`;
    } else {
      // keep same page
      const newX = this.currPage * pageWidth * -1;

      appsGrid.style.transform = `translateX(${newX}px)`;
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
    const move = e.deltaX;
    const direction = move > 0 ? 1 : -1;

    if (!this.canSwipeApps(x)) {
      if (direction === 1) {
        this.swipeBeforeFirstPage.emit();

        const activeAppsGridPanel = this.appsGridPanels.get(this.currPage)!.nativeElement;

        // add scale animation transition
        activeAppsGridPanel.classList.add('apps-grid__panel--transition');

        // remove scale animation transition after it ends
        activeAppsGridPanel.addEventListener('transitionend', function handleTransitionEnd() {
          activeAppsGridPanel.classList.remove('apps-grid__panel--transition');
          activeAppsGridPanel.removeEventListener('transitionend', handleTransitionEnd);
        });

        activeAppsGridPanel.style.transform = 'scale(0.94)';
      } else {
        this.swipeAfterLastPage.emit();
      }

      return;
    }

    const appsGrid = this.appsGrid.nativeElement as HTMLElement;

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

    appsGrid.style.transform = `translateX(${newX}px)`;
  }

  /**
   * Change current page scale
   * @param scale transform: scale() value
   */
  scaleCurrentPage(scale: number = 0.94) {
    const activeAppsGridPanel = this.appsGridPanels.get(this.currPage)!.nativeElement;

    // add scale animation transition
    activeAppsGridPanel.classList.add('apps-grid__panel--transition');

    // remove scale animation transition after it ends
    activeAppsGridPanel.addEventListener('transitionend', function handleTransitionEnd() {
      activeAppsGridPanel.classList.remove('apps-grid__panel--transition');
      activeAppsGridPanel.removeEventListener('transitionend', handleTransitionEnd);
    });

    activeAppsGridPanel.style.transform = `scale(${scale})`;
  }

  resetScaleCurrentPage() {
    this.scaleCurrentPage(1);
  }

}
