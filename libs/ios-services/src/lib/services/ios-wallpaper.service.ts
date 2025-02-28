import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable()
export class IosWallpaperService {

  /**
   * Active wallpaper state
   */
  readonly active = signal<string>('');

  readonly active$ = toObservable(this.active);

  /**
   * Wallpaper images set
   */
  readonly wallpapers = [
    '/wallpapers/1.jpg',
    '/wallpapers/2.png',
    '/wallpapers/3.jpg',
    '/wallpapers/4.jpg',
    '/wallpapers/5.jpg',
    '/wallpapers/6.jpg',
    '/wallpapers/7.jpg',
    '/wallpapers/8.jpg',
    '/wallpapers/9.jpg',
    '/wallpapers/10.jpg',
    '/wallpapers/11.webp',
    '/wallpapers/12.jpg',
  ];

  constructor() {
    this.active.set(this.wallpapers[10]);
  }

}
