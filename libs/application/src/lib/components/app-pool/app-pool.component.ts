import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-app-pool',
  imports: [CommonModule],
  templateUrl: './app-pool.component.html',
  styleUrl: './app-pool.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppPoolComponent {}
