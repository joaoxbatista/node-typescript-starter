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

const gramaStringIndetermination = `
    A->Aa|AB
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
      console.log(grammaRecursion.verifyHasLeftRercursion());
    } catch (error) {
      console.log(error);
    }
  });

  it("Verify if gramma has indetermination", () => {
    try {
      const grammaIndetermination = new Gramma(gramaStringIndetermination);
      expect(grammaIndetermination.verifyHasIndetermination()).toBe(true);
    } catch (error) {
      console.log(error);
    }
  });

  it("Verify if gramma not has indetermination", () => {
    try {
      const gramma = new Gramma(grammaString);
      expect(gramma.verifyHasIndetermination()).toBe(false);
    } catch (error) {
      console.log(error);
    }
  });

  it.only("Verify if rightSide non terminals exists", () => {
    try {
      const gramma = new Gramma(gramaStringIndetermination);
      expect(gramma.verifyNotHasNonTerminals()).toBe(true);
    } catch (error) {
      console.log(error);
    }
  });
});
