import { Hero, Knight, Archer, Mage } from './Hero';

export class Game {
    public heroes: Hero[];

    constructor(heroes: Hero[]) {
        this.heroes = heroes;
    }

    public start(): void {
        let round = 1;
        while (this.heroes.length > 1) {
            console.log(`\n=== Кон ${round} ===`);
            let shuffled = this.shuffle([...this.heroes]);
            let winners: Hero[] = [];
            for (let i = 0; i < shuffled.length; i += 2) {
                if (i + 1 >= shuffled.length) break;
                let a = shuffled[i];
                let b = shuffled[i + 1];
                console.log(`(${a.getType()}) ${a.getName()} vs (${b.getType()}) ${b.getName()}`);
                let winner = this.fight(a, b);
                winners.push(winner);
            }
            this.heroes = winners;
            round++;
        }
        if (this.heroes.length === 1) {
            console.log(`\nПобедитель: ${this.heroes[0].getName()} (${this.heroes[0].getType()})`);
        }
    }

    private fight(a: Hero, b: Hero): Hero {
        a.resetForFight();
        b.resetForFight();
        let skipA = false, skipB = false;

        while (a.isAlive() && b.isAlive()) {
            a.applyEffects();
            b.applyEffects();

            if (!skipA) {
                let choice = this.chooseAction(a);
                if (choice === "ice") {
                    a.useIceArrows(b);
                } else {
                    let useAbility = (choice === "ability");
                    a.attack(b, useAbility);
                }
            } else {
                console.log(`${a.getName()} пропускает ход (заворожение)`);
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
                    b.useIceArrows(a);
                } else {
                    let useAbility = (choice === "ability");
                    b.attack(a, useAbility);
                }
            } else {
                console.log(`${b.getName()} пропускает ход (заворожение)`);
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
        console.log(`${loser.getName()} погибает`);
        return winner;
    }

    private chooseAction(hero: Hero): string {
        let r = Math.random();
        if (hero.iceArrowsLeft > 0 && r < 0.33) return "ice";
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
}

