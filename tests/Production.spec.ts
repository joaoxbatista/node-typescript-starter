import { Production } from '../src/Production';

const productionString = `S -> Aa | SaA | bB | Sa`;

describe('Production tests: ', () => {
  it.only('Run methods', () => {
    const production = new Production(productionString);
    console.log('getLeftSide: ');
    console.log(production.getLeftSide());
    console.log('getRightSide: ');
    console.log(production.getRightSide());
    console.log('getTerminals: ');
    console.log(production.getTerminals());
    console.log('getNonTerminals: ');
    console.log(production.getNonTerminals());
  });
  // it('getRightSide', () => {

  // });
  // it('Parse string to Production', () => {

  // });
});