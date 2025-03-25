import type { Meta, StoryObj } from '@storybook/angular';
import { PasscodeDotsComponent } from './passcode-dots.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<PasscodeDotsComponent> = {
  component: PasscodeDotsComponent,
  title: 'PasscodeDotsComponent',
};
export default meta;
type Story = StoryObj<PasscodeDotsComponent>;

export const Primary: Story = {
  args: {
    passCode: [],
    passCodeEntered: [],
    invalid: false,
  },
};

export const Heading: Story = {
  args: {
    passCode: [],
    passCodeEntered: [],
    invalid: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/passcode-dots works!/gi)).toBeTruthy();
  },
};
