import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LockScreenService {

  /**
   * How much in pixels lock screen is swiped down
   */
  readonly deltaY = signal<number | undefined>(0);

  /**
   * Lock screen swipe bottom release event
   */
  readonly swipeRelease = signal<number>(0);

}
