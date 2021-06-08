type Choice = 'rock' | 'paper' | 'scissors';
type Outcome = 'win' | 'lose' | 'draw';

interface Playable {
  name(): string;
  choose(): Choice;
  result(you: Choice, them: Choice, outcome: Outcome): void;
}

type PlayerConstructor = new (opponentName: string) => Playable;

abstract class Player {
  /**
   * Called at the start of the game, each player will get the name of their
   * opponent for all rounds played as part of the game
   *
   * @param opponentName The class name of the opponent
   */
  constructor(protected readonly opponentName: string) {}

  /**
   * Convenience method to determine the name of this player
   */
  name(): string {
    return this.constructor.name;
  }

  /**
   * Called at the end of a round, each player receives the choice they played,
   * the choice their opponent played, and the outcome of that round
   *
   * @param you Your choice in the last round
   * @param them Their choice in the last round
   * @param outcome The outcome of the last round
   */
  result(you: Choice, them: Choice, outcome: Outcome): void {}
}

export { Choice, Outcome, Player, Playable, PlayerConstructor };
