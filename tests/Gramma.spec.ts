import { Gramma } from '../src/Gramma';

const grammaString = `
    A->aB
    B->cC|baB|  
    C->c
`;
const gramma = new Gramma(grammaString);

describe('Verify of parse string to gramma items:', () => {

    it('Get quantity of productions', () => {
        const productions = gramma.getProductions();
        expect(productions.length).toBe(3);
    });

    it('Get non terminals array', () => {
        const nonTerminals = gramma.getNonTerminals();
        expect(nonTerminals).toEqual(['A', 'B', 'C']);
    });

    it('Get terminals array', () => {
        const terminals = gramma.getTerminals();
        expect(terminals).toEqual(['a', 'c', 'b', 'ε']);
    });
});