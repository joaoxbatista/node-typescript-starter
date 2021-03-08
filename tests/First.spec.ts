import { Gramma } from "../src/Gramma";
import { FirstSet } from "../src/FirstSet";
const grammaString = `
  S->BA
  A->c|bB| 
  B->a|cAa
`;
const gramma = new Gramma(grammaString);
const firstSet = new FirstSet(gramma);

describe("Test of First class", () => {
  const first = firstSet.getArray();
  console.log(first);
  it("Get first set", () => {
    expect(first).toStrictEqual([
      {
        nonTerminal: "S",
        first: ["a", "c"],
      },
      {
        nonTerminal: "A",
        first: ["c", "b", "ε"],
      },
      {
        nonTerminal: "B",
        first: ["a", "c"],
      },
    ]);
  });
});
