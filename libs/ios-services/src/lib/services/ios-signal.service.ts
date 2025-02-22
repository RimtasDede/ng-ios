import { Injectable, signal } from '@angular/core';

type SignalStrength = 0 | 1 | 2 | 3 | 4;

@Injectable()
export class IosSignalService {

  signalStrength = signal<SignalStrength>(0);

  constructor() {
    this.signalStrength.set(3);
  }

}
