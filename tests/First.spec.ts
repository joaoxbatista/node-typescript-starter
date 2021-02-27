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
        nonTerminal: "A",
        first: ["a"],
      },
      {
        nonTerminal: "B",
        first: ["c", "b", "ε"],
      },
      {
        nonTerminal: "C",
        first: ["c"],
      },
      {
        nonTerminal: "D",
        first: ["ε"],
      },
    ]);
  });
});
