import { Gramma } from "../src/Gramma";
import { FirstSet } from "../src/FirstSet";
const grammaString = `
  A->aB
  B->Cc|baB| 
  C->cD
  D-> 
`;
const gramma = new Gramma(grammaString);
const firstSet = new FirstSet(gramma);

describe("Test of First class", () => {
  it("Get first set", () => {
    expect(firstSet.getArray()).toStrictEqual([
      {
        nonTerminal: 'A',
        firstTerminals: [ 'a' ],      
        linkedNonTerminals: []       
      },
      {
        nonTerminal: 'B',
        firstTerminals: ['b', 'ε', 'c' ],
        linkedNonTerminals: ['C']       
      },
      {
        nonTerminal: 'C',
        firstTerminals: [ 'c' ],      
        linkedNonTerminals: []       
      },
      {
        nonTerminal: 'D',
        firstTerminals: [ 'ε' ],      
        linkedNonTerminals: []       
      }
    ]);
  });
});
