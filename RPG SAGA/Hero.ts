export abstract class Hero {
    protected health: number;
    protected strength: number;
    protected name: string;
    protected alive: boolean = true;

    protected fireTurns: number = 0;
    protected fireDamage: number = 0;
    protected iceTurns: number = 0;
    protected iceDamage: number = 0;

    protected iceArrowsLeft: number = 1; // по умолчанию 1 раз за бой (кроме лучника)
    protected canUseIceArrows: boolean = true;

    constructor(name: string, health: number, strength: number) {
        this.name = name;
        this.health = health;
        this.strength = strength;
    }

    public getName(): string { return this.name; }
    public getHealth(): number { return this.health; }
    public getStrength(): number { return this.strength; }
    public isAlive(): boolean { return this.alive; }

    public takeDamage(damage: number): void {
        if (!this.alive) return;
        this.health -= damage;
        if (this.health <= 0) {
            this.health = 0;
            this.alive = false;
        }
    }

    public applyPeriodicEffects(logger: Logger): void {
        if (this.fireTurns > 0) {
            const dmg = this.fireDamage || 2;
            this.takeDamage(dmg);
            logger.add(`${this.name} получает ${dmg} урона от огня.`);
            this.fireTurns--;
        }
        if (this.iceTurns > 0) {
            const dmg = this.iceDamage || 2;
            this.takeDamage(dmg);
            logger.add(`${this.name} получает ${dmg} урона от ледяных стрел.`);
            this.iceTurns--;
        }
    }

    public useIceArrows(target: Hero, logger: Logger): boolean {
        if (!this.canUseIceArrows || this.iceArrowsLeft <= 0) return false;

        const damage = this.strength;
        target.takeDamage(damage);
        logger.add(`${this.name} (${this.constructor.name}) использует Ледяные стрелы! Наносит ${damage} урона и замедляет ${target.getName()}`);

        if (target instanceof Mage && (target as Mage).isImmuneToIce()) {
            logger.add(`${target.getName()} (Маг) невосприимчив к ледяным стрелам!`);
            return true;
        }

        target.addIceEffect(2, 3);
        this.iceArrowsLeft--;
        return true;
    }

    public addIceEffect(damagePerTurn: number, turns: number): void {
        this.iceDamage += damagePerTurn;
        this.iceTurns = Math.max(this.iceTurns, turns);
    }

    public resetForNewFight(): void {
        this.fireTurns = 0;
        this.iceTurns = 0;
        this.iceDamage = 0;
        this.iceArrowsLeft = this.getInitialIceArrows();
        this.canUseIceArrows = true;
    }

    protected getInitialIceArrows(): number {
        return 1; 
    }

    public abstract attack(target: Hero, logger: Logger, useAbility: boolean): void;
}

export class Knight extends Hero {
    constructor(name: string, health: number, strength: number) {
        super(name, health, strength);
    }

    public attack(target: Hero, logger: Logger, useAbility: boolean): void {
        let damage = this.strength;
        if (useAbility) {
            damage = Math.floor(damage * 1.3);
            logger.add(`${this.name} (Рыцарь) использует Удар возмездия и наносит ${damage} урона ${target.getName()}`);
        } else {
            logger.add(`${this.name} (Рыцарь) наносит ${damage} урона ${target.getName()}`);
        }
        target.takeDamage(damage);
    }
}

export class Archer extends Hero {
    private usedFireArrows: boolean = false;

    constructor(name: string, health: number, strength: number) {
        super(name, health, strength);
    }

    protected getInitialIceArrows(): number {
        return 2; 
    }

    public attack(target: Hero, logger: Logger, useAbility: boolean): void {
        if (useAbility) {
            if (!this.usedFireArrows) {
                this.usedFireArrows = true;
                target.fireTurns = 2;
                target.fireDamage = 2;
                logger.add(`${this.name} (Лучник) использует Огненные стрелы! ${target.getName()} загорается.`);
                return; 
            } else {
                logger.add(`${this.name} (Лучник) наносит ${this.strength} урона ${target.getName()}`);
                target.takeDamage(this.strength);
            }
        } else {
            logger.add(`${this.name} (Лучник) наносит ${this.strength} урона ${target.getName()}`);
            target.takeDamage(this.strength);
        }
    }

    public resetForNewFight(): void {
        super.resetForNewFight();
        this.usedFireArrows = false;
    }
}

export class Mage extends Hero {
    private charmed: boolean = false;
    private immuneToIce: boolean = true;

    constructor(name: string, health: number, strength: number) {
        super(name, health, strength);
    }

    public isImmuneToIce(): boolean {
        return this.immuneToIce;
    }

    public attack(target: Hero, logger: Logger, useAbility: boolean): void {
        if (useAbility) {
            this.charmed = true;
            logger.add(`${this.name} (Маг) использует Заворожение! ${target.getName()} пропустит ход.`);
        } else {
            logger.add(`${this.name} (Маг) наносит ${this.strength} урона ${target.getName()}`);
            target.takeDamage(this.strength);
        }
    }

    public isCharmed(): boolean {
        return this.charmed;
    }

    public clearCharm(): void {
        this.charmed = false;
    }

    public resetForNewFight(): void {
        super.resetForNewFight();
        this.charmed = false;
    }

    public addIceEffect(damagePerTurn: number, turns: number): void {
    }
}

export class Logger {
    private messages: string[] = [];

    public add(msg: string): void {
        this.messages.push(msg);
        console.log(msg);
    }

    public get(): string[] {
        return this.messages;
    }

    public clear(): void {
        this.messages = [];
    }
}

const NAMES = ["Артур", "Эльдар", "Гэндальф", "Вильямс", "Леголас", "Мерлин", "Ланселот", "Гимли"];

export function createHero(type: "Knight" | "Archer" | "Mage", name: string, health: number, strength: number): Hero {
    switch (type) {
        case "Knight": return new Knight(name, health, strength);
        case "Archer": return new Archer(name, health, strength);
        case "Mage": return new Mage(name, health, strength);
    }
}

export function createRandomHeroes(count: number): Hero[] {
    const heroes: Hero[] = [];
    const types: ("Knight" | "Archer" | "Mage")[] = ["Knight", "Archer", "Mage"];
    for (let i = 0; i < count; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        const name = NAMES[Math.floor(Math.random() * NAMES.length)];
        const health = Math.floor(Math.random() * 100) + 50; 
        const strength = Math.floor(Math.random() * 30) + 10; 
        heroes.push(createHero(type, name, health, strength));
    }
    return heroes;
}


