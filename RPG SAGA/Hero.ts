import { Logger } from './logger';

export abstract class Hero {
    protected name: string;
    protected health: number;
    protected strength: number;
    protected alive: boolean = true;

    protected fireTurns: number = 0;
    protected iceTurns: number = 0;
    protected iceDamage: number = 0;
    protected iceArrowsLeft: number = 1;  

    constructor(name: string, health: number, strength: number) {
        this.name = name;
        this.health = health;
        this.strength = strength;
    }

    public getName(): string { return this.name; }
    public getHealth(): number { return this.health; }
    public getStrength(): number { return this.strength; }
    public isAlive(): boolean { return this.alive; }

    public takeDamage(amount: number): void {
        if (!this.alive) return;
        this.health -= amount;
        if (this.health <= 0) {
            this.health = 0;
            this.alive = false;
        }
    }

    public attack(target: Hero, useAbility: boolean, logger: Logger): void {
        if (useAbility) {
            this.useAbility(target, logger);
        } else {
            let damage = this.strength;
            logger.log(`${this.name} (${this.getType()}) наносит ${damage} урона ${target.getName()}`);
            target.takeDamage(damage);
        }
    }

    protected useAbility(target: Hero, logger: Logger): void {
        let damage = this.strength;
        logger.log(`${this.name} (${this.getType()}) наносит ${damage} урона ${target.getName()}`);
        target.takeDamage(damage);
    }

    public useIceArrows(target: Hero, logger: Logger): void {
        if (this.iceArrowsLeft <= 0) {
            logger.log(`${this.name} не может больше использовать ледяные стрелы`);
            return;
        }
        let damage = this.strength;
        target.takeDamage(damage);
        logger.log(`${this.name} (${this.getType()}) использует Ледяные стрелы! Наносит ${damage} урона и замедляет ${target.getName()}`);
        
        if (target instanceof Mage) {
            logger.log(`${target.getName()} (Маг) невосприимчив к ледяным стрелам!`);
            this.iceArrowsLeft--;
            return;
        }
        target.iceTurns = 3;
        target.iceDamage += 2;
        this.iceArrowsLeft--;
    }

    public applyEffects(logger: Logger): void {
        if (this.fireTurns > 0) {
            this.takeDamage(2);
            logger.log(`${this.name} получает 2 урона от огня.`);
            this.fireTurns--;
        }
        if (this.iceTurns > 0) {
            this.takeDamage(this.iceDamage);
            logger.log(`${this.name} получает ${this.iceDamage} урона от ледяных стрел.`);
            this.iceTurns--;
        }
    }

    public getType(): string {
        if (this instanceof Knight) return "Рыцарь";
        if (this instanceof Archer) return "Лучник";
        if (this instanceof Mage) return "Маг";
        return "Герой";
    }

    public resetForFight(): void {
        this.fireTurns = 0;
        this.iceTurns = 0;
        this.iceDamage = 0;
        this.iceArrowsLeft = (this instanceof Archer) ? 2 : 1;
    }
}

export class Knight extends Hero {
    constructor(name: string, health: number, strength: number) {
        super(name, health, strength);
    }
    protected useAbility(target: Hero, logger: Logger): void {
        let damage = Math.floor(this.strength * 1.3);
        logger.log(`${this.name} (Рыцарь) использует Удар возмездия и наносит ${damage} урона ${target.getName()}`);
        target.takeDamage(damage);
    }
}

export class Archer extends Hero {
    private usedFire: boolean = false;

    constructor(name: string, health: number, strength: number) {
        super(name, health, strength);
        this.iceArrowsLeft = 2;
    }
    protected useAbility(target: Hero, logger: Logger): void {
        if (!this.usedFire) {
            this.usedFire = true;
            target.fireTurns = 2;
            logger.log(`${this.name} (Лучник) использует Огненные стрелы! ${target.getName()} загорается.`);
        } else {
            logger.log(`${this.name} (Лучник) наносит ${this.strength} урона ${target.getName()}`);
            target.takeDamage(this.strength);
        }
    }
    public resetForFight(): void {
        super.resetForFight();
        this.usedFire = false;
    }
}

export class Mage extends Hero {
    private charmed: boolean = false;

    constructor(name: string, health: number, strength: number) {
        super(name, health, strength);
    }
    protected useAbility(target: Hero, logger: Logger): void {
        this.charmed = true;
        logger.log(`${this.name} (Маг) использует Заворожение! ${target.getName()} пропустит ход.`);
    }
    public isCharmed(): boolean { return this.charmed; }
    public clearCharm(): void { this.charmed = false; }
    public resetForFight(): void {
        super.resetForFight();
        this.charmed = false;
    }
}

const NAMES: string[] = ["Артур", "Эльдар", "Гэндальф", "Вильямс", "Леголас", "Мерлин", "Ланселот", "Гимли"];

export function createHero(type: string, name: string, health: number, strength: number): Hero {
    if (type === "Knight") return new Knight(name, health, strength);
    if (type === "Archer") return new Archer(name, health, strength);
    if (type === "Mage") return new Mage(name, health, strength);
    throw new Error("Неизвестный тип");
}

export function createRandomHeroes(count: number): Hero[] {
    let heroes: Hero[] = [];
    let types = ["Knight", "Archer", "Mage"];
    for (let i = 0; i < count; i++) {
        let type = types[Math.floor(Math.random() * types.length)];
        let name = NAMES[Math.floor(Math.random() * NAMES.length)];
        let health = Math.floor(Math.random() * 100) + 50;
        let strength = Math.floor(Math.random() * 30) + 10;
        heroes.push(createHero(type, name, health, strength));
    }
    return heroes;
}

