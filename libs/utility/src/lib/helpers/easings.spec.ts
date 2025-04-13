import { createCubicBezier, createCubicBezierInverse } from './easings';

describe('createCubicBezierInverse', () => {
  const inverseEaseOut = createCubicBezierInverse(0, 0, 0.58, 1);

  // Helper: approximate equality
  const approximately = (a: number, b: number, epsilon = 1e-4) => Math.abs(a - b) < epsilon;

  test('returns 0 when value is 0', () => {
    expect(inverseEaseOut(0)).toBeCloseTo(0, 5);
  });

  test('returns 1 when value is 1', () => {
    expect(inverseEaseOut(1)).toBeCloseTo(1, 5);
  });

  test('value at 50% progress of time (0.5) should be close to 0.684643, so inverse(0.684643) ≈ 0.5', () => {
    expect(inverseEaseOut(0.684643)).toBeCloseTo(0.5, 4);
  });

  test('value at ~75% progress (0.75) should be close to 0.9065, so inverse(0.915) ≈ 0.75', () => {
    expect(inverseEaseOut(0.9065)).toBeCloseTo(0.75, 3);
  });

  test('multiple values back-and-forth', () => {
    const bezier = createCubicBezier(0, 0, 0.58, 1);
    const inputs = [0, 0.1, 0.25, 0.5, 0.75, 1];

    inputs.forEach((x) => {
      const y = bezier(x);
      const inverted = inverseEaseOut(y);

      expect(approximately(inverted, x, 0.001)).toBe(true);
    });
  });
});
