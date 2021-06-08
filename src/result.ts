export default class Result {
  constructor(
    private player1: { name: string; score: number; result?: string },
    private player2: { name: string; score: number; result?: string }
  ) {
    this.setResults();
  }

  private setResults() {
    this.player1.result = 'Draw';
    this.player2.result = 'Draw';

    if (this.player1.score > this.player2.score) {
      this.player1.result = 'Winner!';
      this.player2.result = 'Loser';
    } else if (this.player1.score < this.player2.score) {
      this.player1.result = 'Loser';
      this.player2.result = 'Winner!';
    }
  }
}
