import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, inject, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';
import { delay, filter } from 'rxjs';

import { KeypadComponent, PasscodeDotsComponent, PressId } from '@ng-ios/ui';
import { IosLockService, PassCode } from '@ng-ios/ios-services';

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
  animations: [
    trigger('componentFade', [
      transition(':enter', [
        group([
          query('@*', [animateChild()]),
          query(
            '.overlay',
            [
              style({
                backgroundColor: 'rgba(0, 0, 0, 0)',
                backdropFilter: 'blur(0)',
              }),
              animate(
                300,
                style({
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  backdropFilter: 'blur(16px)',
                })
              )
            ]
          ),

          query(
            '.passcode-box, .controls-box',
            [
              style({
                opacity: 0,
              }),
              animate(300, style({ opacity: 1 }))
            ]
          ),
        ]),
      ]),

      transition(':leave', [
        group([
          query('@*', [animateChild()]),
          query(
            '.overlay',
            [
              style({
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(16px)',
              }),
              animate(
                300,
                style({
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  backdropFilter: 'blur(0)',
                })
              )
            ]
          ),

          query(
            '.passcode-box, .controls-box',
            [
              style({
                opacity: 1,
              }),
              animate(300, style({ opacity: 0 }))
            ]
          ),
        ]),
      ]),
    ]),
  ]
})
export class UnlockScreenPanelComponent implements OnInit, OnDestroy {

  @Output() hide = new EventEmitter();

  @HostBinding('@componentFade') componentFade = true;

  private readonly iosLockService = inject(IosLockService);

  readonly passCode = this.iosLockService.passCode;
  readonly enteredCode = signal<PassCode>([]);
  readonly enteredCode$ = toObservable(this.enteredCode);
  isPassCodeInvalid: boolean = false;

  ngOnInit(): void {
    this.enteredCode$
      .pipe(
        delay(100),
        filter(val => this.passCode().length === val.length),
      )
      .subscribe(val => {
        const isValid = this.iosLockService.testPassCode(val);

        if (isValid) {
          this.iosLockService.unlock();
        } else {
          this.enteredCode.set([]);
          this.isPassCodeInvalid = true;

          setTimeout(() => {
            this.isPassCodeInvalid = false;
          }, 500);
        }
      });
  }

  ngOnDestroy(): void {
    console.log('destroy');
  }

  appendCode(id: PressId) {
    this.enteredCode.update(values => {
      return [...values, +id];
    });
  }

  deletePassCode() {
    this.enteredCode.update(values => {
      return values.slice(0, -1);
    });
  }

  close() {
    this.hide.emit();
  }

}
