import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-app-clock',
  imports: [CommonModule],
  templateUrl: './app-clock.component.html',
  styleUrl: './app-clock.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppClockComponent {}
