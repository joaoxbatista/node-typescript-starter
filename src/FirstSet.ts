import { Gramma } from "./Gramma";
import { Production } from "./Production";
import { SymbolsVerifier } from "./SymbolsVerifier";
import { first, union } from "lodash";
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

  // Pegar o primeiro elemento de cada produção de cada sentença

  //  A: [Ba, Cb]
  //  B: [&, c]
  //  C: [cB]

  // Não terminais [A, B, C]
  // Terminais [a, b, &, c]

  //  first(A) = {}
  //  first(B) = {}
  //  first(C) = {}

  // Executar a rotina recursiva para obter os terminais do conjunto first
  // Para cada Não terminal, executar a rotina até não existir mais simbolos a serem verificados

  // First de A (Ba)
  // A1 - Ba

  // First de B (&)
  // B1 - & ^

  // First de B (c)
  // B2 - c ^

  // First de A (Ba)
  // A2 - Ba (&a)
  // A3 - First(&a) = & ^
  // A4 - First(ca) = c ^

  // First de B - Já foi calculado

  // First de C (cB)
  // C1 - c ^

  public getArray(): any {}

  // public getArray(): Array<SetFirstObject>{
  //   const setFirstObjects: Array<SetFirstObject>  = this.gramma.getProductions().map((production: Production) => {
  //     const setFirstObject: SetFirstObject = {
  //       nonTerminal: production.getLeftSide(),
  //       firstTerminals: [],
  //       linkedNonTerminals: []
  //     };
  //     production.getRightSide().forEach((rightSideItem: string) => {

  //       if(SymbolsVerifier.isTerminal(rightSideItem[0])) {
  //         setFirstObject.firstTerminals.push(rightSideItem[0]);
  //       }
  //       else {
  //         setFirstObject.linkedNonTerminals.push(rightSideItem[0]);
  //       }
  //     });
  //     return setFirstObject;
  //   });

  //   return setFirstObjects.map(setFirstObject => {
  //     setFirstObject.linkedNonTerminals.forEach(nonTerminal => {
  //       const setFirstObjectSelected = setFirstObjects.filter(setFirstObjectItem => setFirstObjectItem.nonTerminal === nonTerminal)?.[0];
  //       setFirstObject.firstTerminals = union([...setFirstObject.firstTerminals, ...setFirstObjectSelected.firstTerminals]);
  //     })
  //     return setFirstObject;
  //   });
  // }
}
