import { createRandomHeroes } from './Hero';
import { Game } from './battle';

let heroes = createRandomHeroes(6);
console.log(`Создано ${heroes.length} героев:`);
for (let i = 0; i < heroes.length; i++) {
    console.log(`${heroes[i].name} (${heroes[i].getType()}) здоровье:${heroes[i].health} сила:${heroes[i].strength}`);
}

let game = new Game(heroes);
game.start();
