import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { BatteryComponent } from './battery.component';


const meta: Meta<BatteryComponent> = {
  component: BatteryComponent,
  title: 'Battery',
  argTypes: {
    percentage: {
      control: {
        type: 'number',
        min: 0,
        max: 100,
      }
    },
    isCharging: { control: 'boolean' },
  },
  render: args => ({
    props: args,
    template: `
      <style>
        div {
          background-color: #222425;
          text-align: center;
          padding: 20px;
        }
      </style>

      <div>
        <ios-battery ${argsToTemplate(args)} />
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<BatteryComponent>;

export const Primary: Story = {
  args: {
    percentage: 100,
    isCharging: false,
  },
};
