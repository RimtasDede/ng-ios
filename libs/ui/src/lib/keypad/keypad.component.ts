import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';

export enum KeypadKey {
  Key1 = '1',
  Key2 = '2',

}

interface NumberKey {
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
})
export class KeypadComponent implements OnChanges {

  /**
   * Keypad type
   */
  @Input({ required: true }) type!: 'unlock' | 'call';

  @Output() keyPress = new EventEmitter<any>();

  /**
   * All possible keys
   */
  private readonly keys: Key[] = [
    {
      type: 'number',
      number: 1,
      letters: '',
    },
    {
      type: 'number',
      number: 2,
      letters: 'A B C',
    },
    {
      type: 'number',
      number: 3,
      letters: 'D E F',
    },
    {
      type: 'number',
      number: 4,
      letters: 'G H I',
    },
    {
      type: 'number',
      number: 5,
      letters: 'J K L',
    },
    {
      type: 'number',
      number: 6,
      letters: 'M N O',
    },
    {
      type: 'number',
      number: 7,
      letters: 'P Q R S',
    },
    {
      type: 'number',
      number: 8,
      letters: 'T U V',
    },
    {
      type: 'number',
      number: 9,
      letters: 'W X Y Z',
    },
    {
      type: 'icon',
      icon: '/icons/asterisk.svg',
      fontSize: 24,
    },
    {
      type: 'number',
      number: 0,
      letters: null,
    },
    {
      type: 'icon',
      icon: '/icons/hash.svg',
      fontSize: 30,
    },
    {
      type: 'icon',
      icon: '/icons/call.svg',
      fontSize: 30,
      class: 'key--call-key',
    },
  ];

  displayKeys: Key[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const type = changes['type'];

    if (type) {
      this.displayKeys = [
        this.keys[0],
        this.keys[1],
        this.keys[2],
        this.keys[3],
        this.keys[4],
        this.keys[5],
        this.keys[6],
        this.keys[7],
        this.keys[8],
        this.keys[10],
      ];
    }
  }

}
