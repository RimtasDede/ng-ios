import { Injectable, signal } from '@angular/core';

import { MoveEvent } from '@ng-ios/touch';


@Injectable({
  providedIn: 'root'
})
export class LockScreenService {

  readonly swipe = signal<MoveEvent | undefined>(undefined);

}
