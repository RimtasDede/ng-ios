/* eslint-disable @angular-eslint/directive-selector */
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[m-panup-options]',
  standalone: true,
})
export class TouchOptionsDirective {

  @Input('m-panup-options') options: any;

  constructor() {}
}
