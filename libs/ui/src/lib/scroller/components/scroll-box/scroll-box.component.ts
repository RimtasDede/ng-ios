/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, AnimationBuilder, AnimationMetadata, AnimationPlayer, AnimationStyleMetadata, group, keyframes, query, style } from '@angular/animations';

import { MoveEvent } from '@ng-ios/touch';
import { AnimationObject, createAnimation, easeOut, easeOutCubic, easeOutQuart } from '@ng-ios/utility';

const SCROLL_MAX_OVERFLOW = 100;

const scrollAnimationMeta = (
  params: {
    duration: number,
    from: number,
    to: number,
    contentHeight: number,
    contentBoxHeight: number,
  }
) => {
  const { from, to } = params;

  if (to > from) {
    return scrollUpAnimationMeta(params);
  } else if (to < from) {
    return scrollDownAnimationMeta(params);
  }

  return [];
};

const scrollUpAnimationMeta = (
  params: {
    duration: number,
    from: number,
    to: number,
    contentHeight: number,
    contentBoxHeight: number,
  }
) => {
  const { duration, from, to, contentHeight, contentBoxHeight } = params;
  const limit = 0;
  const durationBack = 250;
  const scrollRatio = contentBoxHeight / contentHeight;
  const overflow = to - limit;
  let framesForward: AnimationStyleMetadata[] = [];
  let framesForwardScroll: AnimationStyleMetadata[] = [];
  let framesBackward: AnimationStyleMetadata[] = [];
  let framesBackwardScroll: AnimationStyleMetadata[] = [];
  let durationForward = duration;

  // scrolled over content boundary
  if (overflow > 0) {
    const total = to - from;
    const newTo = Math.min(to / 5, SCROLL_MAX_OVERFLOW);
    const newTotal = newTo - from;
    const newOverflow = newTo - limit;
    const breakOffset = 1 - newOverflow / newTotal;

    durationForward = duration * (newTotal / total);

    // only bounce back
    if (from > 0) {
      framesBackward = [
        style({ offset: 0, translate: `0 ${from}px` }),
        style({ offset: 1, translate: `0 ${limit}px` }),
      ];
      framesBackwardScroll = [
        style({ offset: 0, translate: `0 ${from * -1 * scrollRatio}px` }),
        style({ offset: 1, translate: `0 ${limit * -1 * scrollRatio}px` }),
      ];
    }

    // scroll and bounce back
    if (from < 0) {
      framesForward = [
        style({ offset: 0, translate: `0 ${from}px` }),
        style({ offset: breakOffset, translate: `0 0` }),
        style({ offset: 1, translate: `0 ${newTo}px` }),
      ];
      framesBackward = [
        style({ offset: 0, translate: `0 ${newTo}px` }),
        style({ offset: 1, translate: `0 ${limit}px` }),
      ];
      framesForwardScroll = [
        style({ offset: 0, translate: `0 ${from * -1 * scrollRatio}px` }),
        style({ offset: 1, translate: `0 ${newTo * -1 * scrollRatio}px` }),
      ];
      framesBackwardScroll = [
        style({ offset: 0, translate: `0 ${newTo * -1 * scrollRatio}px` }),
        style({ offset: 1, translate: `0 ${limit * -1 * scrollRatio}px` }),
      ];
    }
  } else {
    framesForward = [
      style({ offset: 0, translate: `0 ${from}px` }),
      style({ offset: 1, translate: `0 ${to}px` }),
    ];
    framesForwardScroll = [
      style({ offset: 0, translate: `0 ${from * -1 * scrollRatio}px` }),
      style({ offset: 1, translate: `0 ${to * -1 * scrollRatio}px` }),
    ];
  }

  return group([
    query(
      '.content',
      [
        ...(
          framesForward.length
          ? [
            animate(
              `${durationForward}ms ease-out`,
              keyframes([
                ...framesForward,
              ]
            ),
          )]
          : []
        ),

        ...(
          framesBackward.length
          ? [
            animate(
              `${durationBack}ms ease-out`,
              keyframes([
                ...framesBackward,
              ]
            ),
          )]
          : []
        ),
      ],
    ),
    query(
      '.scroll-bar',
      [
        ...(
          framesForwardScroll.length
          ? [
            animate(
              `${durationForward}ms ease-out`,
              keyframes([
                ...framesForwardScroll,
              ]
            ),
          )]
          : []
        ),

        ...(
          framesBackwardScroll.length
          ? [
            animate(
              `${durationBack}ms ease-out`,
              keyframes([
                ...framesBackwardScroll,
              ]
            ),
          )]
          : []
        ),
      ]
    ),
  ]);
};

