import { describe, it, expect } from 'vitest';
import { Knight, Archer, createRandomHeroes } from './Hero';
import { Game } from './battle';

describe("Герои", () => {
    it("Рыцарь обычная атака", () => {
        let k = new Knight("A", 100, 20);
        let t = new Knight("B", 100, 20);
        k.attack(t);
        expect(t.getHealth()).toBe(80);
    });
    it("Рыцарь способность +30%", () => {
        let k = new Knight("A", 100, 20);
        let t = new Knight("B", 100, 20);
        k.UseSkil(t);
        expect(t.getHealth()).toBe(74);
    });
    it("Лучник огненные стрелы один раз", () => {
        let a = new Archer("A", 100, 15);
        let t = new Knight("K", 100, 10);
        a.UseSkil(t); 
        t.takeTurn(a, 1);
        expect(t.getHealth()).toBe(98);
        a.UseSkil(t); 
        expect(t.getHealth()).toBe(83);
    });
});

describe("Игра", () => {
    it("игра заканчивается победителем", () => {
        let heroes = [new Knight("A", 100, 20), new Knight("B", 100, 20)];
        let i =  Game.Battle(heroes);
        expect(i).toContain("Победитель турнира:");
    });
});

describe("Фабрика", () => {
    it("создаёт чётное количество героев", () => {
        let heroes = createRandomHeroes(4);
        expect(heroes.length).toBe(4);
    });
});
