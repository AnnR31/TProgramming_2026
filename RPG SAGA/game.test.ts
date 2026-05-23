import { describe, it, expect } from 'vitest';
import { Knight, Archer, Mage, Logger, createHero, createRandomHeroes } from './Hero';
import { Game } from './battle';

describe("Герои", () => {
    it("Рыцарь наносит обычный урон", () => {
        const knight = new Knight("A", 100, 20);
        const target = new Knight("B", 100, 20);
        const log = new Logger();
        knight.attack(target, log, false);
        expect(target.getHealth()).toBe(80);
    });

    it("Рыцарь наносит +30% урона способностью", () => {
        const knight = new Knight("A", 100, 20);
        const target = new Knight("B", 100, 20);
        const log = new Logger();
        knight.attack(target, log, true);
        expect(target.getHealth()).toBe(74);
    });

    it("Маг завораживает противника", () => {
        const mage = new Mage("M", 100, 10);
        const target = new Knight("K", 100, 10);
        const log = new Logger();
        mage.attack(target, log, true);
        expect(mage.isCharmed()).toBe(true);
    });

    it("Лучник использует огненные стрелы только раз", () => {
        const archer = new Archer("A", 100, 15);
        const target = new Knight("K", 100, 10);
        const log = new Logger();
        archer.attack(target, log, true); // огненные – урон не наносит
        expect(target.getHealth()).toBe(100);
        archer.attack(target, log, true); // теперь обычная атака
        expect(target.getHealth()).toBe(85);
    });

    it("Ледяные стрелы накладывают эффект (и суммируются)", () => {
        const archer = new Archer("A", 100, 20);
        const target = new Knight("B", 100, 20);
        const log = new Logger();
        archer.useIceArrows(target, log);
        expect(target.getHealth()).toBe(80); // урон нанесён
        expect((target as any).iceTurns).toBe(3);
        expect((target as any).iceDamage).toBe(2);
        // второй раз – эффект суммируется
        archer.useIceArrows(target, log);
        expect((target as any).iceDamage).toBe(4);
        expect((target as any).iceTurns).toBe(3);
    });

    it("Маг невосприимчив к ледяным стрелам", () => {
        const archer = new Archer("A", 100, 20);
        const mage = new Mage("M", 100, 20);
        const log = new Logger();
        archer.useIceArrows(mage, log);
        expect(mage.getHealth()).toBe(80); // урон нанесён
        expect((mage as any).iceTurns).toBe(0); // эффект не наложен
    });
});

describe("Игра", () => {
    it("Игра заканчивается победителем", () => {
        const heroes = [new Knight("A", 100, 20), new Knight("B", 100, 20)];
        const game = new Game(heroes);
        game.start();
        const logs = game.getLogs();
        expect(logs.some(l => l.includes("Победитель"))).toBe(true);
    });
});

describe("Фабрика", () => {
    it("Создаёт случайных героев чётное количество", () => {
        const heroes = createRandomHeroes(4);
        expect(heroes.length).toBe(4);
        heroes.forEach(h => {
            expect(h.getHealth()).toBeGreaterThanOrEqual(50);
            expect(h.getStrength()).toBeGreaterThanOrEqual(10);
        });
    });
});


