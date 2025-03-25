import { Directive, inject, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[libSliderSlide]',
})
export class SliderSlideDirective {

  @Input('libSliderSlide') value: any;

  template = inject(TemplateRef);

}