const scrollDownAnimationMeta = (
  params: {
    duration: number,
    from: number,
    to: number,
    contentHeight: number,
    contentBoxHeight: number,
  }
) => {
  const { duration, from, to, contentHeight, contentBoxHeight } = params;
  const limit = contentBoxHeight - contentHeight;
  const durationBack = 250;
  const scrollRatio = contentBoxHeight / contentHeight;
  const overflow = Math.abs(to - limit);
  let framesForward: AnimationStyleMetadata[] = [];
  let framesForwardScroll: AnimationStyleMetadata[] = [];
  let framesBackward: AnimationStyleMetadata[] = [];
  let framesBackwardScroll: AnimationStyleMetadata[] = [];
  let durationForward = duration;

  // scrolled over content boundary
  if (to < limit) {
    const total = from - to;
    const newTo = Math.max(limit - overflow / 5, limit - SCROLL_MAX_OVERFLOW);
    const newTotal = from - newTo;
    const newOverflow = Math.abs(newTo - limit);
    const breakOffset = 1 - newOverflow / newTotal;

    durationForward = duration * Math.abs(newTotal / total);

    // only bounce back
    if (from < limit) {
      framesBackward = [
        style({ offset: 0, translate: `0 ${from}px` }),
        style({ offset: 1, translate: `0 ${limit}px` }),
      ];
      framesBackwardScroll = [
        style({ offset: 0, translate: `0 ${from * -1 * scrollRatio}px` }),
        style({ offset: 1, translate: `0 ${limit * -1 * scrollRatio}px` }),
      ];
    }

    // scroll and bounce back
    if (from > limit) {
      framesForward = [
        style({ offset: 0, translate: `0 ${from}px` }),
        style({ offset: breakOffset, translate: `0 ${limit}px` }),
        style({ offset: 1, translate: `0 ${newTo}px` }),
      ];
      framesBackward = [
        style({ offset: 0, translate: `0 ${newTo}px` }),
        style({ offset: 1, translate: `0 ${limit}px` }),
      ];
      framesForwardScroll = [
        style({ offset: 0, translate: `0 ${from * -1 * scrollRatio}px` }),
        style({ offset: 1, translate: `0 ${newTo * -1 * scrollRatio}px` }),
      ];
      framesBackwardScroll = [
        style({ offset: 0, translate: `0 ${newTo * -1 * scrollRatio}px` }),
        style({ offset: 1, translate: `0 ${limit * -1 * scrollRatio}px` }),
      ];
    }
  } else {
    framesForward = [
      style({ offset: 0, translate: `0 ${from}px` }),
      style({ offset: 1, translate: `0 ${to}px` }),
    ];
    framesForwardScroll = [
      style({ offset: 0, translate: `0 ${from * -1 * scrollRatio}px` }),
      style({ offset: 1, translate: `0 ${to * -1 * scrollRatio}px` }),
    ];
  }

  return group([
    query(
      '.content',
      [
        ...(
          framesForward.length
          ? [
            animate(
              `${durationForward}ms ease-out`,
              keyframes([
                ...framesForward,
              ]
            ),
          )]
          : []
        ),

        ...(
          framesBackward.length
          ? [
            animate(
              `${durationBack}ms ease-out`,
              keyframes([
                ...framesBackward,
              ]
            ),
          )]
          : []
        ),
      ],
    ),
    query(
      '.scroll-bar',
      [
        ...(
          framesForwardScroll.length
          ? [
            animate(
              `${durationForward}ms ease-out`,
              keyframes([
                ...framesForwardScroll,
              ]
            ),
          )]
          : []
        ),

        ...(
          framesBackwardScroll.length
          ? [
            animate(
              `${durationBack}ms ease-out`,
              keyframes([
                ...framesBackwardScroll,
              ]
            ),
          )]
          : []
        ),
      ]
    ),
  ]);
};


