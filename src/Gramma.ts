import { Production } from './Production';
import { parseStringToProductions } from './ParseUtils';
import { union } from "lodash";
export class Gramma {
    private productions: Array<Production>;
    private grammaString: string;
    private initialSymbol: string;
    
    constructor (grammaString: string) {
        this.grammaString = grammaString;
        this.productions = parseStringToProductions(grammaString);
        this.initialSymbol = this.getInitialSymbol();

        if(this.verifyIfHasLeftRercursion()) {
            throw new Error('The grammar has left-handedness. Please delete it before continuing the process.');
        }
    }
    getProductions(): Array<Production> {
        return this.productions;
    }
    getGrammaString(): string {
        return this.grammaString;
    }
    getTerminals(): Array<string> {
        let terminals: Array<string> = [];
        this.productions.forEach(production => {
            terminals = [...terminals, ...production.getTerminals()]
        })
        return union([...terminals]);
    }
    getNonTerminals(): Array<string> {
        let nonTerminals: Array<string> = [];
        this.productions.forEach(production => {
            nonTerminals = [...nonTerminals, ...production.getNonTerminals()]
        })
        return union([...nonTerminals]);
    }
    getInitialSymbol():string {
        return this.productions[0].getLeftSide();
    }
    verifyIfHasLeftRercursion():boolean {
        this.productions.forEach(production => {
            return production.hasLeftRecursion();
        });
        return false;
    }
}