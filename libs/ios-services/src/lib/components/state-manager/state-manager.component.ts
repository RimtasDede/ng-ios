import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

import { animateChildAnimation } from '@ng-ios/animations';

import { IosBatteryService } from '../../services/ios-battery.service';
import { IosCommonService } from '../../services/ios-common.service';
import { IosDateTimeService } from '../../services/ios-date-time.service';
import { IosLockService } from '../../services/ios-lock.service';
import { IosScreenService } from '../../services/ios-screen.service';
import { IosSignalService } from '../../services/ios-signal.service';
import { IosWallpaperService } from '../../services/ios-wallpaper.service';
import { IosWifiService } from '../../services/ios-wifi.service';


@Component({
  selector: 'lib-state-manager',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './state-manager.component.html',
  styleUrl: './state-manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    animateChildAnimation(),
    trigger('slideOut', [
      transition(':enter', [
        style({ translate: '100% 0' }),
        animate(
          '250ms ease-out',
          style({ translate: '0 0' }),
        ),
      ]),
      transition(':leave', [
        style({ translate: '0 0' }),
        animate(
          '250ms ease-in',
          style({ translate: '100% 0' }),
        ),
      ]),
    ]),

    trigger('backdropFade', [
      transition(':enter', [
        style({
          background: 'rgba(0,0,0,0)',
          backdropFilter: 'blur(0px)',
        }),
        animate(
          '250ms ease-out',
          style({
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(6px)',
          }),
        ),
      ]),
      transition(':leave', [
        style({
          background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(6px)',
        }),
        animate(
          '250ms ease-in',
          style({
            background: 'rgba(0,0,0,0)',
            backdropFilter: 'blur(0px)',
          }),
        ),
      ]),
    ]),
  ],
})
export class StateManagerComponent implements OnInit {

  private iosBatteryService = inject(IosBatteryService);
  private iosCommonService = inject(IosCommonService);
  private iosDateTimeService = inject(IosDateTimeService);
  private iosLockService = inject(IosLockService);
  private iosScreenService = inject(IosScreenService);
  private iosSignalService = inject(IosSignalService);
  private iosWallpaperService = inject(IosWallpaperService);
  private iosWifiService = inject(IosWifiService);

  passCodeMin = this.iosLockService.passCodeMin;
  passCodeMax = this.iosLockService.passCodeMax;
  wallpapers = this.iosWallpaperService.wallpapers;

  form = new FormGroup({
    batteryPercentage: new FormControl(),
    isCharging: new FormControl(),
    isFlashlightOn: new FormControl(),
    isLocked: new FormControl(),
    passCode: new FormControl('', [
      Validators.pattern(/^[0-9]*$/),
      Validators.minLength(this.passCodeMin),
      Validators.maxLength(this.passCodeMax),
    ]),
    screenTop: new FormControl({ value: 0, disabled: true }),
    screenLeft: new FormControl({ value: 0, disabled: true }),
    screenWidth: new FormControl({ value: 0, disabled: true }),
    screenHeight: new FormControl({ value: 0, disabled: true }),
    signalStrength: new FormControl(),
    wallpaper: new FormControl(),
    wifiStrength: new FormControl(),
  });

  isOpen = false;


  ngOnInit(): void {
    setTimeout(() => {
      this.fillState();
    });

    this.updateChanges([
      {
        key: 'batteryPercentage',
        updateFn: val => {
          this.iosBatteryService.percentage.set(val);
        },
      },
      {
        key: 'isCharging',
        updateFn: val => {
          this.iosBatteryService.isCharging.set(val);
        },
      },

      {
        key: 'isFlashlightOn',
        updateFn: val => {
          this.iosCommonService.isFlashlightOn.set(val);
        },
      },

      {
        key: 'isLocked',
        updateFn: val => {
          this.iosLockService.isLocked.set(val);
        },
      },
      {
        key: 'passCode',
        updateFn: val => {
          this.iosLockService.passCode.set(val.split('').map((val: string) => +val));
        },
      },

      {
        key: 'signalStrength',
        updateFn: val => {
          this.iosSignalService.signalStrength.set(val);
        },
      },

      {
        key: 'wallpaper',
        updateFn: val => {
          this.iosWallpaperService.active.set(val);
        },
      },

      {
        key: 'wifiStrength',
        updateFn: val => {
          this.iosWifiService.signalStrength.set(val);
        },
      },
    ]);
  }


  toggleManager() {
    this.isOpen = !this.isOpen;
  }

  private fillState() {
    this.form.setValue({
      batteryPercentage: this.iosBatteryService.percentage(),
      isCharging: this.iosBatteryService.isCharging(),
      isFlashlightOn: this.iosCommonService.isFlashlightOn(),
      isLocked: this.iosLockService.isLocked(),
      passCode: this.iosLockService.passCode().join(''),
      screenTop: this.iosScreenService.top(),
      screenLeft: this.iosScreenService.left(),
      screenWidth: this.iosScreenService.width(),
      screenHeight: this.iosScreenService.height(),
      signalStrength: this.iosSignalService.signalStrength(),
      wallpaper: this.iosWallpaperService.active(),
      wifiStrength: this.iosWifiService.signalStrength(),
    });
  }

  private updateChanges(arr: { key: string, updateFn: (_: any) => void }[]): void {
    arr.forEach(({ key, updateFn }) => {
      this.form.get(key)?.valueChanges
        .subscribe(val => {
          if(this.form.get(key)?.invalid) {
            return;
          }

          updateFn(val);
        });
    });
  }

}
