import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-home-indicator',
  imports: [CommonModule],
  templateUrl: './home-indicator.component.html',
  styleUrl: './home-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeIndicatorComponent {}
