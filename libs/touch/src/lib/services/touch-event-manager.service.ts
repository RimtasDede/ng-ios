import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, inject } from '@angular/core';
import { EventManagerPlugin } from '@angular/platform-browser';

import { MoveEvent, MoveEventType } from '../types';
import { TouchService } from './touch.service';


const TOUCH_EVENTS: MoveEventType[] = [
  MoveEventType.Pan,
  MoveEventType.PanStart,
  MoveEventType.PanUp,
  MoveEventType.PanLeft,
  MoveEventType.PanRight,
  MoveEventType.PanDown,
  MoveEventType.PanEnd,

  MoveEventType.Swipe,
  MoveEventType.SwipeUp,
  MoveEventType.SwipeLeft,
  MoveEventType.SwipeRight,
  MoveEventType.SwipeDown,

  MoveEventType.Press,
  MoveEventType.PressUp,
];

const TOUCH_PAN_EVENTS: MoveEventType[] = [
  MoveEventType.Pan,
  MoveEventType.PanStart,
  MoveEventType.PanUp,
  MoveEventType.PanLeft,
  MoveEventType.PanRight,
  MoveEventType.PanDown,
  MoveEventType.PanEnd,
];

const TOUCH_SWIPE_EVENTS: MoveEventType[] = [
  MoveEventType.Swipe,
  MoveEventType.SwipeUp,
  MoveEventType.SwipeLeft,
  MoveEventType.SwipeRight,
  MoveEventType.SwipeDown,
];


@Injectable()
export class TouchEventManagerService extends EventManagerPlugin {

  private readonly touchService = inject(TouchService);

  constructor(
    @Inject(DOCUMENT) doc: Document,
  ) {
    super(doc);
  }

  supports(eventName: string): boolean {
    return (TOUCH_EVENTS as string[]).includes(eventName);
  }

  addEventListener(element: HTMLElement, eventName: MoveEventType, handler: Function): Function {
    const customHandler = (event: Event) => handler(event);

    element.addEventListener(eventName, customHandler);

    element.addEventListener('mousedown', e => {
      this.touchService.mouseDown(e);

      const sub = this.touchService.event$
        .subscribe(e => {
          // Pan
          if (
            eventName === MoveEventType.Pan
            && TOUCH_PAN_EVENTS.includes(e.type)
          ) {
            this.dispatchEvent(element, MoveEventType.Pan, e);
          }

          // Swipe
          if (
            eventName === MoveEventType.Swipe
            && TOUCH_SWIPE_EVENTS.includes(e.type)
          ) {
            this.dispatchEvent(element, MoveEventType.Swipe, e);
          }

          // Any event
          if (eventName === e.type) {
            this.dispatchEvent(element, e.type, e);
          }

          if (e.type === MoveEventType.PanEnd) {
            sub.unsubscribe();
          }
        });
    });

    // Return cleanup logic for removing the event listener
    return () => {
      element.removeEventListener(eventName, customHandler);
    };
  }

  /**
   * Dispatch custom event
   */
  private dispatchEvent(element: HTMLElement, eventName: string, e: MoveEvent): void {
    const customEvent = new CustomEvent(eventName, {
      bubbles: true,
      detail: e,
    });

    element.dispatchEvent(customEvent);
  }

}
