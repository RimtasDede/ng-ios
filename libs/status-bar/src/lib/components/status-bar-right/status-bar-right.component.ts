import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-status-bar-right',
  imports: [CommonModule],
  templateUrl: './status-bar-right.component.html',
  styleUrl: './status-bar-right.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBarRightComponent {}
