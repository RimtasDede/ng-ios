/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'icon-globe',
  templateUrl: './globe.component.html',
  styleUrl: './globe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobeComponent {}
