import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, inject } from '@angular/core';
import { EventManagerPlugin } from '@angular/platform-browser';

import { TouchService } from './touch.service';

const TOUCH_EVENTS: string[] = [
  'm-panup',
  'm-panleft',
  'm-panright',
  'm-pandown',
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
      // dispatch custom event
      const customEvent = new CustomEvent('m-panstart', {
        bubbles: true,
        detail: {
          start: 'yes'
        }
      });
      element.dispatchEvent(customEvent);

      const panSub = this.touchService.panUp$
        .subscribe(e => {
          // this.panUpEvent.emit(e);
          const customEvent = new CustomEvent('m-panup', {
            bubbles: true,
            detail: e,
          });
          element.dispatchEvent(customEvent);
        });

      const panEndSub = this.touchService.panEnd$
        .subscribe(() => {
          // console.log('pan end');
          panSub.unsubscribe();
          panEndSub.unsubscribe();

          const customEvent = new CustomEvent('m-panend', {
            bubbles: true,
            detail: e,
          });
          element.dispatchEvent(customEvent);
        });

    });

    // Return cleanup logic for removing the event listener
    return () => {
      console.log('Touch event manager listener remove');
      element.removeEventListener(eventName, customHandler);
    };
  }

}
