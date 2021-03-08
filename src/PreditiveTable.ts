import { Gramma } from "./Gramma";
import { FirstSet } from "./FirstSet";
import { FollowSet } from "./FollowSet";

export class PreditiveTable {
  private gramma: Gramma;
  private follow: FollowSet;
  private first: FirstSet;
  public table: any;

  constructor(gramma: Gramma) {
    this.gramma = gramma;
    this.follow = new FollowSet(gramma);
    this.first = new FirstSet(gramma);
    this.table = {};
  }

  generate(): any {
    this.gramma.getNonTerminals().forEach((nonTerminal) => {
      this.table[nonTerminal] = {};
      const terminals = this.getTerminalsWithoutEpson();
      terminals.forEach((terminal) => {
        this.table[nonTerminal][terminal] = "";
      });
      this.table[nonTerminal]["$"] = "";
    });

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

  populate(): boolean {
    const productions = this.gramma.getProductions();

    console.log(productions);
    console.log(this.table);

    productions.forEach((production) => {
      const nonTerminal = production.getLeftSide();
      let firstOfNonTerminal = this.first
        .getArray()
        .filter(
          (first: { nonTerminal: string; first: Array<string> }) =>
            first.nonTerminal === nonTerminal
        )?.[0]?.first;

      const containsEpson = firstOfNonTerminal.includes("ε");

      firstOfNonTerminal = firstOfNonTerminal.length
        ? this.removeEpson(firstOfNonTerminal)
        : false;

      const followOfNonTerminal = this.follow
        .getArray()
        .filter(
          (first: { nonTerminal: string; first: Array<string> }) =>
            first.nonTerminal === nonTerminal
        )?.[0]?.follow;

      const nonTerminalProductions = production.getRightSide();

      firstOfNonTerminal.forEach((terminal: string, index: number) => {
        this.table[nonTerminal][
          terminal
        ] = `${nonTerminal}${production.productionSeparator}${nonTerminalProductions[index]}`;
      });

      if (containsEpson) {
        followOfNonTerminal.forEach((terminal: string, index: number) => {
          this.table[nonTerminal][
            terminal
          ] = `${nonTerminal}${production.productionSeparator}ε`;
        });
      }
    });

    console.log(this.table);
    return true;

    // this.table.map((nonTerminal: string) => {
    //   const selectedProduction = productions.filter(
    //     (production) => production.getLeftSide() === nonTerminal
    //   )?.[0];
    //   const firstOfNonTerminal = this.first
    //     .getArray()
    //     .filter(
    //       (first: { nonTerminal: string; first: Array<string> }) =>
    //         first.nonTerminal === nonTerminal
    //     );
    //   const followOfNonTerminal = this.follow
    //     .getArray()
    //     .filter(
    //       (first: { nonTerminal: string; first: Array<string> }) =>
    //         first.nonTerminal === nonTerminal
    //     );
    //   const nonTerminalProductions = selectedProduction.getRightSide();
    //   console.log(firstOfNonTerminal);
    //   console.log(followOfNonTerminal);
    //   console.log(nonTerminalProductions);
    // });
  }
}
