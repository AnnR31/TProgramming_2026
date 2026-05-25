import { describe, it, expect } from 'vitest';
import { Table } from './task5';

describe('Table', () => {
  it('создаёт стол через конструктор', () => {
    const t = new Table(120, 80, 75, 'Дуб');
    expect(t.length).toBe(120);
    expect(t.width).toBe(80);
    expect(t.height).toBe(75);
  });

  it('changeDimensions изменяет размеры', () => {
    const t = new Table(100, 60, 70, 'Тест');
    t.changeDimensions(200, 100, 80);
    expect(t.length).toBe(200);
    expect(t.width).toBe(100);
    expect(t.height).toBe(80);
  });

  it('getS возвращает площадь', () => {
    const t = new Table(5, 4, 3, '');
    expect(t.getS()).toBe('Площадь этого стола равна 20');
  });
});