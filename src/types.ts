type Choice = 'rock' | 'paper' | 'scissors';
type Outcome = 'win' | 'lose' | 'draw';

interface Playable {
  name(): string;
  choose(): Choice;
  result(you: Choice, them: Choice, outcome: Outcome): void;
}

type PlayerConstructor = new (opponentName: string) => Playable;

abstract class Player {
  constructor(protected readonly opponentName: string) {}

  name(): string {
    return this.constructor.name;
  }

  result(_you: Choice, _them: Choice, _outcome: Outcome): void {}
}

export { Choice, Outcome, Player, Playable, PlayerConstructor };
