export class Hero {
    private name:string;
    private health: number;
    private strength: number;
    private alive: boolean = true;
    burns: boolean = false;
    shouldSkip: boolean = false;

    private type: string = "";

    constructor(name: string, health: number, strength: number, type: string) {
        this.name = name;
        this.health = health;
        this.strength = strength;
        this.type = type;
    }

    getName(): string { return this.name; }
    getHealth(): number { return this.health; }
    getStrength(): number { return this.strength; }
    isAlive(): boolean { return this.alive; }
    getType(): string { return this.type; }

    takeDamage(dmg: number): void {
        if (!this.alive) return;
        this.health -= dmg;
        if (this.health <= 0) {
            this.health = 0;
            this.alive = false;
        }
    }    

    burning():void{
        console.log(`${this.name} (${this.type}) горит получает и урон 2 ед.`);
        this.takeDamage(2);
    }

    attack(target: Hero): void {
        let damage = this.strength;
        console.log(`${this.name} (${this.type}) наносит ${damage} урона ${target.getName()}`);
        target.takeDamage(damage);
        }
     UseSkil(target: Hero): void{
        console.log() ;
     }

    takeTurn(target: Hero, skillChance: number): void {
        if(this.burns) this.burning();
        if (!this.isAlive()) return;
        if (this.shouldSkip) {
            console.log(`${this.getName()} пропускает ход из-за заворожения`);
            return;
        }
        if (Math.random() < skillChance) {
            this.UseSkil(target);
        } else {
            this.attack(target);
        }
    }
}

export class Knight extends Hero {
    constructor(name: string, health: number, strength: number) {
        super(name, health, strength, "Рыцарь");
    }
    UseSkil(target: Hero): void {
        let damage = Math.floor(this.getStrength() * 1.3);
        console.log(`${this.getName()} (Рыцарь) использует Удар возмездия и наносит ${damage} урона ${target.getName()}`);
        target.takeDamage(damage);
    }
}

export class Archer extends Hero {
    usedFire: boolean = false;

    constructor(name: string, health: number, strength: number) {
        super(name, health, strength,"Лучник");
    }
    UseSkil(target: Hero): void {
        if (!this.usedFire) {
            this.usedFire = true;
            target.burns = true;
            console.log(`${this.getHealth()} (Лучник) использует Огненные стрелы! ${target.getName()} загорается.`);
        } else {
            console.log(`${this.getName()} (Лучник) наносит ${this.getStrength()} урона ${target.getName()}`);
            target.takeDamage(this.getStrength());
        }
    }
}

export class Mage extends Hero {
    constructor(name: string, health: number, strength: number) {
        super(name, health, strength,"Маг");
    }
    UseSkil(target: Hero): void {
        target.shouldSkip = true;
        console.log(`${this.getName()} (Маг) использует Заворожение! ${target.getName()} пропустит ход.`);
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
    if(count % 2 == 1){
        throw new Error("Должно быть четное количество участников");
    }
   
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
