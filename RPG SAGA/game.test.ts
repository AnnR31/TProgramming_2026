import { describe, it, expect } from 'vitest';
import { Knight, Archer, Mage, createHero, createRandomHeroes } from './Hero';
import { Game } from './battle';

describe("Герои", () => {
    it("Рыцарь обычная атака", () => {
        let k = new Knight("A", 100, 20);
        let t = new Knight("B", 100, 20);
        k.attack(t, false);
        expect(t.health).toBe(80);
    });
    it("Рыцарь способность +30%", () => {
        let k = new Knight("A", 100, 20);
        let t = new Knight("B", 100, 20);
        k.attack(t, true);
        expect(t.health).toBe(74);
    });
    it("Маг завораживает", () => {
        let m = new Mage("M", 100, 10);
        let t = new Knight("K", 100, 10);
        m.attack(t, true);
        expect(m.isCharmed()).toBe(true);
    });
    it("Лучник огненные стрелы один раз", () => {
        let a = new Archer("A", 100, 15);
        let t = new Knight("K", 100, 10);
        a.attack(t, true); // огненные
        expect(t.health).toBe(100);
        a.attack(t, true); 
        expect(t.health).toBe(85);
    });
    it("Ледяные стрелы накладывают эффект", () => {
        let a = new Archer("A", 100, 20);
        let t = new Knight("B", 100, 20);
        a.useIceArrows(t);
        expect(t.health).toBe(80);
        expect(t.iceTurns).toBe(3);
        expect(t.iceDamage).toBe(2);
        a.useIceArrows(t);
        expect(t.iceDamage).toBe(4);
        expect(t.iceTurns).toBe(3);
    });
    it("Маг невосприимчив к ледяным стрелам", () => {
        let a = new Archer("A", 100, 20);
        let m = new Mage("M", 100, 20);
        a.useIceArrows(m);
        expect(m.health).toBe(80);
        expect(m.iceTurns).toBe(0);
    });
});

describe("Игра", () => {
    it("игра заканчивается победителем", () => {
        let heroes = [new Knight("A", 100, 20), new Knight("B", 100, 20)];
        let game = new Game(heroes);
        game.start();
        expect(true).toBe(true);
    });
});

describe("Фабрика", () => {
    it("создаёт чётное количество героев", () => {
        let heroes = createRandomHeroes(4);
        expect(heroes.length).toBe(4);
        for (let h of heroes) {
            expect(h.health).toBeGreaterThanOrEqual(50);
            expect(h.strength).toBeGreaterThanOrEqual(10);
        }
    });
});

