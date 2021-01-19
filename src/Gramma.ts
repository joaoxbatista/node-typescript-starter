import { ProductionInterface } from './ProductionInterface';

export class Gramma {
    private produtions: Array<ProductionInterface>;
    private terminals: Array<string>;
    private nonTerminals: Array<string>;
    private initialSymbol: string;

    public constructor(productions: Array<ProductionInterface>, terminals: Array<string>, nonTerminals: Array<string>, initialSymbol: string ) {
        this.produtions = productions;
        this.terminals = terminals;
        this.nonTerminals = nonTerminals;
        this.initialSymbol = initialSymbol;
    }
}