import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppPoolService } from '../../services/app-pool.service';
import { AppWindowComponent } from '../app-window/app-window.component';


@Component({
  selector: 'lib-app-pool',
  imports: [
    CommonModule,
    AppWindowComponent,
  ],
  templateUrl: './app-pool.component.html',
  styleUrl: './app-pool.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppPoolComponent {

  private readonly cd = inject(ChangeDetectorRef);
  private readonly appPoolService = inject(AppPoolService);

  poolApps = this.appPoolService.apps;

  constructor() {
    // setTimeout(() => {
    //   this.cd.markForCheck();
    //   this.cd.detectChanges();
    // }, 1000);
  }

}
