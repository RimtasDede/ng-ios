import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-app-void-icon',
  imports: [CommonModule],
  templateUrl: './app-void-icon.component.html',
  styleUrl: './app-void-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppVoidIconComponent {}
