import { Gramma } from "../src/Gramma";
import { PreditiveTable } from "../src/PreditiveTable";

const grammaString = `
    A->aB
    B->cC|baB| 
    C->cD
    D->  
`;
const gramma = new Gramma(grammaString);
const preditiveTable = new PreditiveTable(gramma);

const tableSpect = {
  A: {
    a: "",
    b: "",
    c: "",
  },
  B: {
    a: "",
    b: "",
    c: "",
  },
  C: {
    a: "",
    b: "",
    c: "",
  },
  D: {
    a: "",
    b: "",
    c: "",
  },
};
preditiveTable.generate();
preditiveTable.populate();

describe("Preditive Table", () => {
  it("Generate table", () => {
    expect(preditiveTable.generate()).toStrictEqual(tableSpect);
  });
});
