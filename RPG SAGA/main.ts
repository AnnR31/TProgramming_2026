import { createRandomHeroes } from './Hero';
import { Game } from './battle';

const heroCount = 6; 
const heroes = createRandomHeroes(heroCount);
console.log(`Создано ${heroes.length} героев:`);
heroes.forEach(h => console.log(`${h.getName()} (${h.constructor.name}) здоровье:${h.getHealth()} сила:${h.getStrength()}`));

const game = new Game(heroes);
game.start();