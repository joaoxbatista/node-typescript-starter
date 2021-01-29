import { Production } from './Production';
import { parseStringToProductions } from './ParseUtils';
import { union } from "lodash";
export class GrammaParser {
    private productions: Array<Production>;
    private grammaString: string;

    constructor (grammaString: string) {
        this.grammaString = grammaString;
        this.productions = parseStringToProductions(grammaString);
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
}