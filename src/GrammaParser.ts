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
            leftSide = leftSide.replace(/\s/g, '');
            if(rightSide.includes('|')) {
                 rightSideArray = rightSide.split('|').map(itemRightSide => {
                    return itemRightSide.replace(/\s/g, '');
                });
            }else {
                rightSide = rightSide.replace(/^\s/, '');
            }
            let production = {
                leftSide,
                rightSide: rightSideArray.length ? rightSideArray : rightSide
            };

            productions.push(production);
        });
        console.log(productions);
        return productions;
    }

    public stringToTerminals(rightSideProduction: string): Array<string> {
        return [];
    }
    public stringToNonTerminals(rightSideProduction: string): Array<string> {
        return [];
    }

    public removeBreakLines(grammaString: string): string {
        return grammaString.replace(/^\n/gm, "").replace(/\n$/gm, "");
    }
}