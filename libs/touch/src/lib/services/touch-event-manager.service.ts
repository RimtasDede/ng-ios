import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, inject } from '@angular/core';
import { EventManagerPlugin } from '@angular/platform-browser';

import { MoveEvent, MoveEventType } from '../types';
import { TouchService } from './touch.service';


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

const TOUCH_PRESS_EVENTS: MoveEventType[] = [
  MoveEventType.Press,
  MoveEventType.PressUp,
];

const TOUCH_EVENTS: MoveEventType[] = [
  ...TOUCH_PAN_EVENTS,
  ...TOUCH_SWIPE_EVENTS,
  ...TOUCH_PRESS_EVENTS,
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
    const supports = (TOUCH_EVENTS as string[]).includes(eventName.split('.')[0]);

    return supports;
  }

  addEventListener(element: HTMLElement, eventString: MoveEventType, handler: Function): Function {
    const [ eventName, stopPropagation ] = eventString.split('.');

    if (stopPropagation && stopPropagation !== 'stop-propagation') {
      console.warn(`Invalid event "${eventName}" stop propagation flag name.`);
    }

    const stopProp = stopPropagation === 'stop-propagation';
    const customHandler = (event: Event) => {
      if (stopProp) {
        event.stopPropagation();
      }

      handler(event);
    };

    element.addEventListener(eventName, customHandler);

    element.addEventListener('mousedown', event => {
      if (stopProp && eventName === MoveEventType.Press) {
        event.stopPropagation();
      }

      this.touchService.mouseDown(event);

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

          if (
            e.type === MoveEventType.PanEnd
            || e.type === MoveEventType.PressUp
          ) {
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
