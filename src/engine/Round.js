export class Round {

  COLORS = ['red', 'green', 'blue', 'yellow'];

  /**
   * @param {Round} round
   */
  constructor(round = {}) {
    this.colors = round?.colors ?? [];
    this.generateRoundColors();
  }

  generateRoundColors() {
    this.colors.push(this.getRandomColor());
  }

  getRandomColor() {
    const min = 0;
    const max = this.COLORS.length - 1;
    const randomColorIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    return this.COLORS[randomColorIndex];
  }

  createNextRound() {
    return new Round(this);
  }

  /**
   * Para propósitos de teste
   *
   * @param {string[]} colors Cores do round
   */
  setRoundColors(colors) {
    this.colors = colors;
  }
}
