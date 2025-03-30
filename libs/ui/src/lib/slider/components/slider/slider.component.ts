import { AfterContentInit, ChangeDetectionStrategy, Component, computed, contentChildren, ElementRef, inject, input, Renderer2, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoveEvent } from '@ng-ios/touch';
import { AnimationObject, createAnimation, easeOut, easeOutBack } from '@ng-ios/utility';

import { SliderSlideDirective } from '../../directives/slider-slide.directive';

const SWIPE_ANIMATION_DURATION = 3000;

@Component({
  selector: 'lib-slider',
  imports: [
    CommonModule,
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.overflow]': 'overflowHidden() ? "hidden" : "visible"',
    '[style.padding]': '"0 " + padding() + "%"',
  },
})
export class SliderComponent implements AfterContentInit {

  initialSlide = input<number>(0);

  /**
   * How many slides show on screen
   */
  showSlides = input<number>(1);

  /**
   * Gap between each slide in pixels
   */
  slidesGap = input<number>(10)

  /**
   * Slider padding from left and right in %
   */
  padding = input<number>(0);

  /**
   * Enabled momentum scrolling for swipe animations
   */
  momentumScrolling = input<boolean>(false);

  overflowHidden = input<boolean>(true);

  private readonly renderer = inject(Renderer2);
  private readonly host = inject(ElementRef);

  track = viewChild<ElementRef<HTMLElement>>('track');
  slideTemplates = contentChildren(SliderSlideDirective);

  private sliderWidth = this.host.nativeElement.offsetWidth;
  slidesNum = computed(() => this.slideTemplates().length);
  slideWidth = computed(() => this.calcSlideWidth());
  trackTranslateX = signal<number>(0);
  currTr = computed(() => this.findSlideCurr());
  trackTranslateXstart = 0;
  maxTrackTranslateX = computed(() => this.calcMaxTrackTranslateX());
  swipeAnimation?: AnimationObject;

  ngAfterContentInit(): void {
    this.trackTranslateX.set(
      this.calcSlideTranslateX(
        this.initialSlide()
      )
    );

    // console.log('slider width', this.sliderWidth);
    console.log('slide width', this.slideWidth());
    console.log('max translate x', this.maxTrackTranslateX());

    // this.trackTranslateX.set(this.maxTrackTranslateX());
  }


  stopAnimation() {
    if (this.swipeAnimation) {
      this.swipeAnimation.stop();
      this.swipeAnimation = undefined;
    }
  }

  panStart(e: CustomEvent<MoveEvent>) {
    this.trackTranslateXstart = this.trackTranslateX();
  }

  panLeftRight(e: CustomEvent<MoveEvent>) {
    const deltaX = this.trackTranslateXstart + e.detail.deltaX * -1;

    // console.log(deltaX);

    this.trackTranslateX.set(deltaX);

    // this.renderer.setStyle(track?.nativeElement, 'transform', `translateX(${deltaX}px)`);
  }

  panEnd(e: CustomEvent<MoveEvent>) {
    if (this.swipeAnimation) {
      return;
    }

    const currTranslateX = this.trackTranslateX();
    // const gap = this.slidesGap() / 2;
    // const overflow = (currTranslateX + this.sliderWidth * this.padding() / 100) / (this.slideWidth() + gap);

    const sl = this.findSlideCurr();
    const animationDuration = 300;

    console.log('slide', sl);

    createAnimation({
      duration: animationDuration,
      valueStart: currTranslateX,
      valueEnd: sl,
      easing: easeOut,
      valueUpdate: val => this.trackTranslateX.set(val),
    }).start();

    // const startTime = performance.now();
    // const translateXfrom = this.trackTranslateX();
    // const translateXto = translateXfrom - 500;

    // this.animateSwipe(startTime, translateXfrom, translateXto);
  }

