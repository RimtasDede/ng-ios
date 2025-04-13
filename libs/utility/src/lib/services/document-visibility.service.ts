import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';

/**
 * Help check do browser is minimised or tab is inactive
 */
@Injectable({ providedIn: 'root' })
export class DocumentVisibilityService {

  private visibilitySubject = new BehaviorSubject<boolean>(!document.hidden);
  visibilityChange$ = this.visibilitySubject.asObservable();

  constructor() {
    fromEvent(document, 'visibilitychange')
      .subscribe(() => {
        this.visibilitySubject.next(!document.hidden);
      });
  }

}
