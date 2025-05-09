/* eslint-disable @angular-eslint/directive-selector */
import { Directive, inject, ViewContainerRef } from '@angular/core';

import { AppPoolService } from '../services/app-pool.service';


@Directive({
  selector: '[appPoolContainer]',
})
export class AppPoolContainerDirective {

  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly appPoolService = inject(AppPoolService);

  constructor() {
    // this.appPoolService.setViewContainerRef(this.viewContainerRef);
  }

}
