import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, inject } from '@angular/core';
import { EventManagerPlugin } from '@angular/platform-browser';

import { MoveEvent, MoveEventType } from '../types';
import { TouchService } from './touch.service';

const TOUCH_EVENTS: string[] = [
  MoveEventType.Pan,
  MoveEventType.PanStart,
  MoveEventType.PanUp,
  MoveEventType.PanLeft,
  MoveEventType.PanRight,
  MoveEventType.PanDown,
  MoveEventType.PanEnd,
];

@Injectable()
export class TouchEventManagerService extends EventManagerPlugin {

  private readonly touchService = inject(TouchService);
  // private readonly options = inject(TOUCH_OPTIONS);


  constructor(
    @Inject(DOCUMENT) doc: Document,
  ) {
    super(doc);
  }

  supports(eventName: string): boolean {
    return TOUCH_EVENTS.includes(eventName);
  }

  addEventListener(element: HTMLElement, eventName: string, handler: Function): Function {
    const customHandler = (event: Event) => handler(event);

    element.addEventListener(eventName, customHandler);

    // m-pan-up
    element.addEventListener('mousedown', e => {
      this.touchService.mouseDown(e);

      const panStartSub = this.touchService.panStart$
        .subscribe(e => {
          console.log('pan start', e);

          panStartSub.unsubscribe();

          this.dispatchEvent(element, 'm-panstart', e);
        });

      const panSub = this.touchService.panUp$
        .subscribe(e => {
          this.dispatchEvent(element, 'm-panup', e);
        });

      const panEndSub = this.touchService.panEnd$
        .subscribe(e => {
          console.log('pan end', e);
          panSub.unsubscribe();
          panEndSub.unsubscribe();

          this.dispatchEvent(element, 'm-panend', e);
        });

    });

    // Return cleanup logic for removing the event listener
    return () => {
      console.log('Touch event manager listener remove');
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
