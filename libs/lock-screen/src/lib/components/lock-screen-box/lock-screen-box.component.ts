import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, inject, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WallpaperDirective } from '@ng-ios/ios-services';

import { LockScreenComponent } from '../lock-screen/lock-screen.component';


@Component({
  selector: 'lib-lock-screen-box',
  imports: [
    CommonModule,
    LockScreenComponent,
    WallpaperDirective,
  ],
  templateUrl: './lock-screen-box.component.html',
  styleUrl: './lock-screen-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LockScreenBoxComponent {

  @Input() set deltaY(deltaY: number | undefined) {
    if (deltaY === undefined || !this.lockScreenContent) {
      return;
    }

    this.lockScreenVerticalPan(deltaY);
  };

  @Input() set swipeRelease(deltaY: number | undefined) {
    if (deltaY === undefined) {
      return;
    }

    this.lockScreenVerticalPanRelease(deltaY);
  };

  /**
   * Lock screen is hidden (swiped up)
   */
  @Output() close = new EventEmitter<void>();


  @HostBinding('class.open') open = false;

  @ViewChild('lockScreenWp') lockScreenWp!: ElementRef<HTMLElement>;
  @ViewChild('lockScreenFilter') lockScreenFilter!: ElementRef<HTMLElement>;
  @ViewChild('lockScreenContent') lockScreenContent!: ElementRef<HTMLElement>;

  private readonly renderer = inject(Renderer2);
  private readonly cd = inject(ChangeDetectorRef);

  private animationDuration = 500;
  private releaseDelay: number = 0;

  private lockScreenVerticalPan(deltaY: number) {
    this.open = false;

    const animationDelay = this.calcAnimationDelay(deltaY);

    // control swipe position
    this.setStyleProp('animation-delay', `${animationDelay - this.releaseDelay}ms`);
  }

  private lockScreenVerticalPanRelease(deltaY: number) {
    const lockScreenContent = this.lockScreenContent.nativeElement;
    const currAnimationDelay = this.calcAnimationDelay(deltaY);
    const reverseAnimationDelay = currAnimationDelay * -1 - this.animationDuration - this.releaseDelay;
    const height = lockScreenContent.offsetHeight;
    const show = height / 2 < deltaY; // do surpass breakpoint

    if (show) {
      this.releaseDelay += (currAnimationDelay + this.animationDuration) * -1;
    } else {
      this.setStyleProp('animation-direction', 'reverse');
      this.setStyleProp('animation-delay', `${reverseAnimationDelay}ms`);
      this.releaseDelay += currAnimationDelay;
    }

    this.setStyleProp('animation-play-state', 'running');

    this.renderer.listen(lockScreenContent, 'animationiteration', () => {
      if (show) {
        this.open = true;
      } else {
        this.close.emit();
      }

      this.setStyleProp('animation-play-state', 'paused');
      this.setStyleProp('animation-delay', currAnimationDelay);
      this.removeStyleProp('animation-direction');
    }, { once: true });
  }

  private setStyleProp(prop: string, value: any) {
    this.renderer.setStyle(this.lockScreenWp.nativeElement, prop, value);
    this.renderer.setStyle(this.lockScreenFilter.nativeElement, prop, value);
    this.renderer.setStyle(this.lockScreenContent.nativeElement, prop, value);
  };

  private removeStyleProp(prop: string) {
    this.renderer.removeStyle(this.lockScreenWp.nativeElement, prop);
    this.renderer.removeStyle(this.lockScreenFilter.nativeElement, prop);
    this.renderer.removeStyle(this.lockScreenContent.nativeElement, prop);
  };

  private calcAnimationDelay(deltaY: number): number {
    const lockScreenContent = this.lockScreenContent.nativeElement;
    const lockScreenBoxHeight = lockScreenContent.offsetHeight;
    const deltaYperc = deltaY / lockScreenBoxHeight * 100;
    const animationDelay = deltaYperc / 100 * this.animationDuration * -1;

    return animationDelay;
  }


}
