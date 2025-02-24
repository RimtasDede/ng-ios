import { Injectable, signal } from '@angular/core';

@Injectable()
export class IosCommonService {

  readonly isFlashlightOn = signal<boolean>(false);

  constructor() {
  }

}