@Component({
  selector: 'ios-scroll-box',
  imports: [
    CommonModule,
  ],
  templateUrl: './scroll-box.component.html',
  styleUrl: './scroll-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollBoxComponent {

  private readonly host = inject(ElementRef);
  private readonly animationBuilder = inject(AnimationBuilder);

  private contentBox = viewChild<ElementRef<HTMLElement>>('contentBox');
  private content = viewChild<ElementRef<HTMLElement>>('content');
  private scrollContainer = viewChild<ElementRef<HTMLElement>>('scrollContainer');
  private scrollBar = viewChild<ElementRef<HTMLElement>>('scrollBar');

  isPressed = signal(false);
  translateY = signal(0);
  translateYscroll = signal(0);
  private animationFrameId?: number;
  private startTranslateY = 0;
  private animation?: AnimationObject;
  private animationPlayer?: AnimationPlayer;
  isAnimationInProgress = signal(false);
  isScrollInProgress = computed(() => this.isPressed() || this.isAnimationInProgress());

  pressDown() {
    this.isPressed.set(true);

    if (this.isAnimationInProgress()) {
      this.onAnimationDone();
    }
  }

  pressUp() {
    this.isPressed.set(false);
  }

  panStart() {
    this.startTranslateY = this.translateY();
  }

  pan(e: CustomEvent<MoveEvent>) {
    const deltaY = e.detail.deltaY;
    const bottomLimit = this.calcBottomScrollLimit();
    let newTranslateY = this.startTranslateY + deltaY;

    // top over pan
    if (newTranslateY > 0) {
      newTranslateY *= 0.3;
    }

    // bottom over pan
    if (newTranslateY < bottomLimit) {
      newTranslateY = bottomLimit + (newTranslateY - bottomLimit) * 0.3;
    }

    this.animationFrameId = requestAnimationFrame(() => {
      this.translateY.set(newTranslateY);
      this.translateYscroll.set(this.calcScrollTranslateY());
    });
  }

  panEnd(e: CustomEvent<MoveEvent>) {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    const duration = 2000;
    const from = this.translateY();
    const to = from + e.detail.velocityY * 500;
    const limit = to > from ? 0 : this.calcBottomScrollLimit();
    const contentHeight = this.content()!.nativeElement.offsetHeight;
    const contentBoxHeight = this.contentBox()!.nativeElement.offsetHeight;

    const animationMeta = scrollAnimationMeta({
      duration,
      from,
      to,
      contentHeight,
      contentBoxHeight,
    });
    const animation = this.animationBuilder.build(animationMeta);

    this.animationPlayer = animation.create(this.host.nativeElement);
    this.animationPlayer.onDone(() => this.onAnimationDone());
    this.animationPlayer.play();

    this.isAnimationInProgress.set(true);
  }

  private getContentTranslateY(): number {
    const content = this.content()!.nativeElement;
    const translate = getComputedStyle(content).translate;
    const translateArr = translate.split(' ');
    const translateY = parseFloat(translateArr[translateArr.length - 1].replace('px', ''));

    return translateY;
  }

  private getContentTranslateYscroll(): number {
    const scroll = this.scrollBar()!.nativeElement;
    const translate = getComputedStyle(scroll).translate;
    const translateArr = translate.split(' ');
    const translateY = parseFloat(translateArr[translateArr.length - 1].replace('px', ''));

    return translateY;
  }

  private onAnimationDone() {
    if (!this.animationPlayer) {
      return;
    }

    const currTranslateY = this.getContentTranslateY();
    const currTranslateYscroll = this.getContentTranslateYscroll();

    this.translateY.set(currTranslateY);
    this.translateYscroll.set(currTranslateYscroll);
    this.animationPlayer.destroy();
    this.animationPlayer = undefined;
    this.isAnimationInProgress.set(false);
  }

  /**
   * Calculate how much need to translateY content to reach bottom content limit inside content box
   */
  private calcBottomScrollLimit(): number {
    const contentBoxHeight = this.contentBox()!.nativeElement.offsetHeight;
    const contentHeight = this.content()!.nativeElement.offsetHeight;

    if (!contentBoxHeight || !contentHeight) {
      return 0;
    }

    return contentBoxHeight - contentHeight;
  }

  private calcScrollTranslateY() {
    const contentBoxHeight = this.contentBox()!.nativeElement.offsetHeight;
    const contentHeight = this.content()!.nativeElement.offsetHeight;
    // const scrollContHeight = this.scrollContainer()!.nativeElement.offsetHeight;
    const ratio = contentBoxHeight / contentHeight;
    // const maxScrollTranslateY = (1 - ratio) * contentBoxHeight;
    // const translateYratio = maxScrollTranslateY / (contentHeight - contentBoxHeight);

    return this.translateY() * ratio * -1;

    // return this.translateY() * translateYratio * -1;
  }

}
