import { GrammaParser } from '../src/GrammaParser';

const grammar = `
    A -> aB
    B -> cC | baB
    C -> c
`;
const grammaParser = new GrammaParser(grammar);

describe('Verify of parse string to gramma items:', () => {

    it('Get quantity of productions', () => {
        const productions = grammaParser.getProductions();
        expect(productions.length).toBe(3);
    });

    it('Get non terminals array', () => {
        const nonTerminals = grammaParser.getNonTerminals();
        expect(nonTerminals).toEqual(['A', 'B', 'C']);
    });

    it('Get terminals array', () => {
        const terminals = grammaParser.getTerminals();
        expect(terminals).toEqual(['a', 'c', 'b']);
    });
});