/* eslint-disable @angular-eslint/directive-selector */
import { Directive, EventEmitter, Output, HostListener } from '@angular/core';

/**
 * Recognized when the pointer is down for x ms without any movement.
 */
@Directive({
  selector: '[x-press]',
})
export class PressDirective {

  @Output('x-press') pressEvent = new EventEmitter<void>();

  private time = 250;

  private intervalId?: ReturnType<typeof setInterval>;

  @HostListener('mousedown') mouseDown() {
    this.intervalId = setInterval(() => {
      this.pressEvent.emit();
    }, this.time);
  }

  @HostListener('mouseup') mouseUp() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}
