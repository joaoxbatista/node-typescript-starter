import { Gramma } from "./Gramma";
import { Production } from "./Production";
import { SymbolsVerifier } from "./SymbolsVerifier";
import { first, union } from "lodash";
import { isMetaProperty } from "typescript";
export type SetFirstObject = {
  nonTerminal: string;
  firstTerminals: Array<string>;
  linkedNonTerminals: Array<string>;
};
export class FirstSet {
  private gramma: Gramma;
  constructor(gramma: Gramma) {
    this.gramma = gramma;
  }

  // Função que retorna o array com o conjunto first
  public getArray(): any {
    const nonTerminals = this.gramma.getNonTerminals();
    const productions = this.gramma.getProductions();
    const firstArray = nonTerminals.map((item) => {
      const first: Array<string> = [];
      return {
        nonTerminal: item,
        first,
      };
    });
    productions.forEach((production, index) => {
      const firstTerminals = this.getFirstOfProduction(production);
      firstArray[index].first = firstTerminals;
    });
    return firstArray;
  }

  // Função recursiva para pegar todos os primeiros simbolos da lado direito de uma produção
  public getFirstOfProduction(production: Production): Array<string> {
    let firstSymbols: Array<string> = [];
    production.getRightSide().forEach((item) => {
      firstSymbols = [...firstSymbols, ...this.getFirst(item)];
    });
    return firstSymbols;
  }

  // Função recursiva para pegar o primeiro simbolo da produção
  public getFirst(production: string): Array<string> {
    const firstSymbol = production[0];
    const isNonTerminal = this.gramma.getNonTerminals().includes(firstSymbol);
    if (isNonTerminal) {
      const recursiveProduction = this.gramma.findProduction(firstSymbol);
      return this.getFirstOfProduction(recursiveProduction);
    } else {
      return [firstSymbol];
    }
  }
}
