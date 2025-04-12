import { query, transition, trigger, animateChild } from '@angular/animations';

/**
 * Execute child components Angular animations.
 * Add animation to parent component host.
 *
 * @example
 * ```
 * host: {
 *   '[@animateChild]': 'true',
 * }
 * ```
 *
 * If animatable child in template is wrapper into additional container
 * then this animation should be added to this container as well
 *
 * @example
 * ```html
 * *@if (show) {
 *   <div [@animateChild]>
 *      <app-component />
 *   </div>
 * }
 * ```
 */
export const animateChildAnimation = () => {
  return trigger('animateChild', [
    transition(':enter, :leave', [
      query('@*', animateChild()),
    ]),
  ]);
}
