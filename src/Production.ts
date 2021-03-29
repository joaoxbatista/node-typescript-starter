import {
  removeSpaces,
  parseSpaceToEpson,
  removeTerminals,
  removeNonTerminals,
  removeNonTerminalsAndEpson,
} from "./ParseUtils";
import { union } from "lodash";

export class Production {
  private productionString: string;
  private leftSide: string;
  private rightSide: Array<string>;
  public productionSeparator = "->";
  public rightSideSeparator = "|";

  constructor(productionString: string) {
    this.productionString = productionString;
    this.leftSide = this.getLeftSide();
    this.rightSide = this.getRightSide();
  }

  getLeftSide(): string {
    return removeSpaces(
      this.productionString.split(this.productionSeparator)[0]
    );
  }

  getRightSide(): Array<string> {
    const rightSide = this.productionString.split(this.productionSeparator)[1];
    let rightSideArray: Array<string> = [];

    if (!rightSide.includes(this.rightSideSeparator)) {
      rightSideArray = [parseSpaceToEpson(rightSide)];
    } else {
      rightSideArray = rightSide
        .split(this.rightSideSeparator)
        .map((itemRightSide) => {
          return parseSpaceToEpson(itemRightSide);
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

  getTerminalsWithoutEpson(): Array<string> {
    let terminals: Array<string> = [];
    this.rightSide.forEach((rightSideItem) => {
      terminals = [...terminals, ...removeNonTerminalsAndEpson(rightSideItem)];
    });
    return union(terminals);
  }

  getNonTerminals(): Array<string> {
    let nonTerminals: Array<string> = [this.leftSide];
    this.rightSide.forEach((rightSideItem) => {
      nonTerminals = [...nonTerminals, ...removeTerminals(rightSideItem)];
    });
    return union(nonTerminals);
  }

  public toString(): string {
    return `${this.getLeftSide()} ${
      this.productionSeparator
    } ${this.rightSideToString()}`;
  }

  private rightSideToString(): string {
    let resultString = "";
    const rightSide = this.getRightSide();
    rightSide.forEach((rightSideItem, index) => {
      resultString +=
        index + 1 < rightSide.length
          ? `${rightSideItem}${this.rightSideSeparator}`
          : `${rightSideItem}`;
    });
    return resultString;
  }

  public hasLeftRecursion(): boolean {
    return this.getRightSide()
      .map((rightSideItem) => {
        return rightSideItem.startsWith(this.leftSide);
      })
      .includes(true);
  }
}
