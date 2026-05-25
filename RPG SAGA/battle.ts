import { Hero, Knight, Archer, Mage, createRandomHeroes } from './Hero';

export class Game {
    heroes: Hero[];

    constructor(heroes: Hero[]) {
        this.heroes = heroes;
    }


    static fight(a: Hero, b: Hero): Hero {

        let curr: Hero = a;
        let opp: Hero = b;
        curr.burns = false;
        opp.burns = false;

        if (Math.random() < 0.5) {
        curr = b;
        opp = a;
        console.log(`Бой между ${curr.getName()} и ${opp.getName()}.`);
        console.log(`${curr.getName()} ходит первым.`);
    }

        while (a.isAlive() && b.isAlive()) {
            curr.takeTurn(opp, 0.35);
            let temp = curr;
            curr = opp;
            opp = temp;
        }

        let winner = a.isAlive() ? a : b;
        let loser = a.isAlive() ? b : a;
        console.log(`${loser.getName()} погибает\n`);
        return winner;
    }



    static start(players: Hero[]): Hero[] {
        let winners: Hero[] = [];
        let shuffled = players.slice();

    
        for (let i = shuffled.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = shuffled[i];
            shuffled[i] = shuffled[j];
            shuffled[j] = temp;
    }

        let i = 0;
        while (i + 1 < shuffled.length) {
            let winner = this.fight(shuffled[i], shuffled[i + 1]);
            winners.push(winner);
            i += 2;
    }
        if (i < shuffled.length) {
            console.log(`   ${shuffled[i].getName()} проходит без боя`);
            winners.push(shuffled[i]);
        }
        return winners;
}  

    static Battle(h: Hero[]): string {
        console.log("=== Начало турнира ===");
        let round = 1;
        let currentPlayers = h;

        while (currentPlayers.length > 1) {
            console.log(`\n===== Раунд ${round} =====`);
            currentPlayers = Game.start(currentPlayers);
            round++;
        }

        let champ = currentPlayers[0];
        let msg = `\nПобедитель турнира: ${champ.getName()} (${champ.getType()}) `
        console.log(msg);
        return(msg);
    }
}

//пробный турнир
Game.Battle(createRandomHeroes(6));




