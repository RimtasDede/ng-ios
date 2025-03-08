import { DOCUMENT } from '@angular/common';
import { inject, Injectable, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';

export interface TouchOptions {
  /**
   * Minimal pan distance required before recognizing
   */
  threshold: number;
}

export interface MoveEvent {
  /**
   * The horizontal scroll amount.
   * Positive values indicate scrolling to the right, and negative values indicate scrolling to the left.
   */
  deltaX: number;

  /**
   * The vertical scroll amount.
   * Positive values indicate scrolling down, and negative values indicate scrolling up.
   */
  deltaY: number;

  // distance: number;

  /**
   * Move angle from mouse down point
   *
   * 0 - Moves directly to right
   * 90 - directly to bottom
   * up to 180 - to left
   * upper value are negative
   */
  angle: number;

  /**
   * Move duration in milliseconds from move start.
   */
  duration: number;

  /**
   * How many px moves
   */
  velocityX: number;

  /**
   *
   */
  velocityY: number;
}

@Injectable()
export class TouchService {

  private readonly document = inject(DOCUMENT);
  // private readonly renderer = inject(Renderer2);

  private isMouseDown = false;
  private startEvent?: MouseEvent;
  private prevMoveEvent?: MoveEvent;
  private options?: TouchOptions;

  pan$ = new Subject<MoveEvent>();
  panUp$ = new Subject<MoveEvent>();
  panLeft$ = new Subject<MoveEvent>();
  panRight$ = new Subject<MoveEvent>();
  panDown$ = new Subject<MoveEvent>();
  panEnd$ = new Subject<MoveEvent>();

  swipeUp$ = new Subject<MoveEvent>();
  swipeLeft$ = new Subject<MoveEvent>();
  swipeRight$ = new Subject<MoveEvent>();
  swipeDown$ = new Subject<MoveEvent>();

  private mouseMoveHandler!: (e: MouseEvent) => void;
  private mouseUpHandler!: (e: MouseEvent) => void;

  private addDocumentListeners() {
    this.mouseMoveHandler = e => this.documentMoveHandler(e);
    this.mouseUpHandler = e => this.documentUpHandler(e);

    this.document.addEventListener('mousemove', this.mouseMoveHandler);
    this.document.addEventListener('mouseup', this.mouseUpHandler);
  }

  private documentMoveHandler(e: MouseEvent) {
    // console.log('mouse move', e);

    const moveEvent = this.calcMoveEvent(e);

    if (this.pan$.observed) {
      this.pan$.next(moveEvent);
    }

    if (this.prevMoveEvent) {
      // pan up
      if (
        this.panUp$.observed
        && this.prevMoveEvent.deltaY > moveEvent.deltaY
        && Math.abs(moveEvent.deltaY) >= (this.options?.threshold ?? 0)
      ) {
        // console.log(
        //   'aaaaa',
        //   this.panUp$.observed,
        //   this.prevMoveEvent,
        //   this.prevMoveEvent.deltaY,
        //   moveEvent,
        //   moveEvent.deltaY,
        // );
        this.panUp$.next(moveEvent);
      }

      // pan left
      if (
        this.panLeft$.observed
        && this.prevMoveEvent.deltaX > moveEvent.deltaX
      ) {
        this.panLeft$.next(moveEvent);
      }

      // pan right
      if (
        this.panRight$.observed
        && this.prevMoveEvent.deltaX < moveEvent.deltaX
      ) {
        this.panRight$.next(moveEvent);
      }

      // pan down
      if (
        this.panDown$.observed
        && this.prevMoveEvent.deltaY < moveEvent.deltaY
      ) {
        this.panDown$.next(moveEvent);
      }
    }

    // console.log('moveEvent', moveEvent);
    this.prevMoveEvent = moveEvent;
  }

  private documentUpHandler(e: MouseEvent) {
    // console.log('mouse up', e);

    const moveEvent = this.calcMoveEvent(e);

    this.panEnd$.next(moveEvent);

    this.isMouseDown = false;
    this.startEvent = undefined;

    // remove listeners
    this.document.removeEventListener('mousemove', this.mouseMoveHandler);
    this.document.removeEventListener('mouseup', this.mouseUpHandler);
  }

  mouseDown(e: MouseEvent, options: TouchOptions) {
    this.isMouseDown = true;
    this.options = options;
    this.startEvent = e;
    this.addDocumentListeners();
  }

  private calcMoveEvent(event: MouseEvent): MoveEvent {
    if (!this.startEvent) {
      return {
        deltaX: 0,
        deltaY: 0,
        angle: 0,
        duration: 0,
        velocityX: 0,
        velocityY: 0,
      };
    }

    const deltaX = this.startEvent.clientX - event.clientX;
    const deltaY = event.clientY - this.startEvent.clientY;
    const angle = Math.atan2(deltaY, -1 * deltaX) * (180 / Math.PI);
    const duration = event.timeStamp - this.startEvent.timeStamp;
    const velocityX = deltaX / duration;
    const velocityY = deltaY / duration;

    return {
      deltaX: deltaX,
      deltaY: deltaY,
      angle: angle,
      duration: duration,
      velocityX: velocityX,
      velocityY: velocityY,
    };
  }

}
