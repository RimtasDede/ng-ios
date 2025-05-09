import { AfterViewInit, ChangeDetectionStrategy, Component, inject, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';

import { IosDateTimeService } from '@ng-ios/ios-services';


@Component({
  selector: 'lib-app-clock-icon',
  imports: [CommonModule],
  templateUrl: './app-clock-icon.component.html',
  styleUrl: './app-clock-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppClockIconComponent implements AfterViewInit, OnDestroy {

  private readonly iosDateTimeService = inject(IosDateTimeService);

  private datetimeSub?: Subscription;
  private datetime = toObservable(this.iosDateTimeService.datetime);

  hourAngle = signal(0);
  minuteAngle = signal(0);
  secondAngle = signal(0);

  ngAfterViewInit(): void {
    this.datetimeSub = this.datetime
      .subscribe(timestamp => {
        this.moveArrows(timestamp);
      });
  }

  ngOnDestroy(): void {
    this.datetimeSub?.unsubscribe();
  }

  private moveArrows(timestamp: number) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const secondAngle = seconds * 6;
    const minuteAngle = minutes * 6 + seconds * 0.1;
    const hourAngle = hours * 30 + minutes * 0.5;

    this.hourAngle.set(hourAngle);
    this.minuteAngle.set(minuteAngle);
    this.secondAngle.set(secondAngle);
  }

}
