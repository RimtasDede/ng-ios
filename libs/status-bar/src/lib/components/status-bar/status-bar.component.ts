import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'lib-status-bar',
  imports: [
    CommonModule,
  ],
  templateUrl: './status-bar.component.html',
  styleUrl: './status-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBarComponent {}
