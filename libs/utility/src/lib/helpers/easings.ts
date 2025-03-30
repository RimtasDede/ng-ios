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
