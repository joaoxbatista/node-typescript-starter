import { Gramma } from "../src/Gramma";
import { FollowSet } from "../src/FollowSet";

const grammaStrings = [
  `S->BA
  A->c|bB| 
  B->a|cAa`,

  `A->aB
  B->cC|baB| 
  C->cB
  D-> `,
];

const expectFollows = [
  [
    {
      nonTerminal: "S",
      follow: ["$"],
    },
    {
      nonTerminal: "A",
      follow: ["$", "a"],
    },
    {
      nonTerminal: "B",
      follow: ["c", "b", "$", "a"],
    },
  ],

  [
    {
      nonTerminal: "A",
      follow: ["$"],
    },
    {
      nonTerminal: "B",
      follow: ["$"],
    },
    {
      nonTerminal: "C",
      follow: ["$"],
    },
    {
      nonTerminal: "D",
      follow: [],
    },
  ],
];

describe("Test of Follow class", () => {
  it("Get follow set", () => {
    grammaStrings.forEach((grammaString, index) => {
      const gramma = new Gramma(grammaString);
      const followSet = new FollowSet(gramma);
      console.log(followSet.getArray());
      expect(followSet.getArray()).toStrictEqual(expectFollows[index]);
    });
  });
});