  swipeLeft(e: CustomEvent<MoveEvent>) {
    // console.log('swipe left', e.detail);
    // const translateXfrom = this.trackTranslateX();
    // const to = translateXfrom - 1500 * Math.abs(e.detail.velocityX);
    // const translateXto = to < this.maxTrackTranslateX()
    //   ? this.maxTrackTranslateX()
    //   : to;

    // this.swipeAnimation = createAnimation({
    //   duration: SWIPE_ANIMATION_DURATION,
    //   valueStart: translateXfrom,
    //   valueEnd: translateXto,
    //   easing: x => easeOutBack(x),
    //   valueUpdate: val => this.trackTranslateX.set(val),
    // });
    // this.swipeAnimation.start()
    //   .then(() => this.swipeAnimation = undefined);
  }

  swipeRight(e: CustomEvent<MoveEvent>) {
    // console.log('swipe right', e.detail);
    // const translateXfrom = this.trackTranslateX();
    // const to = translateXfrom + 1500 * Math.abs(e.detail.velocityX);
    // const translateXto = to > 0
    //   ? 0
    //   : to;

    // this.swipeAnimation = createAnimation({
    //   duration: SWIPE_ANIMATION_DURATION,
    //   valueStart: translateXfrom,
    //   valueEnd: translateXto,
    //   easing: x => easeOutBack(x),
    //   valueUpdate: val => this.trackTranslateX.set(val),
    // });
    // this.swipeAnimation.start()
    //   .then(() => this.swipeAnimation = undefined);
  }

  calcSlideWidth(): number {
    const sliderPadding = this.sliderWidth * this.padding() / 100 * 2;
    const slidesGap = this.slidesGap() * (this.showSlides() - 1);
    const slideWidth = (this.sliderWidth - slidesGap - sliderPadding) / this.showSlides();

    console.log('slideWidth', this.sliderWidth);

    return slideWidth;
  }

  calcSlideTranslateX(slideIndex: number): number {
    const slideWidth = this.slideWidth();
    const translateX = slideIndex * slideWidth * -1 - (this.slidesGap() * slideIndex);

    return translateX;
  }

  calcMaxTrackTranslateX(): number {
    const gap = this.slidesGap() * (this.slidesNum() - 1 - this.slidesNum());
    const paddingRight = this.sliderWidth * this.padding() / 100;
    const slidesWidth = (this.slidesNum() - this.showSlides()) * this.slideWidth();

    return (slidesWidth + gap + paddingRight) * -1;
  }

  /**
   * Find slide to which should slider stick and calculate new translateX
   */
  findSlideCurr() {
    const currTranslateX = this.trackTranslateX();
    const sliderPaddingLeft = this.sliderWidth * this.padding() / 100;
    const slideWidth = this.slideWidth();
    const gap = this.slidesGap();

    console.log('curr translate x', currTranslateX);
    console.log('slide width', slideWidth);
    console.log('gap', gap);
    console.log('padding left', sliderPaddingLeft);
    /**
     * suveikia tik kai per pirma active slide kerta breakpointas.
     * Reikia padaryti kad paimtu slide is sono ir ziuretu ar praeina jau.
     */

    for (let i = 0; i < this.slidesNum(); i++) {
      const centerTranslateX = -i * (slideWidth + gap) - sliderPaddingLeft - slideWidth / 2;

      console.log(`slide ${i} translateX`, centerTranslateX);
      // console.log('sliderPaddingLeft', sliderPaddingLeft);

      // console.log(centerTranslateX - (slideWidth + gap) / 2, '<', currTranslateX);
      // console.log(centerTranslateX + (slideWidth + gap) / 2, '>=', currTranslateX);
      if (
        centerTranslateX - (slideWidth + gap) / 2 < currTranslateX
        && centerTranslateX + (slideWidth + gap) / 2 >= currTranslateX
      ) {
        const slideIndex = centerTranslateX < currTranslateX
          ? i
          : i + 1;

        return this.calcSlideTranslateX(slideIndex);
      }
    }

    return 0;
  }

}
