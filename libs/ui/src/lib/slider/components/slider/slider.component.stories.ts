import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { SliderComponent } from './slider.component';
import { SliderSlideDirective } from '../../directives/slider-slide.directive';


const meta: Meta<SliderComponent> = {
  component: SliderComponent,
  title: 'Slider',
  decorators: [
    moduleMetadata({
      imports: [
        SliderSlideDirective,
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<SliderComponent>;

export const Primary: Story = {
  args: {
    overflowHidden: true,
  },
  decorators: [
    () => ({
      template: `
        <style>
          .item {
            width: 100px;
            height: 100px;
            background: orange;
          }
        </style>

        <lib-slider>
          <div *libSliderSlide="1" class="item">1</div>
          <div *libSliderSlide="2" class="item">2</div>
          <div *libSliderSlide="3" class="item">3</div>
          <div *libSliderSlide="4" class="item">4</div>
          <div *libSliderSlide="5" class="item">5</div>
          <div *libSliderSlide="6" class="item">6</div>
          <div *libSliderSlide="7" class="item">7</div>
          <div *libSliderSlide="8" class="item">8</div>
        </lib-slider>
      `
    })
  ]
};

export const Heading: Story = {
  args: {
    overflowHidden: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/slider works!/gi)).toBeTruthy();
  },
};
