import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-app-window',
  imports: [CommonModule],
  templateUrl: './app-window.component.html',
  styleUrl: './app-window.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppWindowComponent {}
