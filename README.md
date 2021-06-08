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

## Defining Players

The `src/players` directory is where new player definitions can be placed. Each
file exports a default class definition that adheres to the `Playable`
interface. For example, a player that always plays 'paper':

```ts
// src/players/paper.ts
import { Choice, Player } from '../types';

export default class PaperPlayer extends Player {
  choose(): Choice {
    return 'paper';
  }
}
```

## Playing a Game

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
