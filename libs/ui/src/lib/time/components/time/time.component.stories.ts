import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';

import { TimeComponent } from './time.component';


const meta: Meta<TimeComponent> = {
  component: TimeComponent,
  title: 'Time',
  argTypes: {
    datetime: {
      control: {
        type: 'date',
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
        <ios-time ${argsToTemplate(args)} />
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<TimeComponent>;

export const Primary: Story = {
  args: {
    datetime: 1716715151111,
  },
};
