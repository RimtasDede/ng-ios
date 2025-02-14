import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-today-view',
  imports: [CommonModule],
  templateUrl: './today-view.component.html',
  styleUrl: './today-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodayViewComponent {}
