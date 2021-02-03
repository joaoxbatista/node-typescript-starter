import { Gramma } from "../src/Gramma";
import { Production } from "../src/Production";

const grammaString = `
    A->aB
    B->cC|baB| 
    C->cD
    D-> 
`;

const grammaStringLeftRecursion = `
    A->Aa
`;
const nonTerminalsExpect = ["A", "B", "C", "D"];
const terminalsExpect = ["a", "b", "c", "ε"];
const gramma = new Gramma(grammaString);

describe("Verify of parse string to gramma items:", () => {
  it("Get quantity of productions", () => {
    const productions = gramma.getProductions();

    expect(productions.length).toBe(4);
  });

  it("Get non terminals array", () => {
    const nonTerminals = gramma.getNonTerminals();
    console.log(nonTerminals);
    nonTerminalsExpect.forEach((nonTerminalExpect) => {
      expect(nonTerminals).toContain(nonTerminalExpect);
    });
  });

  it("Get terminals array", () => {
    const terminals = gramma.getTerminals();
    console.log(terminals);
    terminalsExpect.forEach((terminalExpect) => {
      expect(terminals).toContain(terminalExpect);
    });
  });

  it("Verify if productions has left recursive", () => {
    try {
      const grammaRecursion = new Gramma(grammaStringLeftRecursion);
      console.log("Have left recursion: ");
      console.log(grammaRecursion.verifyIfHasLeftRercursion());
    } catch (error) {
      console.log(error);
    }
  });
});
