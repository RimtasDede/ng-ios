import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';

import { ScrollBoxComponent } from './scroll-box.component';


const meta: Meta<ScrollBoxComponent> = {
  component: ScrollBoxComponent,
  title: 'Scroller',
  // argTypes: {
  //   percentage: {
  //     control: {
  //       type: 'number',
  //       min: 0,
  //       max: 100,
  //     }
  //   },
  //   isCharging: { control: 'boolean' },
  // },
  parameters: {
    backgrounds: {
      default: 'blue',
      values: [
        { name: 'blue', value: '#00a6fb' },
      ],
    },
  },
  render: args => ({
    props: args,
    template: `
      <style>
        ios-scroll-box {
          background-color: #fff;
        }

        .item {
          background-color: #ff8229;
          text-align: center;
          padding: 60px;
          margin-bottom: 20px;
          opacity: 0.8;
        }
      </style>

      <div>
        <ios-scroll-box style="height: 300px;" ${argsToTemplate(args)}>
          <div class="item">1</div>
          <div class="item">2</div>
          <div class="item">3</div>
          <div class="item">4</div>
          <div class="item">5</div>
        </ios-scroll-box>
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<ScrollBoxComponent>;

export const Primary: Story = {
  args: {
    // percentage: 100,
    // isCharging: false,
  },
};
