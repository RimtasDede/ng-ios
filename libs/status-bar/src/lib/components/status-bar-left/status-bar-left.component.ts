import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-status-bar-left',
  imports: [CommonModule],
  templateUrl: './status-bar-left.component.html',
  styleUrl: './status-bar-left.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBarLeftComponent {}
