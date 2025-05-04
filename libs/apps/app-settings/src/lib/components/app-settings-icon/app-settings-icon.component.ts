import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-app-settings-icon',
  imports: [CommonModule],
  templateUrl: './app-settings-icon.component.html',
  styleUrl: './app-settings-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSettingsIconComponent {}
