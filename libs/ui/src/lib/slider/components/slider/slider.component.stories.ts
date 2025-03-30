import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { SliderComponent } from './slider.component';
import { SliderSlideDirective } from '../../directives/slider-slide.directive';


const meta: Meta<SliderComponent> = {
  component: SliderComponent,
  title: 'Slider',
  argTypes: {
    initialSlide: { control: 'number' },
    showSlides: { control: 'number' },
    slidesGap: { control: 'number' },
    padding: { control: 'number' },
    overflowHidden: { control: 'boolean' },
    momentumScrolling: { control: 'boolean' },
  },
  decorators: [
    moduleMetadata({
      imports: [
        SliderSlideDirective,
      ],
    }),
  ],
  render: args => ({
    props: args,
    template: `
      <style>
        lib-slider {
          background: #ffd994;
        }

        .item {
          width: 100%;
          height: 200px;
          line-height: 200px;
          background: #77b7ea;
          color: #ffffff;
          font-size: 70px;
          text-align: center;
        }
      </style>

      <lib-slider ${argsToTemplate(args)}>
        <div *libSliderSlide="1" class="item">1</div>
        <div *libSliderSlide="2" class="item">2</div>
        <div *libSliderSlide="3" class="item">3</div>
        <div *libSliderSlide="4" class="item">4</div>
        <div *libSliderSlide="5" class="item">5</div>
        <div *libSliderSlide="6" class="item">6</div>
        <div *libSliderSlide="7" class="item">7</div>
        <div *libSliderSlide="8" class="item">8</div>
      </lib-slider>
    `,
  }),
};

export default meta;

type Story = StoryObj<SliderComponent>;

export const Primary: Story = {
  args: {
    initialSlide: 2,
    showSlides: 2,
    slidesGap: 40,
    padding: 15,
    overflowHidden: true,
    momentumScrolling: true,
  },
};

export const Heading: Story = {
  args: {
    overflowHidden: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    console.log(canvasElement);
    expect(canvas.getByText(/slider works!/gi)).toBeTruthy();
  },
};
