import { describe, it, expect } from 'vitest';
import { Knight, Archer, Mage, createHero, createRandomHeroes } from './Hero';
import { Game } from './battle';
import { Logger } from './logger';

describe("Герои", () => {
    it("Рыцарь обычная атака", () => {
        let k = new Knight("A", 100, 20);
        let t = new Knight("B", 100, 20);
        let log = new Logger();
        k.attack(t, false, log);
        expect(t.getHealth()).toBe(80);
    });
    it("Рыцарь способность +30%", () => {
        let k = new Knight("A", 100, 20);
        let t = new Knight("B", 100, 20);
        let log = new Logger();
        k.attack(t, true, log);
        expect(t.getHealth()).toBe(74);
    });
    it("Маг завораживает", () => {
        let m = new Mage("M", 100, 10);
        let t = new Knight("K", 100, 10);
        let log = new Logger();
        m.attack(t, true, log);
        expect(m.isCharmed()).toBe(true);
    });
    it("Лучник огненные стрелы один раз", () => {
        let a = new Archer("A", 100, 15);
        let t = new Knight("K", 100, 10);
        let log = new Logger();
        a.attack(t, true, log); 
        expect(t.getHealth()).toBe(100);
        a.attack(t, true, log); 
        expect(t.getHealth()).toBe(85);
    });
    it("Ледяные стрелы накладывают эффект", () => {
        let a = new Archer("A", 100, 20);
        let t = new Knight("B", 100, 20);
        let log = new Logger();
        a.useIceArrows(t, log);
        expect(t.getHealth()).toBe(80);
        expect(t["iceTurns"]).toBe(3);
        expect(t["iceDamage"]).toBe(2);
        a.useIceArrows(t, log);
        expect(t["iceDamage"]).toBe(4);
        expect(t["iceTurns"]).toBe(3);
    });
    it("Маг невосприимчив к ледяным стрелам", () => {
        let a = new Archer("A", 100, 20);
        let m = new Mage("M", 100, 20);
        let log = new Logger();
        a.useIceArrows(m, log);
        expect(m.getHealth()).toBe(80);
        expect(m["iceTurns"]).toBe(0);
    });
});

describe("Игра", () => {
    it("игра заканчивается победителем", () => {
        let heroes = [new Knight("A", 100, 20), new Knight("B", 100, 20)];
        let game = new Game(heroes);
        game.start();
        let logs = game.getLogs();
        expect(logs.some(l => l.includes("Победитель"))).toBe(true);
    });
});

describe("Фабрика", () => {
    it("создаёт чётное количество героев", () => {
        let heroes = createRandomHeroes(4);
        expect(heroes.length).toBe(4);
        for (let h of heroes) {
            expect(h.getHealth()).toBeGreaterThanOrEqual(50);
            expect(h.getStrength()).toBeGreaterThanOrEqual(10);
        }
    });
});

