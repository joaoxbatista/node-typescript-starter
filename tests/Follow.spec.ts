import { Gramma } from "../src/Gramma";
import { FollowSet } from "../src/FollowSet";

const grammaString = `
  S->BA
  A->c|bB| 
  B->a|cAa
`;
const gramma = new Gramma(grammaString);
const followSet = new FollowSet(gramma);

describe("Test of Follow class", () => {
  it("Get follow set", () => {
    console.log(followSet.getArray());
    expect(followSet.getArray()).toStrictEqual([
      {
        nonTerminal: "S",
        follow: ["$"],
      },
      {
        nonTerminal: "B",
        follow: ["c", "b", "a"],
      },
      {
        nonTerminal: "A",
        follow: ["$", "a"],
      },
    ]);
  });
});
