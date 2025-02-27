import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-passcode-dots',
  imports: [CommonModule],
  templateUrl: './passcode-dots.component.html',
  styleUrl: './passcode-dots.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasscodeDotsComponent {

  /**
   * Passcode length
   */
  @Input({ required: true }) passCode: number[] = [];

  /**
   * Entered passcode length
   */
  @Input() passCodeEntered: number[] = [];

}
