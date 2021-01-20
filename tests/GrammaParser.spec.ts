import { GrammaParser } from '../src/GrammaParser';
import { ProductionInterface } from '../src/ProductionInterface';
const grammaParser = new GrammaParser();
const grammar = `

    A -> aB
    B -> cC | baB
    C -> c
`;

describe('Verificação da conversão de stringpara gramática:', () => {

    it('Obternção de Produções', () => {
        const productions = grammaParser.stringToProductions(grammar);
        expect(productions.length).toBe(3);
    });

    // it('Obtenção do Símbolo Inicial', () => {

    // });

    // it('Obtenção dos Terminais', () => {

    // });

    // it('Obtenção dos Não terminais', () => {

    // });
});