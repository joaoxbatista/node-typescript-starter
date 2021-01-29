import { ProductionInterface } from './ProductionInterface';
export class GrammaParser {
    private separator: string;

    public constructor (separator = '->') {
        this.separator = separator;
    }

    public stringToProductions(grammaString: string): Array<ProductionInterface>  {
        const lines = this.removeBreakLines(grammaString).split(/\n/gm);
        const productions: Array<ProductionInterface> = [];
        let rightSideArray: Array<string> = [];

        lines.forEach(line => {
            // eslint-disable-next-line prefer-const
            let [leftSide, rightSide] = line.split(this.separator);
            leftSide = this.removeSpaces(leftSide);

            if(!rightSide.includes('|')) {
                rightSideArray = [this.removeSpaces(rightSide)];
            }
            else {
                rightSideArray = rightSide.split("|").map((itemRightSide) => {
                  return this.removeSpaces(itemRightSide);
                });
            }

            const production = {
                leftSide,
                rightSide: rightSideArray
            };

            productions.push(production);
        });
        return productions;
    }
    
    productionsToNonTerminal(productions: Array<ProductionInterface>): Array<string> {
        let nonTerminals: Array<string> = [];
        productions.forEach((production) => {
            let productionsNonTerminal: Array<string> = [production.leftSide];
            production.rightSide.forEach(rightSide => {
                productionsNonTerminal = [...productionsNonTerminal, ...rightSide.replace(/[^A-Z]/gm, "").split("")];
            });
            nonTerminals = [...nonTerminals, ...productionsNonTerminal];
        });

        return  Array.from(new Set(nonTerminals));
    }

    public productionsToTerminals(productions: Array<ProductionInterface>): Array<string> {
        let terminals: Array<string> = [];
        let productionTermials = [];

        productions.map((production) => {
          
          production.rightSide.forEach((item) => {
            productionTermials = item.replace(/[A-Z]/gm, "").split("");
          });
          terminals = [...terminals, ...productionTermials];
        });
        return  Array.from(new Set(terminals));
    }

    

    public removeBreakLines(grammaString: string): string {
        return grammaString.replace(/^\n/gm, "").replace(/\n$/gm, "");
    }

    public removeSpaces(string: string): string {
        return string.replace(/\s/g, "");
    }
}