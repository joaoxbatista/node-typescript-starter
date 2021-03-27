import { Gramma } from "../src/Gramma";
import { FirstSet } from "../src/FirstSet";
const grammaString = `
A->CBb|c|d
B->f| 
C-> 
`;
const gramma = new Gramma(grammaString);
const firstSet = new FirstSet(gramma);

describe("Test of First class", () => {
  const first = firstSet.getArray();
  console.log(first);
  it("Get first set", () => {
    expect(first).toStrictEqual([
      {
        nonTerminal: "A",
        first: ["f", "b", "c", "d"],
      },
      {
        nonTerminal: "B",
        first: ["f", "ε"],
      },
      {
        nonTerminal: "C",
        first: ["ε"],
      },
    ]);
  });
});
