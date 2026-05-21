import { describe, it, expect } from 'vitest';
import { calculate, a, b } from './task4';

describe('calculate', () => {
  const validInputs = [0.2, 0.35, 0.5, 0.65, 0.8, 0.95, 0.15, 0.26, 0.37, 0.48, 0.56];

  it('возвращает конечные числа для всех значений из условия', () => {
    for (const x of validInputs) {
      expect(Number.isFinite(calculate(x))).toBe(true);
    }
  });

  it('возвращает Infinity при x = a (0.05)', () => {
    expect(calculate(a)).toBe(Infinity);
  });

  it('возвращает конечное число при x = b (0.06)', () => {
    expect(Number.isFinite(calculate(b))).toBe(true);
  });

  it('возвращает число при x = 1', () => {
    expect(Number.isFinite(calculate(1))).toBe(true);
  });

  it('возвращает число при x = 0', () => {
    expect(Number.isFinite(calculate(0))).toBe(true);
  });
});
