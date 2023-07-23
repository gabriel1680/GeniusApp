import { Round } from '../../src/engine/Round';

/**
 * Fixture shorthand para criação de um round já configurado
 * 
 * @param {string[]} colors Lista de cores do round
 * @returns {Round}
 */
export function createConfiguredRoundWith(colors) {
  const round = new Round();
  round.setRoundColors(colors);
  return round;
}