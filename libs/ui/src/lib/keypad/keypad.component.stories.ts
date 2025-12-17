import type { Meta, StoryObj } from '@storybook/angular';
import { KeypadComponent } from './keypad.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<KeypadComponent> = {
  component: KeypadComponent,
  title: 'KeypadComponent',
};
export default meta;
type Story = StoryObj<KeypadComponent>;

export const Primary: Story = {
  args: {
    type: 'unlock',
  },
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/keypad works!/gi)).toBeTruthy();
  },
};
