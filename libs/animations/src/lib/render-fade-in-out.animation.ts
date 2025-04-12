import { animate, animation, style, transition, trigger } from '@angular/animations';

export const fadeInAnimation = animation([
  style({ opacity: 0 }),
  animate(
    '{{ duration }} {{ easing }}',
    style({ opacity: 1 }),
  ),
], {
  params: {
    duration: '250ms',
    easing: 'ease-in',
  }
});

export const fadeOutAnimation = animation([
  style({ opacity: 1 }),
  animate(
    '{{ duration }} {{ easing }}',
    style({ opacity: 0 }),
  ),
], {
  params: {
    duration: '250ms',
    easing: 'ease-in',
  }
});

export const renderFadeInOutAnimation = (duration: string = '1s') => {
  return trigger('renderFadeInOut', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(
        `${ duration } ease-in`,
        style({ opacity: 1 }),
      ),
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate(
        `${ duration } ease-in`,
        style({ opacity: 0 }),
      ),
    ]),
  ]);
}
