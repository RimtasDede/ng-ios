import { Injectable, signal } from '@angular/core';

export interface IosScreenState {
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

  readonly state = signal<IosScreenState>({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  constructor() {
    setTimeout(() => {
      this.state.set(this.getScreenState());
    });
  }

  private getScreenState(): IosScreenState {
    const {
      offsetTop,
      offsetLeft,
      offsetWidth,
      offsetHeight,
    } = document.getElementById('iphone-screen') as HTMLElement;

    return {
      top: offsetTop,
      left: offsetLeft,
      width: offsetWidth,
      height: offsetHeight,
    };
  }

}
