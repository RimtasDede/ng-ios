import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { MoveEvent, MoveEventNullableType, MoveEventType, TouchOptions, TouchPressOptions } from '../types';


const PRESS_OPTIONS: TouchPressOptions = {
  threshold: 5,
  time: 500,
};

@Injectable()
export class TouchService {

  private readonly document = inject(DOCUMENT);

  private readonly options: TouchOptions = {
    threshold: 0,
    swipeVelocity: 0.3,
  };

  private documentListenersAdded = false;
  private isMouseDown = false;
  private startEvent?: MouseEvent;
  private prevMoveEvent?: MoveEventNullableType;

  readonly event$ = new Subject<MoveEvent>();

  private mouseMoveHandler!: (e: MouseEvent) => void;
  private mouseUpHandler!: (e: MouseEvent) => void;

  private addDocumentListeners() {
    if (this.documentListenersAdded) {
      return;
    }

    this.mouseMoveHandler = e => this.documentMoveHandler(e);
    this.mouseUpHandler = e => this.documentUpHandler(e);

    this.document.addEventListener('mousemove', this.mouseMoveHandler);
    this.document.addEventListener('mouseup', this.mouseUpHandler);

    this.documentListenersAdded = true;

    // press
    setTimeout(() => {
      if (!this.startEvent) {
        return;
      }

      const moveEvent = this.prevMoveEvent
        ? this.prevMoveEvent
        : this.calcMoveEvent(this.startEvent);

      if (
        Math.abs(moveEvent.deltaX) <= PRESS_OPTIONS.threshold
        && Math.abs(moveEvent.deltaY) <= PRESS_OPTIONS.threshold
      ) {
        this.event$.next({
          ...moveEvent,
          type: MoveEventType.Press,
        });
      }
    }, PRESS_OPTIONS.time);
  }

  /**
   * Handle any mouse move event
   */
  private documentMoveHandler(e: MouseEvent) {
    const moveEvent = this.calcMoveEvent(e);

    // Pan Start event
    if (!this.prevMoveEvent) {
      const panStartEvent = {
        ...moveEvent,
        type: MoveEventType.PanStart,
      };

      if (this.event$.observed) {
        this.event$.next(panStartEvent);
      }
    }

    this.prevMoveEvent = moveEvent;

    // Most probably event was emited but with no position changes
    // Lets skip this kind of events
    if (!moveEvent.type) {
      return;
    }

    this.event$.next(moveEvent as MoveEvent);
  }

  private documentUpHandler(e: MouseEvent) {
    const moveEvent = this.calcMoveEvent(e);

    // check maybe it is swipe event also
    if (
      Math.abs(moveEvent.velocityX) > this.options.swipeVelocity
      || Math.abs(moveEvent.velocityY) > this.options.swipeVelocity
    ) {
      const eventType = this.angleToSwipeEventType(moveEvent.angle);

      this.event$.next({
        ...moveEvent,
        type: eventType,
      });
    }

    // press up
    if (
      moveEvent.duration <= PRESS_OPTIONS.time
      && Math.abs(moveEvent.deltaX) <= PRESS_OPTIONS.threshold
      && Math.abs(moveEvent.deltaY) <= PRESS_OPTIONS.threshold
    ) {
      this.event$.next({
        ...moveEvent,
        type: MoveEventType.PressUp,
      });
    }

    this.event$.next({
      ...moveEvent,
      type: MoveEventType.PanEnd,
    });

    this.documentListenersAdded = false;
    this.isMouseDown = false;
    this.startEvent = undefined;
    this.prevMoveEvent = undefined;

    // remove global listeners
    this.document.removeEventListener('mousemove', this.mouseMoveHandler);
    this.document.removeEventListener('mouseup', this.mouseUpHandler);
  }

  mouseDown(e: MouseEvent, options?: TouchOptions) {
    this.isMouseDown = true;
    this.startEvent = e;
    this.addDocumentListeners();
  }

  private calcMoveEvent(event: MouseEvent): MoveEventNullableType {
    if (!this.startEvent) {
      return {
        type: null,
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
    const type = this.identifyEventType(event);

    return {
      type: type,
      deltaX: deltaX,
      deltaY: deltaY,
      angle: angle,
      duration: duration,
      velocityX: velocityX,
      velocityY: velocityY,
    };
  }

  private identifyEventType(e: MouseEvent): MoveEventType | null {
    if (!this.startEvent) {
      return null;
    }

    const deltaX = this.startEvent.clientX - e.clientX;
    const deltaY = e.clientY - this.startEvent.clientY;

    if (this.prevMoveEvent) {
      // pan up
      if (
        this.prevMoveEvent.deltaY > deltaY
        && Math.abs(deltaY) >= this.options.threshold
      ) {
        return MoveEventType.PanUp;
      }

      // pan left
      if (
        this.prevMoveEvent.deltaX > deltaX
      ) {
        return MoveEventType.PanLeft;
      }

      // pan right
      if (
        this.prevMoveEvent.deltaX < deltaX
      ) {
        return MoveEventType.PanRight;
      }

      // pan down
      if (
        this.prevMoveEvent.deltaY < deltaY
      ) {
        return MoveEventType.PanDown;
      }
    }

    return null;
  }

  private angleToSwipeEventType(angle: number): MoveEventType {
    if (angle > -135 && angle < -45) {
      return MoveEventType.SwipeUp;
    } else if (angle <= -135 || angle > 135) {
      return MoveEventType.SwipeLeft;
    } else if (angle >= -45 && angle < 45) {
      return MoveEventType.SwipeRight;
    } else {
      return MoveEventType.SwipeDown;
    }
  }

}
