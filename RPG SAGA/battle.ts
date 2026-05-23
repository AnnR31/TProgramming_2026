import { Hero, Knight, Archer, Mage } from './Hero';
import { Logger } from './logger';

export class Game {
    private heroes: Hero[];
    private logger: Logger;

    constructor(heroes: Hero[], logger?: Logger) {
        this.heroes = heroes;
        this.logger = logger || new Logger();
    }

    public start(): void {
        let round = 1;
        while (this.heroes.length > 1) {
            this.logger.log(`\n=== Кон ${round} ===`);
            let shuffled = this.shuffle([...this.heroes]);
            let winners: Hero[] = [];
            for (let i = 0; i < shuffled.length; i += 2) {
                if (i + 1 >= shuffled.length) break;
                let a = shuffled[i];
                let b = shuffled[i + 1];
                this.logger.log(`(${a.getType()}) ${a.getName()} vs (${b.getType()}) ${b.getName()}`);
                let winner = this.fight(a, b);
                winners.push(winner);
            }
            this.heroes = winners;
            round++;
        }
        if (this.heroes.length === 1) {
            this.logger.log(`\nПобедитель: ${this.heroes[0].getName()} (${this.heroes[0].getType()})`);
        }
    }

    private fight(a: Hero, b: Hero): Hero {
        a.resetForFight();
        b.resetForFight();
        let skipA = false, skipB = false;

        while (a.isAlive() && b.isAlive()) {
            a.applyEffects(this.logger);
            b.applyEffects(this.logger);

            if (!skipA) {
                let choice = this.chooseAction(a);
                if (choice === "ice") {
                    a.useIceArrows(b, this.logger);
                } else {
                    let useAbility = (choice === "ability");
                    a.attack(b, useAbility, this.logger);
                }
            } else {
                this.logger.log(`${a.getName()} пропускает ход (заворожение)`);
                skipA = false;
            }
            if (!b.isAlive()) break;

            if (a instanceof Mage && a.isCharmed()) {
                skipB = true;
                a.clearCharm();
            }

            if (!skipB) {
                let choice = this.chooseAction(b);
                if (choice === "ice") {
                    b.useIceArrows(a, this.logger);
                } else {
                    let useAbility = (choice === "ability");
                    b.attack(a, useAbility, this.logger);
                }
            } else {
                this.logger.log(`${b.getName()} пропускает ход (заворожение)`);
                skipB = false;
            }
            if (!a.isAlive()) break;

            if (b instanceof Mage && b.isCharmed()) {
                skipA = true;
                b.clearCharm();
            }
        }

        let winner = a.isAlive() ? a : b;
        let loser = a.isAlive() ? b : a;
        this.logger.log(`${loser.getName()} погибает`);
        return winner;
    }

    private chooseAction(hero: Hero): "normal" | "ability" | "ice" {
        let r = Math.random();
        if (hero["iceArrowsLeft"] > 0 && r < 0.33) return "ice";
        if (r < 0.66) return "ability";
        return "normal";
    }

    private shuffle(arr: any[]): any[] {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    public getLogs(): string[] {
        return this.logger.getLogs();
    }
}

