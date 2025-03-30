export interface AnimationOptions {
  /**
   * Animation duration
   */
  duration: number;

  /**
   * Numeric aniamtion start value
   */
  valueStart: number;

  /**
   * Numeric animation end value
   */
  valueEnd: number;

  /**
   * Easing function (import easings from this library)
   */
  easing: (_: number) => number;

  /**
   * Function that will be called to update animating value
   */
  valueUpdate: (_: number) => void;
}

export interface AnimationObject {
  /**
   * Starts animation and returns promise that will be resolved on animation end
   */
  start: () => Promise<void>;

  /**
   * Cancel animation frame
   */
  stop: () => void;
}

/**
 * @example
 * animation = createAnimation({
 *   duration: 2000,
 *   valueStart: 0,
 *   valueEnd: 500,
 *   easing: easeOut,
 *   valueUpdate: value => {
 *     // update value logic
 *   },
 * });
 *
 * animation.start();
 */
export function createAnimation(options: AnimationOptions): AnimationObject {
  const { duration, valueStart, valueEnd, easing, valueUpdate } = options;
  const startTime = performance.now();
  let animationId: number;

  return {
    start: () => {
      return new Promise(resolve => {
        function animate() {
          const currentTime = performance.now();
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = easing(progress);
          const value = valueStart + (valueEnd - valueStart) * easedProgress;

          valueUpdate(value);

          if (progress < 1) {
            animationId = requestAnimationFrame(animate);
          } else {
            resolve();
          }
        }

        animate();
      });
    },
    stop: () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    },
  };
}
