/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable @angular-eslint/directive-selector */
import { Directive, EventEmitter, HostListener, Input, Output, inject } from '@angular/core';

import { MoveEvent, TouchOptions, TouchService } from '../services/touch.service';


/**
 * Recognized when the pointer is down and moved up.
 */
@Directive({
  selector: '[m-panup]',
})
export class PanUpDirective {

  @Input('m-panup-options') options: TouchOptions = {
    threshold: 0,
  };

  @Output('m-panup') panUpEvent = new EventEmitter<MoveEvent>();

  private readonly touchService = inject(TouchService);

  @HostListener('mousedown', ['$event'])
  mouseDown(e: MouseEvent) {
    // console.log('e', e);
    this.touchService.mouseDown(e, this.options);

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
