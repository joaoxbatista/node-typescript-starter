import { Gramma } from "./Gramma";
import { Production } from "./Production";
import { uniq } from "lodash";

export type SetFirstObject = {
  nonTerminal: string;
  firstTerminals: Array<string>;
  linkedNonTerminals: Array<string>;
};
export class FirstSet {
  private gramma: Gramma;
  private isDebugger: boolean;

  constructor(gramma: Gramma) {
    this.isDebugger = false;
    this.gramma = gramma;
  }

  // Função que retorna o array com o conjunto first
  public getArray(): any {
    this.logger("GRAMATICA:", this.gramma);
    const nonTerminals = this.gramma.getNonTerminals();
    const productions = this.gramma.getProductions();

    const firstArray: Array<{ nonTerminal: string; first: Array<string> }> = [];
    nonTerminals.forEach((item, index) => {
      const first: Array<string> = [];
      firstArray[index] = {
        nonTerminal: item,
        first,
      };
    });

    productions.forEach((production, index) => {
      this.logger(
        `*===================== Conjunto FIRST de ${production.getLeftSide()} =====================* `
      );
      const firstTerminals = this.getFirstOfProduction(production);
      firstArray[index].first = firstTerminals;
    });
    return firstArray;
  }

  // Função que retorna o array com o conjunto first
  public getArrayWithoutEpson(): any {
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
      firstArray[index].first = firstTerminals.filter((item) => item != "ε");
    });
  }

  // Função recursiva para pegar todos os primeiros simbolos da lado direito de uma produção
  public getFirstOfProduction(production: Production): Array<string> {
    let firstSymbols: Array<string> = [];
    this.logger(`
      Lado direito da produção: 
      ${production.getRightSide().toString()}
    `);
    production.getRightSide().forEach((item) => {
      firstSymbols = [...firstSymbols, ...this.getFirst(item)];
    });
    return firstSymbols;
  }

  // Função recursiva para pegar o primeiro simbolo da produção
  public getFirst(production: string): Array<string> {
    this.logger(`========== First de  ${production} ============`);
    const firstSymbol = production[0];
    const isNonTerminal = this.gramma.getNonTerminals().includes(firstSymbol);

    this.logger("Simbolo inicial", firstSymbol);

    if (isNonTerminal) {
      const recursiveProduction = this.gramma.findProduction(firstSymbol);
      this.logger(
        "Se for não terminal pega a produção associada ao não terminal: ",
        recursiveProduction.toString()
      );
      if (production.length > 1) {
        // Se conter epsolon adicionar os terminais que não são epsolon
        // e chamar this.getFirst(production.slice(1))

        const first = this.getFirstOfProduction(recursiveProduction);
        const containsEpslon = first.includes("ε");
        const firstWithoutEpslon = first.filter((item) => item != "ε");
        const firstSet = containsEpslon
          ? uniq([...firstWithoutEpslon, ...this.getFirst(production.slice(1))])
          : first;
        return firstSet;
      }
      return this.getFirstOfProduction(recursiveProduction);
    } else {
      this.logger("Se for terminal");
      if (firstSymbol == "ε" && production.length > 1) {
        this.logger(
          "Se for o e não for último simbolo e for a cadeia vaiza, fazer uma chamada recursiva com: ",
          this.getFirst(production.slice(1))
        );
        return this.getFirst(production.slice(1));
      }
      this.logger("É o útimo terminal: ", firstSymbol);
      return [firstSymbol];
    }
  }

  logger(label?: any, data?: any): void {
    if (this.isDebugger) {
      if (label) console.log(label);
      if (data) console.log(data);
    }
  }
}
