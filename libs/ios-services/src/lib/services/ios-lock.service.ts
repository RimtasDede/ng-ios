import { Injectable, signal } from '@angular/core';

@Injectable()
export class IosLockService {

  readonly isLocked = signal<boolean>(false);

  readonly passCode = signal<number[]>([1, 2, 3, 4, 5, 6]);

  constructor() {
    this.isLocked.set(true);
  }

}
