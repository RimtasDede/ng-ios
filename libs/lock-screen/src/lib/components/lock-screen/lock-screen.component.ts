import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LockScreenPanelComponent } from '../lock-screen-panel/lock-screen-panel.component';
import { UnlockScreenPanelComponent } from '../unlock-screen-panel/unlock-screen-panel.component';

@Component({
  selector: 'lib-lock-screen',
  imports: [
    CommonModule,
    LockScreenPanelComponent,
    UnlockScreenPanelComponent,
  ],
  templateUrl: './lock-screen.component.html',
  styleUrl: './lock-screen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LockScreenComponent {

}
