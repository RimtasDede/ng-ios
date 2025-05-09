import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, group, keyframes, query, style } from '@angular/animations';

import { IosScreenService } from '@ng-ios/ios-services';
import { StatusBarGlobalComponent } from '@ng-ios/status-bar-global';

import { ApplicationInstalled } from '../../types';


const scaleInAnimationMeta = (
  { duration, scaleFrom, translate, heightFrom, borderRadiusFrom, borderRadiusTo }: {
    duration: number,
    scaleFrom: number,
    translate: string,
    heightFrom: string,
    borderRadiusFrom: number,
    borderRadiusTo: number,
  }
) => {
  return group([
    query('.window', [
      style({
        scale: scaleFrom,
        translate: translate,
      }),
      animate(
        `${duration}ms ease-out`,
        style({
          scale: 1,
          translate: 0,
        }),
      ),
    ]),

    query(
      '.window-height',
      [
        style({
          height: `${heightFrom}`,
          borderRadius: `${borderRadiusFrom}px`,
        }),
        animate(
          `${duration}ms ease-out`,
          style({
            height: '100%',
            borderRadius: `${borderRadiusTo}px`,
          }),
        ),
      ]
    ),

    query(
      '.app-icon',
      [
        animate(
          `${duration}ms ease-out`,
          keyframes([
            style({ offset: 0.2, opacity: 1 }),
            style({ offset: 0.6, opacity: 0 }),
          ]),
        ),
      ]
    ),

    query(
      '.window-overlay',
      [
        style({
          backgroundColor: 'rgba(0, 0, 0, 0)',
          backdropFilter: 'blur(0)',
        }),
        animate(
          `${duration}ms ease-out`,
          style({
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(10px)',
          }),
        ),
      ]
    ),
  ]);
}
// const scaleOutAnimation =

@Component({
  selector: 'lib-app-window',
  imports: [
    CommonModule,
    StatusBarGlobalComponent,
  ],
  templateUrl: './app-window.component.html',
  styleUrl: './app-window.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppWindowComponent implements AfterViewInit {

  app = input.required<ApplicationInstalled>();

  private readonly host = inject(ElementRef);
  private readonly animationBuilder = inject(AnimationBuilder);
  private readonly iosScreenService = inject(IosScreenService);


  private animationPlayer?: AnimationPlayer;

  ngAfterViewInit(): void {
    this.scaleIn();
  }

  private scaleIn() {
    // center
    const iconX = 333;
    const iconY = 305;
    const iconRadius = 15;
    // top left corner
    // const iconX = 302;
    // const iconY = 273;

    const screenW = this.iosScreenService.width();
    const screenH = this.iosScreenService.height();
    const scaleFrom = 62 / screenW;
    const translateX = iconX - screenW / 2;
    const translateY = iconY - screenH / 2;
    const heightFrom = 100 * (screenW / screenH);
    const borderRadiusFrom = iconRadius / scaleFrom;
    const borderRadiusTo = 40;
    const animation: AnimationFactory = this.animationBuilder.build(
      scaleInAnimationMeta({
        duration: 400,
        scaleFrom: scaleFrom,
        translate: `${translateX}px ${translateY}px`,
        heightFrom: `${heightFrom}%`,
        borderRadiusFrom: borderRadiusFrom,
        borderRadiusTo: borderRadiusTo,
      })
    );

    if (!this.animationPlayer) {
      this.animationPlayer = animation.create(this.host.nativeElement);
    }

    this.animationPlayer.play();
    // this.animationPlayer.pause();
    // this.animationPlayer.setPosition(0.15);
  }

}
