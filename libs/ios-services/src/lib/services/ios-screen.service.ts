import { Injectable, signal } from '@angular/core';


/**
 * iPhone screen parameters
 */
@Injectable()
export class IosScreenService {

  /**
   * Screen position from top
   */
  readonly top = signal<number>(0);

  /**
   * Screen position from left
   */
  readonly left = signal<number>(0);

  /**
   * Screen width
   */
  readonly width = signal<number>(0);

  /**
   * Screen height
   */
  readonly height = signal<number>(0);

  constructor() {
    setTimeout(() => {
      const { top, left, width, height } = this.getScreenState();

      this.top.set(top);
      this.left.set(left);
      this.width.set(width);
      this.height.set(height);
    });
  }

  private getScreenState() {
    const screen = document.getElementById('iphone-screen') as HTMLElement;
    const { width, height, x, y } = screen.getBoundingClientRect();

    return {
      top: x,
      left: y,
      width,
      height,
    };
  }

}
