import { Gramma } from "./Gramma";

export class PreditiveTable {
  private gramma: Gramma;
  constructor(gramma: Gramma) {
    this.gramma = gramma;
  }

  generate(): any {
    const table: any = {};
    this.gramma.getNonTerminals().forEach((nonTerminal) => {
      table[nonTerminal] = {};

      const terminals = this.getTerminalsWithoutEpson();
      terminals.forEach((terminal) => {
        table[nonTerminal][terminal] = "";
      });
    });
    return table;
  }

  getTerminalsWithoutEpson(): Array<string> {
    const terminals = this.gramma.getTerminals();

    const epsonIndex = terminals.indexOf("ε");
    if (epsonIndex > -1) {
      terminals.splice(epsonIndex, 1);
    }

    return terminals;
  }
}
