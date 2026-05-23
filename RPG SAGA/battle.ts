import { Hero, Logger, Archer, Mage, Knight } from './Hero';

export class Game {
    private heroes: Hero[];
    private logger: Logger;

    constructor(heroes: Hero[]) {
        this.heroes = heroes;
        this.logger = new Logger();
    }

    public start(): void {
        let round = 1;
        while (this.heroes.length > 1) {
            this.logger.add(`\n=== Кон ${round} ===`);
            const shuffled = this.shuffle([...this.heroes]);
            const winners: Hero[] = [];

            for (let i = 0; i < shuffled.length; i += 2) {
                if (i + 1 >= shuffled.length) break;
                const a = shuffled[i];
                const b = shuffled[i + 1];
                this.logger.add(`(${this.getType(a)}) ${a.getName()} vs (${this.getType(b)}) ${b.getName()}`);
                const winner = this.fight(a, b);
                winners.push(winner);
            }
            this.heroes = winners;
            round++;
        }
        if (this.heroes.length === 1) {
            this.logger.add(`\nПобедитель: ${this.heroes[0].getName()} (${this.getType(this.heroes[0])})`);
        }
    }

    private fight(heroA: Hero, heroB: Hero): Hero {
        heroA.resetForNewFight();
        heroB.resetForNewFight();

        let skipA = false;
        let skipB = false;

        while (heroA.isAlive() && heroB.isAlive()) {
            heroA.applyPeriodicEffects(this.logger);
            heroB.applyPeriodicEffects(this.logger);

            if (!skipA) {
                const action = this.chooseAction(heroA);
                if (action === "ice") {
                    heroA.useIceArrows(heroB, this.logger);
                } else {
                    const useAbility = (action === "ability");
                    heroA.attack(heroB, this.logger, useAbility);
                }
            } else {
                this.logger.add(`${heroA.getName()} пропускает ход (заворожение)`);
                skipA = false;
            }
            if (!heroB.isAlive()) break;

            if (heroA instanceof Mage && (heroA as Mage).isCharmed()) {
                skipB = true;
                (heroA as Mage).clearCharm();
            }

            if (!skipB) {
                const action = this.chooseAction(heroB);
                if (action === "ice") {
                    heroB.useIceArrows(heroA, this.logger);
                } else {
                    const useAbility = (action === "ability");
                    heroB.attack(heroA, this.logger, useAbility);
                }
            } else {
                this.logger.add(`${heroB.getName()} пропускает ход (заворожение)`);
                skipB = false;
            }
            if (!heroA.isAlive()) break;

            if (heroB instanceof Mage && (heroB as Mage).isCharmed()) {
                skipA = true;
                (heroB as Mage).clearCharm();
            }
        }

        const winner = heroA.isAlive() ? heroA : heroB;
        const loser = heroA.isAlive() ? heroB : heroA;
        this.logger.add(`${loser.getName()} погибает`);
        return winner;
    }

    private chooseAction(hero: Hero): "normal" | "ability" | "ice" {
        const rand = Math.random();
        const hasIce = (hero as any).iceArrowsLeft > 0;
        if (hasIce && rand < 0.33) {
            return "ice";
        } else if (rand < 0.66) {
            return "ability";
        } else {
            return "normal";
        }
    }

    private shuffle<T>(arr: T[]): T[] {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    private getType(hero: Hero): string {
        if (hero instanceof Knight) return "Рыцарь";
        if (hero instanceof Archer) return "Лучник";
        if (hero instanceof Mage) return "Маг";
        return "Неизвестный";
    }

    public getLogs(): string[] {
        return this.logger.get();
    }
}

