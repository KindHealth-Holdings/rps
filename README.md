# RPS Challenge

This pairing exercise is a TypeScript port of the RubyQuiz
["Paper, Rock, Scissors"][1] challenge. The description from the source:

> Your task is to build a strategy for playing the game of Paper Rock Scissors
> against all manner of opponents. The question here is if you can adapt to an
> opponent's strategy and seize the advantage, while he is doing the same to
> you of course.

> If you're not familiar with this childhood game, it's very simple. Both
> players choose one of three items at the same time: Paper, a Rock, or
> Scissors. A "winner" is chosen by the following rules:

```
Paper covers a Rock. (Paper beats a Rock.)
Scissors cut Paper. (Scissors beat Paper.)
A Rock smashes Scissors. (A Rock beats Scissors.)
Anything else is a "draw".
```

## Setup

```
nvm use && yarn
```

## Game Mechanics

The main game loop performs the following in order:

1. Pulls 2 separate player definitions from the classes defined inside of the
   `src/players` directory
1. Initializes each player with the class name of the opponent — each player
   receives a value for `opponentName` as part of its constructor
1. Calls the `choose()` method for each player to determine that player's
   choice, which can be `'rock'`, `'paper'`, or `'scissors'`
1. Determines the winner of the round and informs each player of their choice,
   their opponent's choice, and the outcome of the round: `'win'`, `'lose'`, or
   `'draw'`
1. After performing 1000 rounds, prints out the results of the game and moves on
   to the next pairing of players

## Defining Players

The `src/players` directory is where new player definitions can be placed. Each
file exports a default class definition that adheres to the `Playable`
interface.

All players must implement the `choose()` method that has a return
type of `Choice` — namely the string `'rock'`, `'paper'`, or `'scissors'`. As
an example, here is a player that always plays `'paper'`:

```ts
// src/players/paper.ts
import { Choice, Player } from '../types';

export default class PaperPlayer extends Player {
  choose(): Choice {
    return 'paper';
  }
}
```

As your players become more advanced, there are other hooks available as
described in the [`Player`][2] base class.

## Testing Your Players

You need to create at least 2 players, then you can run `play` to pair each
defined player against the others:

```
yarn play
```

## Playing Games With Specific Players

When you have more than 2 players you may want to see how a specific player performs
against all the other players. Say you had a PaperPlayer, RockPlayer, and Scissor Player and you
only cared about the ScissorPlayer's performance you can run play like so:

```
yarn play ScissorPlayer
```

this will run 2 games ScissorPlayer vs. RockPlayer and ScissorPlayer vs. PaperPlayer

If you were only concerned with how two specific players performed when playing against eachother you can
do that as well. Say you only want to play RockPlayer against ScissorPlayer, the command would be:

```
yarn play ScissorPlayer RockPlayer
```


[1]: http://rubyquiz.com/quiz16.html
[2]: ./src/types.ts
