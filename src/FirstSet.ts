import { Gramma } from "./Gramma";
import { Production } from "./Production";
import { SymbolsVerifier } from './SymbolsVerifier';
import { union } from 'lodash';
export type SetFirstObject = {
  nonTerminal: string
  firstTerminals: Array<string>,
  linkedNonTerminals: Array<string>
 }
export class FirstSet {
  private gramma: Gramma;
  constructor(gramma: Gramma) {
    this.gramma = gramma;
  }

  public getArray(): Array<SetFirstObject>{
    const setFirstObjects: Array<SetFirstObject>  = this.gramma.getProductions().map((production: Production) => {
      const setFirstObject: SetFirstObject = {
        nonTerminal: production.getLeftSide(),
        firstTerminals: [],
        linkedNonTerminals: []
      };
      production.getRightSide().forEach((rightSideItem: string) => {

        if(SymbolsVerifier.isTerminal(rightSideItem[0])) {
          setFirstObject.firstTerminals.push(rightSideItem[0]);
        }
        else {
          setFirstObject.linkedNonTerminals.push(rightSideItem[0]);
        }
      });
      return setFirstObject;
    });

    return setFirstObjects.map(setFirstObject => {
      setFirstObject.linkedNonTerminals.forEach(nonTerminal => {
        const setFirstObjectSelected = setFirstObjects.filter(setFirstObjectItem => setFirstObjectItem.nonTerminal === nonTerminal)?.[0];
        setFirstObject.firstTerminals = union([...setFirstObject.firstTerminals, ...setFirstObjectSelected.firstTerminals]);
      })
      return setFirstObject;
    });
  }
}
