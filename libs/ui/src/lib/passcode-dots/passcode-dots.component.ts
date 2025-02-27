import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
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

  /**
   * Is entered code is invalid.
   * This adds shake animation for this component.
   */
  @HostBinding('class.invalid') @Input() invalid: boolean = false;

}
