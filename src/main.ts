import path from 'path';
import fs from 'fs';
import { PlayerConstructor } from './types';
import { Game } from './game';

const numRounds = 1000;
const playerPath = path.resolve(__dirname, 'players');
const players: PlayerConstructor[] = [];
const playerArgs = process.argv.slice(2);
let mainPlayerName: string = '';

if (playerArgs.length !== 0) {
  if (playerArgs.length > 2) {
    console.error('Please provide 2 player names maximum');
    process.exit(1);
  }

  if (playerArgs.length == 1) {
    [mainPlayerName] = playerArgs;
  }
}

fs.readdirSync(playerPath, { withFileTypes: true }).forEach((file) => {
  if (file.isFile() && file.name.endsWith('.ts')) {
    const playable = require(path.resolve(playerPath, file.name))
      .default as PlayerConstructor;
    if (playerArgs.length > 1) {
      if (playerArgs.includes(playable.name)) {
        players.push(playable);
      }
    } else {
      players.push(playable);
    }
  }
});

if (mainPlayerName) {
  const mainPlayer = players.find((player) => player.name === mainPlayerName);

  if (!mainPlayer) {
    console.error(`player with name ${mainPlayerName} could not be found`);
    process.exit(1);
  }

  const opposingPlayers = players.filter(
    (player) => player.name !== mainPlayerName
  );

  for (let player of opposingPlayers) {
    const game = new Game(mainPlayer, player);
    game.play(numRounds);
    console.table(game.results());
  }
} else {
  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      const game = new Game(players[i], players[j]);
      game.play(numRounds);

      console.table(game.results());
    }
  }
}
