import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Application } from '@ng-ios/application';

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

  applications: Application[][] = apps;
  private totalPages = this.applications.length - 1;
  private currPage = 0;

  @ViewChild('appsGrid') appsGrid!: ElementRef;

  swipeStartX?: number;


  @HostListener('panstart', ['$event'])
  panStart(e: any) {
    this.swipeStartX = e.center.x;
  }

  @HostListener('panleft', ['$event'])
  panLeft(e: any) {
    if (!this.swipeStartX) {
      return;
    }

    const pageWidth = this.getPhoneScreenSize().width;
    const x = this.currPage * pageWidth * -1 + e.center.x - this.swipeStartX;

    this.appsGrid.nativeElement.style.transform = `translateX(${x}px)`;
  }

  @HostListener('panright', ['$event'])
  panRight(e: any) {
    if (!this.swipeStartX) {
      return;
    }

    const pageWidth = this.getPhoneScreenSize().width;
    const x = this.currPage * pageWidth * -1 + e.center.x - this.swipeStartX;

    this.appsGrid.nativeElement.style.transform = `translateX(${x}px)`;
  }

  @HostListener('panend', ['$event'])
  panEnd(e: any) {
    if (!this.swipeStartX) {
      return;
    }

    const appsGrid = this.appsGrid.nativeElement as HTMLElement;
    const pageWidth = this.getPhoneScreenSize().width;
    const halfPageWidth = pageWidth / 2;
    const move = e.center.x - this.swipeStartX;
    const direction = move > 0 ? 1 : -1;

    // add swipe animation transition
    appsGrid.classList.add('apps-grid--transition');

    // remove swite animation transition after it ends
    appsGrid.addEventListener('transitionend', function handleTransitionEnd() {
      appsGrid.classList.remove('apps-grid--transition');
      appsGrid.removeEventListener('transitionend', handleTransitionEnd);
    });

    if (
      Math.abs(move) >= halfPageWidth
      && (
        (this.totalPages === this.currPage && direction > 0)
        || (this.currPage === 0 && direction < 0)
      )
    ) {
      // change page
      const x = this.currPage * pageWidth * -1 + pageWidth * direction;

      this.currPage -= direction;

      this.appsGrid.nativeElement.style.transform = `translateX(${x}px)`;
    } else {
      // keep same page
      const x = this.currPage * pageWidth * -1;

      this.appsGrid.nativeElement.style.transform = `translateX(${x}px)`;
    }

    this.swipeStartX = undefined;
  }


  openApp(): void {
    console.log('open app event');
  }

  private getPhoneScreenSize(): { width: number, height: number } {
    const phoneFrame = document.getElementById('phone-frame') as HTMLElement;

    return {
      width: phoneFrame.offsetWidth,
      height: phoneFrame.offsetHeight,
    };
  }




  panstart(e: any): void {
    console.log('pan start', e);
  }

  panend(e: any): void {
    console.log('pan end', e);
  }

  panleft(e: any): void {
    // console.log('pan left', e);
  }

  panright(e: any): void {
    console.log('pan right', e);
  }

  pancancel(e: any): void {
    console.log('pan cancel', e);
  }

}
