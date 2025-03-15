/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, inject } from '@angular/core';

import { MoveEvent, TouchOptions } from '../types';
import { TouchService } from '../services/touch.service';


/**
 * Recognized when the pointer is down and moved up.
 *
 * @deprecated
 */
@Directive({
  selector: '[m-panup2]',
})
export class PanUpDirective {

  @Input('m-panup-options') options: TouchOptions = {
    threshold: 0,
  };

  @Output('m-panup2') panUpEvent = new EventEmitter<MoveEvent>();

  private readonly host = inject(ElementRef);
  private readonly touchService = inject(TouchService);

  @HostListener('mousedown', ['$event'])
  mouseDown(e: MouseEvent) {
    console.log('e', e);
    this.touchService.mouseDown(e, this.options);
    // dispatch custom event
    const customEvent = new CustomEvent('m-panstart', {
      bubbles: true,
      detail: {
        something: 1,
        ok: 2,
        bad: 'yes',
      }
    });
    this.host.nativeElement.dispatchEvent(customEvent);

    const panSub = this.touchService.panUp$
      .subscribe(e => {
        this.panUpEvent.emit(e);
      });

    const panEndSub = this.touchService.panEnd$
      .subscribe(() => {
        // console.log('pan end');
        panSub.unsubscribe();
        panEndSub.unsubscribe();
      });
  }

}
