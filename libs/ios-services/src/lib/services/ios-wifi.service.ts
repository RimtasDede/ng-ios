import { Injectable, signal } from '@angular/core';

type WifiSignalStrength = 0 | 1 | 2 | 3;

@Injectable()
export class IosWifiService {

  signalStrength = signal<WifiSignalStrength>(0);

  constructor() {
    this.signalStrength.set(3);
  }

}
