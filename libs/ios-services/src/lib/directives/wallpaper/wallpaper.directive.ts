/* eslint-disable @angular-eslint/directive-selector */
import { Directive, effect, ElementRef, inject, Renderer2 } from '@angular/core';

import { IosWallpaperService } from '../../services/ios-wallpaper.service';


/**
 * Add activated wallpaper to host element as background-image
 */
@Directive({
  selector: '[ios-wallpaper]',
})
export class WallpaperDirective {

  private readonly host = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly iosWallpaperService = inject(IosWallpaperService);

  private readonly wallpaper = this.iosWallpaperService.active;

  constructor() {
    effect(() => {
      this.renderer.setStyle(
        this.host.nativeElement,
        'background-image',
        `url('${this.wallpaper()}')`,
      );
    });
  }

}
