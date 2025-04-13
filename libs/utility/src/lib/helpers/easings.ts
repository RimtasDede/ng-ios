export function easeLinear(t: number): number {
  return t;
};

export function easeIn(t: number): number {
  return t * t;
}

export function easeOut(t: number): number {
  return t * (2 - t);
}

export function easeInOut(t: number): number {
  return t < 0.5
    ? 2 * t * t
    : -1 + (4 - 2 * t) * t;
}

export function easeInCubic(t: number): number {
  return t ** 3;
}

export function easeOutCubic(t: number): number {
  return (--t) * t * t + 1;
}

export function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t ** 3
    : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

export function easeInQuart(t: number): number {
  return t ** 4;
}

export function easeOutQuart(t: number): number {
  return 1 - (--t) * t ** 3;
}

export function easeInOutQuart(t: number): number {
  return t < 0.5
    ? 8 * t ** 4
    : 1 - 8 * (--t) * t ** 3;
}

/**
 * @param t Value
 * @param deep How deep will go below t
 */
export function easeOutBack(t: number, deep: number = 1.2): number {
  return t < 0.8
    ? deep * (1 - (1 - t / 0.8) ** 2)
    : deep - (deep - 1) * ((t - 0.8) / 0.2) ** 2;
}

/**
 * Accept cubic-bezier value on creation.
 *
 * @returns Return function that accept animation time and this function return value fraction
 *
 * @example
 * ```
 * // better create only one time if possible, its pretty expensive
 * const cubicBezier = createCubicBezier(0, 0, 0.58, 1);
 * // 0.5 is animation time
 * cubicBezier(0.5);
 * // return ~0.684643 animation position
 * ```
 */
export function createCubicBezier(x1: number, y1: number, x2: number, y2: number) {
  // Helper functions to calculate Bézier curves
  function bezier(t: number, p0: number, p1: number, p2: number, p3: number) {
    const mt = 1 - t;

    return mt**3 * p0 + 3 * mt**2 * t * p1 + 3 * mt * t**2 * p2 + t**3 * p3;
  }

  function bezierDerivative(t: number, p0: number, p1: number, p2: number, p3: number) {
    const mt = 1 - t;

    return 3 * mt**2 * (p1 - p0) +
           6 * mt * t * (p2 - p1) +
           3 * t**2 * (p3 - p2);
  }

  return function(xInput: number) {
    // Use Newton-Raphson method to solve for t given x
    let t = xInput;

    for (let i = 0; i < 10; i++) {
      const xEstimate = bezier(t, 0, x1, x2, 1);
      const xDeriv = bezierDerivative(t, 0, x1, x2, 1);

      if (xDeriv === 0) break;

      const delta = (xEstimate - xInput) / xDeriv;

      t -= delta;

      if (Math.abs(delta) < 1e-6) break;
    }

    // Calculate y at found t
    return bezier(t, 0, y1, y2, 1);
  };
}

/**
 * Accept cubic-bezier value on creation.
 *
 * @returns Return function that accept value fraction and this function return timing when this value is in that position
 *
 * @example
 * ```
 * // better create only one time if possible, its pretty expensive
 * const cubicBezierInverse = createCubicBezierInverse(0, 0, 0.58, 1);
 * // 0.5 is value fraction, when value reach its 50%
 * cubicBezierInverse(0.684643);
 * // return ~0.5 sec
 * ```
 */
export function createCubicBezierInverse(x1: number, y1: number, x2: number, y2: number) {
  function bezier(t: number, p0: number, p1: number, p2: number, p3: number) {
    const mt = 1 - t;

    return mt ** 3 * p0 + 3 * mt ** 2 * t * p1 + 3 * mt * t ** 2 * p2 + t ** 3 * p3;
  }

  function bezierDerivative(t: number, p0: number, p1: number, p2: number, p3: number) {
    const mt = 1 - t;

    return 3 * mt ** 2 * (p1 - p0) +
           6 * mt * t * (p2 - p1) +
           3 * t ** 2 * (p3 - p2);
  }

  return function(easedValue: number) {
    // Use Newton-Raphson to find t such that bezierY(t) ≈ easedValue
    let t = easedValue;

    for (let i = 0; i < 10; i++) {
      const yEstimate = bezier(t, 0, y1, y2, 1);
      const yDeriv = bezierDerivative(t, 0, y1, y2, 1);

      if (yDeriv === 0) break;

      const delta = (yEstimate - easedValue) / yDeriv;
      t -= delta;
      if (Math.abs(delta) < 1e-6) break;
    }

    // Return corresponding x at that t
    return bezier(t, 0, x1, x2, 1);
  };
}


/**
 * createCubicBezier() with CSS `ease` easing
 */
export function createCubicBezierEase() {
  return createCubicBezier(0.25, 0.1, 0.25, 1);
}

/**
 * createCubicBezier() with CSS `ease-in` easing
 */
export function createCubicBezierEaseIn() {
  return createCubicBezier(0.42, 0, 1, 1);
}

/**
 * createCubicBezier() with CSS `ease-out` easing
 */
export function createCubicBezierEaseOut() {
  return createCubicBezier(0, 0, 0.58, 1);
}

/**
 * createCubicBezier() with CSS `ease-in-out` easing
 */
export function createCubicBezierEaseInOut() {
  return createCubicBezier(0.42, 0, 0.58, 1);
}


/**
 * createCubicBezierInverse() with CSS `ease` easing
 */
export function createCubicBezierEaseInverse() {
  return createCubicBezierInverse(0.25, 0.1, 0.25, 1);
}

/**
 * createCubicBezierInverse() with CSS `ease-in` easing
 */
export function createCubicBezierEaseInInverse() {
  return createCubicBezierInverse(0.42, 0, 1, 1);
}

/**
 * createCubicBezierInverse() with CSS `ease-out` easing
 */
export function createCubicBezierEaseOutInverse() {
  return createCubicBezierInverse(0, 0, 0.58, 1);
}

/**
 * createCubicBezierInverse() with CSS `ease-in-out` easing
 */
export function createCubicBezierEaseInOutInverse() {
  return createCubicBezierInverse(0.42, 0, 0.58, 1);
}
