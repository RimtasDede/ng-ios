import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';

import { SignalStrComponent } from './signal-str.component';


const meta: Meta<SignalStrComponent> = {
  component: SignalStrComponent,
  title: 'Signal Strength',
  argTypes: {
    value: {
      control: {
        type: 'number',
        min: 0,
        max: 4,
      }
    },
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
        <ios-signal-str ${argsToTemplate(args)} />
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<SignalStrComponent>;

export const Primary: Story = {
  args: {
    value: 3,
  },
};
