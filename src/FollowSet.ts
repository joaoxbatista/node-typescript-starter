import { FirstSet } from "./FirstSet";
import { Gramma } from "./Gramma";
import { Production } from "./Production";
import { uniq } from "lodash";

export class FollowSet {
  private gramma: Gramma;
  private firstSet: Array<{ nonTerminal: string; first: Array<string> }>;
  private isDebugger: boolean;
  constructor(gramma: Gramma, isDebugger = false) {
    this.isDebugger = isDebugger;
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
      followArray[index].follow = this.getFollowSet(nonTerminal);
    });

    return followArray;
  }

  public getFollowSet(nonTerminal: string): Array<string> {
    this.logger(`
      =======================
      FOLLOW DE ${nonTerminal}
      =======================
    `);
    // 1 - Definir o conjunto follow a ser armazenado
    let followSet: Array<string> = [];

    // 2 - O não terminal é o simbolo inicial
    if (nonTerminal === this.gramma.getInitialSymbol()) {
      this.logger(`Não terminal ${nonTerminal} é o simbolo inicial`);
      followSet.push("$");
    }

    // 3 - Obtem produções que contem o não terminal no lado direito
    const productionsHasNonTerminal = this.getAllProductions().filter(
      (production) => {
        return production.rightSide.includes(nonTerminal);
      }
    );

    // 4 - Caso existam produções que contem o não terminal no lado direito
    if (productionsHasNonTerminal.length) {
      // 5 - Percorrer as produções que contem o não terminal no lado direito
      productionsHasNonTerminal.forEach((item) => {
        // 6 - Defini variáveis que armazenam as posições de ocorrência do não termina e seu follow
        const indexNonTerminal = item.rightSide.indexOf(nonTerminal);
        const indexFollow = indexNonTerminal + 1;
        const follow = item.rightSide[indexFollow];

        this.logger(`indexNonTerminal: ${indexNonTerminal}`);
        this.logger(`indexFollow: ${indexFollow}`);
        this.logger(`follow: ${follow}`);

        // 7 - Se existir o próximo símbolo (follow)
        if (follow) {
          // 8 - Se o follow for um temrinal
          if (!this.gramma.getNonTerminals().includes(follow)) {
            followSet = uniq([...followSet, follow]);
          }
          // 9 - Se o follow for um não terminal
          else {
            this.logger(
              `O não terminal ${nonTerminal} tem como follow ${follow} -> pegar o first de ${follow}`
            );
            const firstSetSelected = this.firstSet.filter(
              (firstSet) => firstSet.nonTerminal === follow
            )?.[0];

            // Se houver first
            if (firstSetSelected) {
              followSet = uniq([
                ...followSet,
                ...this.removeEpstonToFirst(firstSetSelected.first),
              ]);
              this.logger(firstSetSelected);

              // Se houver cadeia vaiza no first
              if (firstSetSelected.first.includes("ε")) {
                const newFollow = item.rightSide[indexFollow + 1];

                this.logger(
                  `First de ${
                    firstSetSelected.nonTerminal
                  } possui a cadeia vaiza: ${firstSetSelected.first.toString()}
                  
                  Então pegamos o próximo simbolo que é: 
                  ${newFollow}

                  Sendo a produção: ${item.rightSide}
                  `
                );

                if (newFollow) {
                  this.logger(`
                  Possuindo um novo follow, vamos verificar se ele é um 
                  não terminal ou não.
                  `);

                  if (this.gramma.getTerminals().includes(newFollow)) {
                    this.logger(`
                    Se for um TERMINAL, então adiciono ao follow set e finalizo o fluxo  
                    `);
                    followSet = uniq([...followSet, newFollow]);
                  } else {
                    this.logger(`
                    Se for um NÃO TERMINAL, então adiciono ao follow set e finalizo o fluxo  
                    `);
                    followSet = uniq([
                      ...followSet,
                      ...this.getFollowSet(newFollow),
                    ]);
                  }
                } else {
                  // Chamada recursiva para obter o follow do item.leftSide
                  this.logger(
                    `Chamada recursiva para obter o follow do ${item.leftSide}`
                  );

                  if (item.leftSide != nonTerminal) {
                    followSet = uniq([
                      ...followSet,
                      ...this.getFollowSet(item.leftSide),
                    ]);
                  }
                }
              }
            }
          }
        }

        // 10 - Se não existir o próximo simbolo (follow)
        else {
          // 11 - Inserir o $ no follow
          followSet = uniq([...followSet, ...this.getFollowSet(item.leftSide)]);
          const isInitialSimbol =
            item.leftSide === this.gramma.getInitialSymbol();

          const message = isInitialSimbol
            ? `O follow do simbolo inicial é $`
            : `O follow de ${nonTerminal} em ${item.rightSide} é $`;
          this.logger(message);
        }
      });
    }

    return followSet;
  }

  logger(label?: any, data?: any): void {
    if (this.isDebugger) {
      if (label) console.log(label);
      if (data) console.log(data);
    }
  }

  removeEpstonToFirst(first: Array<string>): Array<string> {
    return first.filter((item: string) => item != "ε");
  }
}
