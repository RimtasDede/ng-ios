import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, OnDestroy, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, group, keyframes, query, style, AnimationBuilder, AnimationFactory, AnimationPlayer } from '@angular/animations';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, pairwise, Subscription, takeUntil } from 'rxjs';

import { createCubicBezierEaseOutInverse } from '@ng-ios/utility';
import { MoveEvent, MoveEventType } from '@ng-ios/touch';
import { IosScreenService, WallpaperDirective } from '@ng-ios/ios-services';

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
export class LockScreenBoxComponent implements OnDestroy {

  /**
   * Is initially opened
   */
  open = input<boolean>(false);

  /**
   * Lock screen is hidden (swiped up)
   */
  close = output<void>();

  private readonly host = inject(ElementRef);
  private readonly animationBuilder = inject(AnimationBuilder);
  private readonly iosScreenService = inject(IosScreenService);
  private readonly lockScreenService = inject(LockScreenService);


  isOpened = signal<boolean>(false);
  private screenHeight = this.iosScreenService.height;
  private animationId?: number;
  private cubicBezierEaseOutInverse = createCubicBezierEaseOutInverse();
  private animation: AnimationFactory = this.animationBuilder.build(slideDownAnimation);
  private animationReverse: AnimationFactory = this.animationBuilder.build(slideDownReverseAnimation);
  private animationPlayer?: AnimationPlayer;
  private swipe$ = toObservable(this.lockScreenService.swipe)
    .pipe(
      map(e => {
        if (e) {
          if (e.deltaY < 0) {
            e.deltaY = 0;
          }

          if (e.deltaY > this.screenHeight()) {
            e.deltaY = this.screenHeight();
          }
        }

        return e;
      }),
    );
  private swipeSub: Subscription;

  constructor() {
    effect(() => {
      this.isOpened.set(this.open());
    });

    this.swipeSub = this.swipe$
      .pipe(
        pairwise(),
        filter(([ePrev]) => ePrev?.type !== MoveEventType.SwipeUp && ePrev?.type !== MoveEventType.SwipeDown),
        map(([, eCurr]) => eCurr),
        filter((e): e is MoveEvent => !!e),
      )
      .subscribe(e => {
        if (e.type === MoveEventType.PanUp || e.type === MoveEventType.PanDown) {
          this.swipeScreen(e.deltaY);
        } else if (e.type === MoveEventType.PanEnd) {
          const finishAnimateToBottom = this.screenHeight() / 2 < e.deltaY;

          if (finishAnimateToBottom) {
            this.openScreen();
          } else {
            this.closeScreen(e.deltaY);
          }
        } else if (e.type === MoveEventType.SwipeUp) {
          this.closeScreen(e.deltaY);
        } else if (e.type === MoveEventType.SwipeDown) {
          this.openScreen();
        }
      });
  }

  ngOnDestroy(): void {
    this.swipeSub.unsubscribe();
  }


  private swipeScreen(deltaY: number): void {
    this.isOpened.set(false);

    if (!this.animationPlayer) {
      this.animationPlayer = this.animation.create(this.host.nativeElement);
    }

    this.animationId = requestAnimationFrame(() => {
      const position = this.cubicBezierEaseOutInverse(deltaY / this.screenHeight());

      this.animationPlayer?.setPosition(position);
    });
  }

  private openScreen(): void {
    this.animationPlayer?.onDone(() => {
      this.animationPlayer = undefined;
      this.isOpened.set(true);
    });
    this.animationPlayer?.play();
  }

  private closeScreen(deltaY: number): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    this.animationPlayer = this.animationReverse.create(this.host.nativeElement);
    const position = this.cubicBezierEaseOutInverse((this.screenHeight() - deltaY) / this.screenHeight());

    this.animationPlayer.onDone(() => {
      this.animationPlayer = undefined;
      this.close.emit();
    });

    this.animationPlayer.setPosition(position);
    this.animationPlayer.play();
  }

}
