import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeypadComponent, PressId } from '@ng-ios/ui';
import { IosLockService } from '@ng-ios/ios-services';

@Component({
  selector: 'lib-unlock-screen-panel',
  imports: [
    CommonModule,
    KeypadComponent,
  ],
  templateUrl: './unlock-screen-panel.component.html',
  styleUrl: './unlock-screen-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnlockScreenPanelComponent {

  @Input() display: boolean = false;

  private readonly iosLockService = inject(IosLockService);

  enteredCode = [];

  appendKey(id: PressId) {
    // this.enteredCode
    console.log('id', id);
  }

}
