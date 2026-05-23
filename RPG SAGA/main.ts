import { createRandomHeroes } from './Hero';
import { Game } from './battle';

let heroes = createRandomHeroes(6);
console.log(`Создано ${heroes.length} героев:`);
heroes.forEach(h => {
    console.log(`${h.getName()} (${h.getType()}) здоровье:${h.getHealth()} сила:${h.getStrength()}`);
});

let game = new Game(heroes);
game.start();