import { Gramma } from "../src/Gramma";
import { PreditiveTable } from "../src/PreditiveTable";

const grammaString = [
  //   `A->aB
  // B->cC|baB|
  // C->cD
  // D->  `,
  `A->CBb|c|d
B->f| 
C-> `,
];

const tableSpect = [
  // {
  //   A: {
  //     a: "A->aB",
  //     b: "",
  //     c: "",
  //     $: "",
  //   },
  //   B: {
  //     a: "",
  //     b: "B->baB",
  //     c: "B->cC",
  //     $: "B->ε",
  //   },
  //   C: {
  //     a: "",
  //     b: "",
  //     c: "C->cD",
  //     $: "",
  //   },
  //   D: {
  //     a: "",
  //     b: "",
  //     c: "",
  //     $: "D->ε",
  //   },
  // },

  {
    A: {
      b: "A->CBb",
      c: "A->c",
      d: "A->d",
      f: "A->CBb",
      $: "",
    },

    B: {
      b: "B->ε",
      c: "",
      d: "",
      f: "B->ε",
      $: "",
    },

    C: {
      b: "C->ε",
      c: "",
      d: "",
      f: "C->ε",
      $: "",
    },
  },
];

describe("Preditive Table", () => {
  it("Generate table", () => {
    grammaString.forEach((grammaString, index) => {
      const gramma = new Gramma(grammaString);
      const preditiveTable = new PreditiveTable(gramma);
      expect(preditiveTable.generate()).toStrictEqual(tableSpect[index]);
    });
  });
});
