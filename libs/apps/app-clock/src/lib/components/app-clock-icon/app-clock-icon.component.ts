import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, OnDestroy, Renderer2, viewChild, viewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';

import { IosDateTimeService } from '@ng-ios/ios-services';
import { Subscription } from 'rxjs';


@Component({
  selector: 'lib-app-clock-icon',
  imports: [CommonModule],
  templateUrl: './app-clock-icon.component.html',
  styleUrl: './app-clock-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppClockIconComponent implements AfterViewInit, OnDestroy {

  private readonly renderer = inject(Renderer2);
  private readonly iosDateTimeService = inject(IosDateTimeService);

  private clock = viewChild<ElementRef>('clock');
  private hourArrow = viewChild<ElementRef>('hourArrow');
  private minuteArrow = viewChild<ElementRef>('minuteArrow');
  private secondArrow = viewChild<ElementRef>('secondArrow');
  private numbersArr = viewChildren<ElementRef>('number');

  private datetimeSub?: Subscription;
  numbers = Array.from({ length: 12 }, (_, i) => i + 1);
  private datetime = toObservable(this.iosDateTimeService.datetime);

  ngAfterViewInit(): void {
    this.placeNumbers();

    this.datetimeSub = this.datetime
      .subscribe(timestamp => {
        this.moveArrows(timestamp);
      });
  }

  ngOnDestroy(): void {
    this.datetimeSub?.unsubscribe();
  }

  private placeNumbers() {
    const clockWidth = this.clock()?.nativeElement.clientWidth;
    const radius = clockWidth * 0.4;
    const centerX = clockWidth * 0.42;
    const centerY = clockWidth * 0.39;

    for (const i in this.numbers) {
      const num = this.numbers[i];
      const angle = ((num - 3) * 30) * (Math.PI / 180);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      this.renderer.setStyle(this.numbersArr()[i].nativeElement, 'top', `${y}px`);
      this.renderer.setStyle(this.numbersArr()[i].nativeElement, 'left', `${x}px`);
    }
  }

  private moveArrows(timestamp: number) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const secondAngle = seconds * 6;
    const minuteAngle = minutes * 6 + seconds * 0.1;
    const hourAngle = hours * 30 + minutes * 0.5;

    this.renderer.setStyle(this.hourArrow()?.nativeElement, 'rotate', `${hourAngle - 90}deg`);
    this.renderer.setStyle(this.minuteArrow()?.nativeElement, 'rotate', `${minuteAngle - 90}deg`);
    this.renderer.setStyle(this.secondArrow()?.nativeElement, 'rotate', `${secondAngle - 90}deg`);
  }

}
