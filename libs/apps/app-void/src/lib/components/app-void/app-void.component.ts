import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-app-void',
  imports: [CommonModule],
  templateUrl: './app-void.component.html',
  styleUrl: './app-void.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppVoidComponent {}
