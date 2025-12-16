import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { AppTabsComponent } from './app-tabs.component';
import { AppTabComponent } from './../app-tab/app-tab.component';
import { AppTabIconComponent } from './../app-tab-icon/app-tab-icon.component';
import { AppTabLabelComponent } from './../app-tab-label/app-tab-label.component';


const meta: Meta<AppTabsComponent> = {
  component: AppTabsComponent,
  title: 'App Tabs',
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
  decorators: [
    moduleMetadata({
      imports: [
        AppTabsComponent,
        AppTabComponent,
        AppTabIconComponent,
        AppTabLabelComponent,
      ]
    })
  ],
  parameters: {
    backgrounds: {
      default: 'blue',
      values: [
        { name: 'blue', value: '#000' },
      ],
    },
  },
  render: args => ({
    props: args,
    template: `
      <div style="width: 394px;">
        <ios-app-tabs ${argsToTemplate(args)}>
          <ios-app-tab [active]="true">
            <ios-app-tab-icon>
              A
            </ios-app-tab-icon>
            <ios-app-tab-label>
              Tab A
            </ios-app-tab-label>
          </ios-app-tab>

          <ios-app-tab>
            <ios-app-tab-icon>
              B
            </ios-app-tab-icon>
            <ios-app-tab-label>
              Tab B
            </ios-app-tab-label>
          </ios-app-tab>

          <ios-app-tab>
            <ios-app-tab-icon>
              C
            </ios-app-tab-icon>
            <ios-app-tab-label>
              Tab C
            </ios-app-tab-label>
          </ios-app-tab>
        </ios-app-tabs>
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<AppTabsComponent>;

export const Primary: Story = {
  args: {
    // percentage: 100,
    // isCharging: false,
  },
};
