import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeComponent } from '@ng-ios/ui';
import { IosDateTimeService } from '@ng-ios/ios-services';


@Component({
  selector: 'lib-status-bar-time',
  imports: [
    CommonModule,
    TimeComponent,
  ],
  templateUrl: './status-bar-time.component.html',
  styleUrl: './status-bar-time.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBarTimeComponent {

  private readonly iosDateTimeService = inject(IosDateTimeService);

  datetime = this.iosDateTimeService.datetime;

}
