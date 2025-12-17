import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-home-indicator',
  templateUrl: './home-indicator.component.html',
  styleUrl: './home-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeIndicatorComponent {}
