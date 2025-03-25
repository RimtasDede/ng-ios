import type { Meta, StoryObj } from '@storybook/angular';
import { HomeScreenFavAppsBarComponent } from './home-screen-fav-apps-bar.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<HomeScreenFavAppsBarComponent> = {
  component: HomeScreenFavAppsBarComponent,
  title: 'HomeScreenFavAppsBarComponent',
};
export default meta;
type Story = StoryObj<HomeScreenFavAppsBarComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/home-screen-fav-apps-bar works!/gi)).toBeTruthy();
  },
};
