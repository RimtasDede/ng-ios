import { Injectable, signal } from '@angular/core';

@Injectable()
export class IosBatteryService {

  readonly percentage = signal<number>(0);
  readonly isCharging = signal<boolean>(true);

  constructor() {
    this.percentage.set(50);
  }

}
