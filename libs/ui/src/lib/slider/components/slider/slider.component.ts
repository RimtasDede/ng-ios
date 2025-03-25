import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SliderSlideDirective } from '../../directives/slider-slide.directive';


@Component({
  selector: 'lib-slider',
  imports: [
    CommonModule,
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.overflow]': 'overflowHidden ? "hidden" : "visible"',
  },
})
export class SliderComponent implements AfterContentInit {

  @Input() active!: any;

  @Input() overflowHidden = true;

  @ContentChildren(SliderSlideDirective, { descendants: true }) slides!: QueryList<SliderSlideDirective>;


  ngAfterContentInit(): void {
    console.log('childs', this.slides);
  }

}
