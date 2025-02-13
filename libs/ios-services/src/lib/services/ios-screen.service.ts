import { Injectable, signal } from '@angular/core';

interface IosScreenState {
  /**
   * Screen position from top
   */
  top: number;

  /**
   * Screen position from left
   */
  left: number;

  /**
   * Screen width
   */
  width: number;

  /**
   * Screen height
   */
  height: number;
}

@Injectable()
export class IosScreenService {

  private screen = document.getElementById('phone-frame') as HTMLElement;

  state = signal<IosScreenState>(this.getScreenState());

  private getScreenState(): IosScreenState {
    return {
      top: this.screen.offsetTop,
      left: this.screen.offsetLeft,
      width: this.screen.offsetWidth,
      height: this.screen.offsetHeight,
    };
  }

}
