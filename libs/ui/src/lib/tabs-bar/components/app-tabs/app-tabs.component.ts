/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ios-app-tabs',
  imports: [CommonModule],
  templateUrl: './app-tabs.component.html',
  styleUrl: './app-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTabsComponent {}
