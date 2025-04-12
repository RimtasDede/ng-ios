import { animate, keyframes, style, transition, trigger } from '@angular/animations';


/**
 * Element will be invisible for all duration and on last frame will necome visible
 */
export const delayedInAnimation = (duration: string = '500ms') => {
  return trigger('delayedIn', [
    transition(':enter', [
      animate(
        duration,
        keyframes([
          style({ opacity: 0, offset: 0 }),
          style({ opacity: 0, offset: 0.999 }),
          style({ opacity: 1, offset: 1.0 }),
        ])
      )
    ])
  ])
};
