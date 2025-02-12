import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IosDateTimeService } from '@ng-ios/ios-services';

@Component({
  selector: 'app-time',
  imports: [
    CommonModule,
  ],
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss',
})
export class TimeComponent {

  private iosDateTimeService = inject(IosDateTimeService);

  datetime = this.iosDateTimeService.datetime;

}
