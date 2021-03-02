import { FirstSet } from "./FirstSet";
import { Gramma } from "./Gramma";
import { Production } from "./Production";
import { uniq } from "lodash";

export class FollowSet {
  private gramma: Gramma;
  private firstSet: Array<{ nonTerminal: string; first: Array<string> }>;
  constructor(gramma: Gramma) {
    this.gramma = gramma;
    this.firstSet = new FirstSet(gramma).getArray();
  }

  public getAllProductions(): Array<{ leftSide: string; rightSide: string }> {
    let productions: Array<{ leftSide: string; rightSide: string }> = [];
    this.gramma.getProductions().forEach((production) => {
      const rightSideProductions: Array<{
        leftSide: string;
        rightSide: string;
      }> = [];

      production.getRightSide().forEach((item) => {
        rightSideProductions.push({
          leftSide: production.getLeftSide(),
          rightSide: item,
        });
      });

      productions = [...productions, ...rightSideProductions];
    });

    return productions;
  }

  public getArray(): any {
    const nonTerminals = this.gramma.getNonTerminals();

    const followArray = nonTerminals.map((item) => {
      const follow: Array<string> = [];
      return {
        nonTerminal: item,
        follow,
      };
    });

    nonTerminals.forEach((nonTerminal, index) => {
      followArray[index].follow = this.getFollowSet(nonTerminal, index);
    });

    return followArray;
  }

  public getFollowSet(nonTerminal: string, index: number): Array<string> {
    console.log("Não terminal : " + nonTerminal);
    let followSet: Array<string> = [];
    const productionsHasNonTerminal = this.getAllProductions().filter(
      (production) => {
        return production.rightSide.includes(nonTerminal);
      }
    );

    if (!productionsHasNonTerminal.length) {
      followSet = ["$"];
    }

    productionsHasNonTerminal.forEach((item) => {
      const indexNonTerminal = item.rightSide.indexOf(nonTerminal);
      const indexFollow = indexNonTerminal + 1;
      const follow = item.rightSide[indexFollow];

      // Caso seja o último simbolo da produção
      if (indexNonTerminal === item.rightSide.length - 1 && index) {
        // Retornar o first do left side
        // console.log(`Pegar First do ${item.leftSide} -  ${index}`);
        const firstSetSelected = this.firstSet.filter(
          (itemFirst) => itemFirst.nonTerminal === item.leftSide
        )?.[0];
        followSet = uniq([...followSet, ...firstSetSelected.first]);
      } else {
        // console.log(item);
        // console.log(`indexFollow: ${indexFollow}`);

        if (this.gramma.getNonTerminals().includes(follow)) {
          const firstSetSelected = this.firstSet.filter(
            (item) => item.nonTerminal === nonTerminal
          )?.[0];
          followSet = uniq([...followSet, ...firstSetSelected.first]);
        }

        if (this.gramma.getTerminals().includes(follow)) {
          followSet = uniq([...followSet, follow]);
        }
      }
    });

    return followSet;
  }
}
