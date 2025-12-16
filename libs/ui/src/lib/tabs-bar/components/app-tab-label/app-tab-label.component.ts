import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ios-app-tab-label',
  imports: [CommonModule],
  templateUrl: './app-tab-label.component.html',
  styleUrl: './app-tab-label.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTabLabelComponent {}
