import type { Meta, StoryObj } from '@storybook/angular';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { PaginationComponent } from './pagination.component';

const meta: Meta<PaginationComponent> = {
  component: PaginationComponent,
  title: 'PaginationComponent',
};
export default meta;
type Story = StoryObj<PaginationComponent>;

export const Primary: Story = {
  args: {
    pagesTotal: 10,
    currentPage: 1,
    maxWidth: 4,
  },
};

export const Heading: Story = {
  args: {
    pagesTotal: 0,
    currentPage: 0,
    maxWidth: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/pagination works!/gi)).toBeTruthy();
  },
};
