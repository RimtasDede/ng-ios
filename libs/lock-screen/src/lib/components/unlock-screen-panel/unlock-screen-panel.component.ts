import { ChangeDetectionStrategy, Component, inject, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';

import { KeypadComponent, PasscodeDotsComponent, PressId } from '@ng-ios/ui';
import { IosLockService, PassCode } from '@ng-ios/ios-services';
import { delay, filter } from 'rxjs';

@Component({
  selector: 'lib-unlock-screen-panel',
  imports: [
    CommonModule,
    PasscodeDotsComponent,
    KeypadComponent,
  ],
  templateUrl: './unlock-screen-panel.component.html',
  styleUrl: './unlock-screen-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnlockScreenPanelComponent implements OnInit {

  @Input() display: boolean = false;

  private readonly iosLockService = inject(IosLockService);

  readonly passCode = this.iosLockService.passCode;
  readonly enteredCode = signal<PassCode>([]);
  readonly enteredCode$ = toObservable(this.enteredCode);

  ngOnInit(): void {
    this.enteredCode$
      .pipe(
        delay(100),
        filter(val => this.passCode().length === val.length),
      )
      .subscribe(val => {
        const codePass = this.iosLockService.testPassCode(val);

        if (codePass) {
          this.iosLockService.unlock();
        } else {
          this.enteredCode.set([]);
        }
      });
  }

  appendCode(id: PressId) {
    this.enteredCode.update(values => {
      return [...values, +id];
    });
  }

}
