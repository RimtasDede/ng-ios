import { Injectable, signal } from '@angular/core';

export type PassCode = number[];

@Injectable()
export class IosLockService {

  readonly isLocked = signal<boolean>(false);

  readonly passCodeMin = 4;
  readonly passCodeMax = 10;
  readonly passCode = signal<PassCode>([1, 2, 3, 4, 5, 6]);

  constructor() {
    // this.isLocked.set(true);
  }

  /**
   * Test passcode validity
   */
  testPassCode(passCode: PassCode): boolean {
    return this.passCode().every((val, i) => val === passCode[i]);
  }

  lock() {
    this.isLocked.set(true);
  }

  unlock() {
    this.isLocked.set(false);
  }

}
