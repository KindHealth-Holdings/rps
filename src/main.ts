import path from 'path';
import fs from 'fs';
import { PlayerConstructor } from './types';
import { Game } from './game';

const numRounds = 1000;
const playerPath = path.resolve(__dirname, 'players');
const players: PlayerConstructor[] = [];

fs.readdirSync(playerPath, { withFileTypes: true }).forEach((file) => {
  if (file.isFile() && file.name.endsWith('.ts')) {
    const playable = require(path.resolve(playerPath, file.name))
      .default as PlayerConstructor;

    players.push(playable);
  }
});

for (let i = 0; i < players.length; i++) {
  for (let j = i + 1; j < players.length; j++) {
    const game = new Game(players[i], players[j]);
    game.play(numRounds);

    console.log(game.results());
  }
}
