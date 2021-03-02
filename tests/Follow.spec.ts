import { Gramma } from "../src/Gramma";
import { FirstSet } from "../src/FirstSet";
import { FollowSet } from "../src/FollowSet";

const grammaString = `
  S->AB
  A->c|Bb
  B->a|cAa
`;
const gramma = new Gramma(grammaString);
const followSet = new FollowSet(gramma);

describe("Test of Follow class", () => {
  it("Get follow set", () => {
    console.log(followSet.getArray());

    // expect(followSet.getArray()).toStrictEqual([
    //   {
    //     nonTerminal: "S",
    //     follow: ["$"],
    //   },
    //   {
    //     nonTerminal: "A",
    //     follow: ["c", "a"],
    //   },
    //   {
    //     nonTerminal: "B",
    //     follow: ["$", "b"],
    //   },
    // ]);
  });
});
