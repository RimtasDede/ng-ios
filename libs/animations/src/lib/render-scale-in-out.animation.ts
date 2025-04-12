import { animate, style, transition, trigger } from '@angular/animations';

export const renderScaleInOutAnimation = (params: {
  scaleFrom: number,
  scaleTo: number,
}) => {
  const { scaleFrom, scaleTo } = params;

  return trigger('renderScaleInOut', [
    transition(':enter', [
      animate(
        '300ms ease-in',
        style({ scale: scaleTo }),
      ),
      style({ scale: scaleTo }),
    ]),
    transition(':leave', [
      animate(
        '300ms ease-in',
        style({ scale: scaleFrom }),
      ),
      style({ scale: scaleFrom }),
    ]),
  ]);
}
