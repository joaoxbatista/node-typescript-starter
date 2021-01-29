import { removeSpaces, removeTerminals, removeNonTerminals } from "./ParseUtils";
import { union } from "lodash";

export class Production {
  private productionString: string;
  private leftSide: string;
  private rightSide: Array<string>;
  private productionSeparator = "->";
  private rightSideSeparator = "|";

  constructor(productionString: string) {
    this.productionString = productionString;
    this.leftSide = this.getLeftSide();
    this.rightSide = this.getRightSide();
  }

  getLeftSide(): string {
    return removeSpaces(this.productionString.split(this.productionSeparator)[0]);
  }

  getRightSide(): Array<string> {
    const rightSide = this.productionString.split(this.productionSeparator)[1];
    let rightSideArray: Array<string> = [];

    if(!rightSide.includes(this.rightSideSeparator)) {
        rightSideArray = [removeSpaces(rightSide)];
    }
    else {
        rightSideArray = rightSide.split(this.rightSideSeparator).map((itemRightSide) => {
          return removeSpaces(itemRightSide);
        });
    }
    return rightSideArray;
  }

  getTerminals(): Array<string> {
    let terminals: Array<string> = [];
    this.rightSide.forEach((rightSideItem) => {
      terminals = [...terminals, ...removeNonTerminals(rightSideItem)];
    });
    return union(terminals);
  }

  getNonTerminals(): Array<string> {
    let nonTerminals: Array<string> = [this.leftSide];
    this.rightSide.forEach(rightSideItem => {
      nonTerminals = [...nonTerminals, ...removeTerminals(rightSideItem)];
    });
    return union(nonTerminals);
  }

}