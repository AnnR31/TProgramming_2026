import { describe, it, expect } from 'vitest';
import { calculate, taskA, taskB } from './task4';

describe('task4', () => {
    const a = 0.05;
    const b = 0.06;

    it('taskA возвращает 6 результатов, все конечные числа', () => {
        const results = taskA(a, b);
        expect(results.length).toBe(6);
        results.forEach(res => {
            expect(Number.isFinite(res)).toBe(true);
        });
    });

    it('taskB возвращает 5 результатов, все конечные числа', () => {
        const results = taskB(a, b);
        expect(results.length).toBe(5);
        results.forEach(res => {
            expect(Number.isFinite(res)).toBe(true);
        });
    });

    it('calculate даёт Infinity при x = a', () => {
        expect(calculate(a, a, b)).toBe(Infinity);
    });
});