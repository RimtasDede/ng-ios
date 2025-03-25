import type { Meta, StoryObj } from '@storybook/angular';
import { HomeIndicatorComponent } from './home-indicator.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<HomeIndicatorComponent> = {
  component: HomeIndicatorComponent,
  title: 'HomeIndicatorComponent',
};
export default meta;
type Story = StoryObj<HomeIndicatorComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/home-indicator works!/gi)).toBeTruthy();
  },
};
