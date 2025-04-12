import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import { Subscription } from 'rxjs';

import { DocumentVisibilityService } from '@ng-ios/utility';


@Injectable()
export class IosDateTimeService implements OnDestroy {

  private readonly documentVisibilityService = inject(DocumentVisibilityService);

  readonly datetime = signal<number>(new Date().valueOf());
  private intervalId?: ReturnType<typeof setInterval>;
  private visibilitySub?: Subscription;

  constructor() {
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
    this.stopTimer();
    this.visibilitySub?.unsubscribe();
  }

  private startTimer() {
    this.datetime.set(new Date().valueOf());

    this.intervalId = setInterval(() => {
      this.datetime.set(new Date().valueOf());
    }, 1000);
  }

  private stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}
