import { Gramma } from "../src/Gramma";
import { FollowSet } from "../src/FollowSet";

const grammaStrings = [
  // `S->BA
  // A->c|bB|
  // B->a|cAa`,

  // `A->aB
  // B->cC|baB|
  // C->cB
  // D-> `,

  `A->CBb|c|d
  B->f| 
  C-> `,
];

const expectFollows = [
  // [
  //   {
  //     nonTerminal: "S",
  //     follow: ["$"],
  //   },
  //   {
  //     nonTerminal: "A",
  //     follow: ["$", "a"],
  //   },
  //   {
  //     nonTerminal: "B",
  //     follow: ["c", "b", "$", "a"],
  //   },
  // ],

  // [
  //   {
  //     nonTerminal: "A",
  //     follow: ["$"],
  //   },
  //   {
  //     nonTerminal: "B",
  //     follow: ["$"],
  //   },
  //   {
  //     nonTerminal: "C",
  //     follow: ["$"],
  //   },
  //   {
  //     nonTerminal: "D",
  //     follow: [],
  //   },
  // ],

  [
    {
      nonTerminal: "A",
      follow: ["$"],
    },
    {
      nonTerminal: "B",
      follow: ["b"],
    },
    {
      nonTerminal: "C",
      follow: ["f", "b"],
    },
  ],
];

grammaStrings.forEach((grammaString, index) => {
  describe("Test of Follow class", () => {
    it("Get follow set", () => {
      const gramma = new Gramma(grammaString);
      const followSet = new FollowSet(gramma);
      console.log(`
      \n
      ==================
      Gramática: 
      ${grammaString}
      ==================
      \n
      `);
      console.log(followSet.getArray());
      expect(followSet.getArray()).toStrictEqual(expectFollows[index]);
    });
  });
});
