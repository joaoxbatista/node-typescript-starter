import { Gramma } from "./Gramma";
import { FirstSet } from "./FirstSet";
import { FollowSet } from "./FollowSet";
import { SymbolsVerifier } from "./SymbolsVerifier";
import { union } from "lodash";

export class PreditiveTable {
  private gramma: Gramma;
  private follow: FollowSet;
  private first: FirstSet;
  public table: any;
  public simbolsVerifier: SymbolsVerifier;

  constructor(gramma: Gramma) {
    this.gramma = gramma;
    this.follow = new FollowSet(gramma);
    this.first = new FirstSet(gramma);
    this.simbolsVerifier = new SymbolsVerifier();
    this.table = {};
  }

  generate(): any {
    const nonTerminals = this.gramma.getNonTerminals().sort();
    const terminals = this.gramma.getTerminalsWithoutEpson().sort();

    nonTerminals.forEach((nonTerminal) => {
      this.table[nonTerminal] = {};
      terminals.forEach((terminal) => {
        this.table[nonTerminal][terminal] = "";
      });
      this.table[nonTerminal]["$"] = "";
    });
    this.populate();
    console.log(this.table);
    return this.table;
  }

  getTerminalsWithoutEpson(): Array<string> {
    return this.removeEpson(this.gramma.getTerminals());
  }

  removeEpson(terminals: Array<string>): Array<string> {
    const epsonIndex = terminals.indexOf("ε");
    if (epsonIndex > -1) {
      terminals.splice(epsonIndex, 1);
    }
    return terminals;
  }

  findFirstByString(production: string): Array<string> {
    let first: Array<string> = [];
    const productionSymbols = production.split("");

    for (let i = 0; i < productionSymbols.length; i++) {
      const symbol = productionSymbols[i];
      if (this.simbolsVerifier.isNonTerminal(symbol)) {
        first = [...first, ...this.findFirst(symbol)];
        if (!first.includes("ε")) {
          break;
        }
      } else {
        first = [...first, symbol];
        break;
      }
    }

    return union(first);
  }

  findFirst(nonTerminal: string): Array<string> {
    console.log(`FIRST de ${nonTerminal}:`);
    console.log(this.first.getArray());

    const first = this.first
      .getArray()
      .filter(
        (first: { nonTerminal: string; first: Array<string> }) =>
          first.nonTerminal === nonTerminal
      )?.[0]?.first;
    return first != undefined ? first : [];
  }

  findFollow(nonTerminal: string): Array<string> {
    const follow = this.follow
      .getArray()
      .filter(
        (follow: { nonTerminal: string; follow: Array<string> }) =>
          follow.nonTerminal === nonTerminal
      )?.[0]?.follow;
    return follow != undefined ? follow : [];
  }

  populate(): boolean {
    const productions = this.gramma.getProductions();
    console.log(this.table);

    productions.forEach((production, index) => {
      const nonTerminal = production.getLeftSide();
      const firstOfNonTerminal = this.findFirst(nonTerminal);

      if (firstOfNonTerminal.includes("ε")) {
        const followOfNonTerminal = this.findFollow(nonTerminal);
        followOfNonTerminal.forEach((followTerminal: string) => {
          const productionResult = `${nonTerminal}${production.productionSeparator}ε`;
          this.table[nonTerminal][followTerminal] = productionResult;

          console.log(`
            Se possuir ε
            [${nonTerminal}][${followTerminal}];
          `);
        });
      }

      firstOfNonTerminal.forEach((firstTerminal: string) => {
        if (firstTerminal != "ε") {
          const nonTerminalProductions = production.getRightSide();

          // Verificar se é um terminal ou se é uma expressão
          nonTerminalProductions.forEach((nonTerminalProduction) => {
            if (
              nonTerminalProduction === firstTerminal ||
              nonTerminalProduction[0] === firstTerminal
            ) {
              const productionResult = `${nonTerminal}${production.productionSeparator}${nonTerminalProduction}`;
              this.table[nonTerminal][firstTerminal] = productionResult;
            } else if (
              this.simbolsVerifier.isNonTerminal(nonTerminalProduction[0])
            ) {
              const firstOfProduction = this.findFirstByString(
                nonTerminalProduction
              );

              // Verificar se o terminal está contido no firstOfProduction
              console.log(`First by string: ${nonTerminalProduction}`);
              console.log(firstOfProduction);

              if (firstOfNonTerminal.includes(firstTerminal)) {
                const productionResult = `${nonTerminal}${production.productionSeparator}${nonTerminalProduction}`;
                this.table[nonTerminal][firstTerminal] = productionResult;
              }
            }
          });
        }
      });
    });

    return false;
  }
}
