import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, group, keyframes, query, style, AnimationBuilder, AnimationFactory, AnimationPlayer } from '@angular/animations';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, skip } from 'rxjs';

import { IosScreenService, WallpaperDirective } from '@ng-ios/ios-services';
import { createCubicBezierEaseOutInverse } from '@ng-ios/utility';

import { LockScreenComponent } from '../lock-screen/lock-screen.component';
import { LockScreenService } from '../../services/lock-screen.service';

const animationDuration = 500;
const slideDownAnimation = group([
  query(
    '.wallpaper',
    [
      style({ maskSize: '100% 0%', opacity: 0 }),
      animate(`${animationDuration}ms ease-out`, keyframes([
        style({ maskSize: '100% 0%', offset: 0 }),
        style({ maskSize: '100% 30%', opacity: 0, offset: 0.3 }),
        style({ maskSize: '100% 60%', opacity: 1, offset: 0.6 }),
        style({ maskSize: '100% 100%', offset: 1 }),
      ])),
    ],
  ),
  query(
    '.blur-filter',
    [
      style({ transform: 'translateY(0)', backdropFilter: 'blur(7px)' }),
      animate(`${animationDuration}ms ease-out`, keyframes([
        style({ transform: 'translateY(0)', backdropFilter: 'blur(7px)', offset: 0 }),
        style({ transform: 'translateY(60%)', backdropFilter: 'blur(7px)', offset: 0.6 }),
        style({ transform: 'translateY(80%)', backdropFilter: 'blur(0)', offset: 0.8 }),
        style({ transform: 'translateY(100%)', backdropFilter: 'blur(0)', offset: 1 }),
      ])),
    ],
  ),
  query(
    '.content',
    [
      animate(`${animationDuration}ms ease-out`, keyframes([
        style({ transform: 'translateY(0)', offset: 0 }),
        style({ transform: 'translateY(100%)', offset: 1 }),
      ])),
    ],
  ),
]);

const slideDownReverseAnimation = group([
  query(
    '.wallpaper',
    [
      style({ maskSize: '100% 100%', opacity: 1 }),
      animate(`${animationDuration}ms ease-out`, keyframes([
        style({ maskSize: '100% 100%', opacity: 1, offset: 0 }),
        style({ maskSize: '100% 60%', opacity: 1, offset: 0.4 }),
        style({ maskSize: '100% 30%', opacity: 0, offset: 0.7 }),
        style({ maskSize: '100% 0%', opacity: 0, offset: 1 }),
      ])),
    ],
  ),
  query(
    '.blur-filter',
    [
      style({ transform: 'translateY(100%)', backdropFilter: 'blur(0)' }),
      animate(`${animationDuration}ms ease-out`, keyframes([
        style({ transform: 'translateY(100%)', backdropFilter: 'blur(0)', offset: 0 }),
        style({ transform: 'translateY(80%)', backdropFilter: 'blur(0)', offset: 0.2 }),
        style({ transform: 'translateY(60%)', backdropFilter: 'blur(7px)', offset: 0.4 }),
        style({ transform: 'translateY(0)', backdropFilter: 'blur(7px)', offset: 1 }),
      ])),
    ],
  ),
  query(
    '.content',
    [
      animate(`${animationDuration}ms ease-out`, keyframes([
        style({ transform: 'translateY(100%)', offset: 0 }),
        style({ transform: 'translateY(0)', offset: 1 }),
      ])),
    ],
  ),
]);

@Component({
  selector: 'lib-lock-screen-box',
  imports: [
    CommonModule,
    LockScreenComponent,
    WallpaperDirective,
  ],
  templateUrl: './lock-screen-box.component.html',
  styleUrl: './lock-screen-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.opened]': 'isOpened()',
  },
})
export class LockScreenBoxComponent {

  /**
   * Is initially opened
   */
  @Input() set open(value: boolean | undefined) {
    const isOpened = value || false;

    this.isOpened.set(isOpened);
  }

  /**
   * Lock screen is hidden (swiped up)
   */
  @Output() close = new EventEmitter<void>();

  private readonly host = inject(ElementRef);
  private readonly animationBuilder = inject(AnimationBuilder);
  private readonly iosScreenService = inject(IosScreenService);
  private readonly lockScreenService = inject(LockScreenService);


  isOpened = signal<boolean>(false);
  private cubicBezierEaseOutInverse = createCubicBezierEaseOutInverse();
  private animation: AnimationFactory = this.animationBuilder.build(slideDownAnimation);
  private animationReverse: AnimationFactory = this.animationBuilder.build(slideDownReverseAnimation);
  private animationPlayer?: AnimationPlayer;
  private swipe$ = toObservable(this.lockScreenService.deltaY);
  private swipeRelease$ = toObservable(this.lockScreenService.swipeRelease);
  private screenHeight = this.iosScreenService.height;

  constructor() {
    // swipe bottom
    this.swipe$
      .pipe(
        filter(deltaY => !!deltaY),
      )
      .subscribe(deltaY => {
        if (!deltaY) {
          return;
        }

        if (!this.animationPlayer) {
          this.animationPlayer = this.animation.create(this.host.nativeElement);
        }

        requestAnimationFrame(() => {
          const position = this.cubicBezierEaseOutInverse(deltaY / this.screenHeight());

          this.animationPlayer?.setPosition(position);
        });
      });

    // swipe release
    this.swipeRelease$
      .pipe(
        skip(1),
      )
      .subscribe(deltaY => {
        const finishAnimateToBottom = this.screenHeight() / 2 < deltaY;

        if (finishAnimateToBottom) {
          this.animationPlayer?.onDone(() => {
            this.isOpened.set(true);
          });
          this.animationPlayer?.play();
        } else {
          this.animationPlayer = this.animationReverse.create(this.host.nativeElement);
          const position = this.cubicBezierEaseOutInverse((this.screenHeight() - deltaY) / this.screenHeight());

          this.animationPlayer.onDone(() => {
            this.animationPlayer = undefined;
            this.close.emit();
          });

          this.animationPlayer.setPosition(position);
          this.animationPlayer.play();
        }
      });
  }

}
