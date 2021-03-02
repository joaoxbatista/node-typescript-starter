import { Gramma } from "../src/Gramma";
import { FirstSet } from "../src/FirstSet";
const grammaString = `
  A->aB
  B->Cc|baB
  C-> |cD
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
        first: ["ε", "c", "b"],
      },
      {
        nonTerminal: "C",
        first: ["ε", "c"],
      },
      {
        nonTerminal: "D",
        first: ["ε"],
      },
    ]);
  });
});
