import { ProductionInterface } from './ProductionInterface';
export class GrammaParser {
    private separator: string;

    public constructor (separator = '->') {
        this.separator = separator;
    }

    public stringToProductions(grammaString: string): Array<ProductionInterface>  {
        const lines = this.removeBreakLines(grammaString).split(/\n/gm);
        let productions: Array<ProductionInterface> = [];
        let rightSideArray: Array<string> = [];

        lines.forEach(line => {
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

            let production = {
                leftSide,
                rightSide: rightSideArray
            };

            productions.push(production);
        });
        return productions;
    }
    
    public productionsToTerminals(productions: Array<ProductionInterface>): Array<string> {
        let terminals: Array<string> = [];
        let nonTerminals: Array<string> = [];

        productions.map((production) => {
          let productionTermials = [];

          production.rightSide.forEach((item) => {
            const terminals = item.replace(/[A-Z]/gm, "");
            console.log('TERMINALS: ');
            console.log(terminals);
          });
        
        // TODO: terminar implementação do método
        //   let productionNonTerminals = production.rightSide.map((item) => {
        //     return item.replace(/[^A-Z]/, "");
        //   });

        //   nonTerminals = nonTerminals.concat([
        //     production.leftSide,
        //     ...productionNonTerminals,
        //   ]);
          terminals = terminals.concat(productionTermials);
        });
        return terminals;
    }

    

    public removeBreakLines(grammaString: string): string {
        return grammaString.replace(/^\n/gm, "").replace(/\n$/gm, "");
    }

    public removeSpaces(string: string): string {
        return string.replace(/\s/g, "");
    }
}