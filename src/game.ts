import { Choice, Playable, PlayerConstructor } from './types';

class Game {
  protected player1: Playable;
  protected player2: Playable;

  protected score1: number = 0;
  protected score2: number = 0;

  constructor(
    player1Class: PlayerConstructor,
    player2Class: PlayerConstructor
  ) {
    this.player1 = new player1Class(player2Class.name);
    this.player2 = new player2Class(player1Class.name);
  }

  play(numRounds: number) {
    for (let i = 0; i < numRounds; i++) {
      const hand1 = this.player1.choose();
      const hand2 = this.player2.choose();

      switch (hand1) {
        case 'paper':
          switch (hand2) {
            case 'paper':
              this.draw(hand1, hand2);
              break;
            case 'rock':
              this.win(this.player1, hand1, hand2);
              break;
            case 'scissors':
              this.win(this.player2, hand1, hand2);
              break;
          }
          break;
        case 'rock':
          switch (hand2) {
            case 'paper':
              this.win(this.player2, hand1, hand2);
              break;
            case 'rock':
              this.draw(hand1, hand2);
              break;
            case 'scissors':
              this.win(this.player1, hand1, hand2);
              break;
          }
          break;
        case 'scissors':
          switch (hand2) {
            case 'paper':
              this.win(this.player1, hand1, hand2);
              break;
            case 'rock':
              this.win(this.player2, hand1, hand2);
              break;
            case 'scissors':
              this.draw(hand1, hand2);
              break;
          }
          break;
      }
    }
  }

  results(): string {
    let match =
      `${this.player1.name()} vs. ${this.player2.name()}\n` +
      `  ${this.player1.name()}: ${this.score1}\n` +
      `  ${this.player2.name()}: ${this.score2}\n`;

    if (this.score1 === this.score2) {
      match += '  Draw\n';
    } else if (this.score1 > this.score2) {
      match += `  ${this.player1.name()} Wins\n`;
    } else {
      match += `  ${this.player2.name()} Wins\n`;
    }

    return match;
  }

  protected draw(hand1: Choice, hand2: Choice): void {
    this.score1 += 0.5;
    this.score2 += 0.5;

    this.player1.result(hand1, hand2, 'draw');
    this.player2.result(hand2, hand1, 'draw');
  }

  protected win(winner: Playable, hand1: Choice, hand2: Choice): void {
    if (winner === this.player1) {
      this.score1 += 1;
      this.player1.result(hand1, hand2, 'win');
      this.player2.result(hand2, hand1, 'lose');
    } else {
      this.score2 += 1;
      this.player1.result(hand1, hand2, 'lose');
      this.player2.result(hand2, hand1, 'win');
    }
  }
}

export { Game };
