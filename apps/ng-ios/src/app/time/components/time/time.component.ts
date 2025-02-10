import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentVisibilityService } from '@ng-ios/utility';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-time',
  imports: [
    CommonModule,
  ],
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss',
})
export class TimeComponent implements OnInit, OnDestroy {

  private documentVisibilityService = inject(DocumentVisibilityService);

  currentTime = signal<Date>(new Date());
  private intervalId?: ReturnType<typeof setInterval>;
  private visibilitySub?: Subscription;

  ngOnInit(): void {
    this.documentVisibilityService.visibilityChange$
      .subscribe(isVisible => {
        if (isVisible) {
          this.startTimer();
        } else {
          this.stopTimer();
        }
      });
  }

  ngOnDestroy(): void {
    this.startTimer();
    this.visibilitySub?.unsubscribe();
  }

  private startTimer() {
    this.intervalId = setInterval(() => {
      this.currentTime.set(new Date());
    }, 1000);
  }

  private stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}
