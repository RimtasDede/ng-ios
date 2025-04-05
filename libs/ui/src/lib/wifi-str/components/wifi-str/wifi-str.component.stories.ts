import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';

import { WifiStrComponent } from './wifi-str.component';


const meta: Meta<WifiStrComponent> = {
  component: WifiStrComponent,
  title: 'Wifi Strenght',
  argTypes: {
    value: {
      control: {
        type: 'number',
        min: 0,
        max: 3,
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
        <ios-wifi-str ${argsToTemplate(args)} />
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<WifiStrComponent>;

export const Primary: Story = {
  args: {
    value: 3,
  },
};
