import { Production } from "./Production";
import { parseStringToProductions, hasDuplicates } from "./ParseUtils";
import { union } from "lodash";
export class Gramma {
  private productions: Array<Production>;
  private grammaString: string;
  private initialSymbol: string;

  constructor(grammaString: string) {
    this.grammaString = grammaString;
    this.productions = parseStringToProductions(grammaString);
    this.initialSymbol = this.getInitialSymbol();

    if (this.verifyHasLeftRercursion()) {
      throw new Error(
        "The gramma has left-handedness. Please delete it before continuing the process."
      );
    }

    if (this.verifyHasIndetermination()) {
      throw new Error(
        "The gramma has indetermination. Please delete it before continuing the process."
      );
    }

    if (this.verifyNotHasNonTerminals()) {
      throw new Error(
        "The gramma has non terminals not defined. Please delete it before continuing the process."
      );
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
    this.productions.forEach((production) => {
      terminals = [...terminals, ...production.getTerminals()];
    });
    return union([...terminals]);
  }
  getNonTerminals(): Array<string> {
    let nonTerminals: Array<string> = [];
    this.productions.forEach((production) => {
      nonTerminals = [...nonTerminals, ...production.getNonTerminals()];
    });
    return union([...nonTerminals]);
  }
  getInitialSymbol(): string {
    return this.productions[0].getLeftSide();
  }
  verifyHasLeftRercursion(): boolean {
    return this.productions
      .map((production) => {
        return production.hasLeftRecursion();
      })
      .includes(true);
  }

  verifyHasIndetermination(): boolean {
    let isDuplicate = false;
    this.productions.forEach((production) => {
      const firstLetters = production.getRightSide().map((righSideItem) => {
        return righSideItem[0];
      });
      isDuplicate = hasDuplicates(firstLetters);
    });

    return isDuplicate;
  }

  verifyNotHasNonTerminals(): boolean {
    const leftSideNonTerminals = this.productions.map((production) => {
      return production.getLeftSide();
    });

    return leftSideNonTerminals.length !== this.getNonTerminals().length;
  }
}
