import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { SvgIconComponent } from 'angular-svg-icon';

export enum PressId {
  Key0 = '0',
  Key1 = '1',
  Key2 = '2',
  Key3 = '3',
  Key4 = '4',
  Key5 = '5',
  Key6 = '6',
  Key7 = '7',
  Key8 = '8',
  Key9 = '9',
  KeyHash = '#',
  KeyAsterisk = '*',
  KeyCall = 'call',
}

interface NumberKey {
  id: PressId;
  type: 'number';
  number: number;
  /**
   * If null then letters span will not be added.
   * If string empty line will be added without any text like placeholder.
   */
  letters: string | null;
  class?: string;
}

interface IconKey {
  id: PressId;
  type: 'icon';
  icon: string;
  fontSize: number;
  class?: string;
}

type Key = NumberKey | IconKey;

@Component({
  selector: 'lib-keypad',
  imports: [
    CommonModule,
    SvgIconComponent,
  ],
  templateUrl: './keypad.component.html',
  styleUrl: './keypad.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('componentFade', [
      transition(':enter', [
        query(
          '.keypad-row',
          [
            stagger(-50, [
              query(
                '.key',
                [
                  style({
                    opacity: 0,
                    transform: 'scale(0.3)',
                  }),
                  animate(
                    '300ms ease-out',
                    style({
                      opacity: 1,
                      transform: 'scale(1)',
                    })
                  ),
                ],
              )
            ])
          ],
        )
      ]),

      transition(':leave', [
        query(
          '.keypad-row',
          [
            query(
              '.key',
              [
                style({
                  opacity: 1,
                  transform: 'scale(1)',
                }),
                animate(
                  '300ms ease-out',
                  style({
                    opacity: 0,
                    transform: 'scale(0.3)',
                  })
                ),
              ],
            )
          ],
        )
      ]),
    ]),
  ],
})
export class KeypadComponent implements OnChanges {

  /**
   * Keypad type
   */
  @Input({ required: true }) type!: 'unlock' | 'call';

  @Output() keyPress = new EventEmitter<any>();

  @HostBinding('@componentFade') componentFade = true;

  /**
   * All possible keys
   */
  private readonly keys: Key[] = [
    {
      id: PressId.Key1,
      type: 'number',
      number: 1,
      letters: '',
    },
    {
      id: PressId.Key2,
      type: 'number',
      number: 2,
      letters: 'A B C',
    },
    {
      id: PressId.Key3,
      type: 'number',
      number: 3,
      letters: 'D E F',
    },
    {
      id: PressId.Key4,
      type: 'number',
      number: 4,
      letters: 'G H I',
    },
    {
      id: PressId.Key5,
      type: 'number',
      number: 5,
      letters: 'J K L',
    },
    {
      id: PressId.Key6,
      type: 'number',
      number: 6,
      letters: 'M N O',
    },
    {
      id: PressId.Key7,
      type: 'number',
      number: 7,
      letters: 'P Q R S',
    },
    {
      id: PressId.Key8,
      type: 'number',
      number: 8,
      letters: 'T U V',
    },
    {
      id: PressId.Key9,
      type: 'number',
      number: 9,
      letters: 'W X Y Z',
    },
    {
      id: PressId.KeyAsterisk,
      type: 'icon',
      icon: '/icons/asterisk.svg',
      fontSize: 24,
    },
    {
      id: PressId.Key0,
      type: 'number',
      number: 0,
      letters: null,
    },
    {
      id: PressId.KeyHash,
      type: 'icon',
      icon: '/icons/hash.svg',
      fontSize: 30,
    },
    {
      id: PressId.KeyCall,
      type: 'icon',
      icon: '/icons/call.svg',
      fontSize: 30,
      class: 'key--call-key',
    },
  ];

  displayKeys: (Key | null)[][] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const type = changes['type'];

    if (type.currentValue === 'unlock') {
      this.displayKeys = [
        [
          this.keys[0],
          this.keys[1],
          this.keys[2],
        ],
        [
          this.keys[3],
          this.keys[4],
          this.keys[5],
        ],
        [
          this.keys[6],
          this.keys[7],
          this.keys[8],
        ],
        [
          this.keys[10],
        ],
      ];
    } else if (type.currentValue === 'call') {

    }
  }

  onKeyPress(key: Key) {
    // console.log('key', key);
    this.keyPress.emit(key.id);
  }

}
