import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ios-app-tab-icon',
  imports: [CommonModule],
  templateUrl: './app-tab-icon.component.html',
  styleUrl: './app-tab-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTabIconComponent {}
