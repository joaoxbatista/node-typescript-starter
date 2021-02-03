import { Gramma } from "../src/Gramma";
import { FirstSet } from "../src/FirstSet";
const grammaString = `
A->aB
B->cC|baB| 
C->cD
D-> 
`;
const gramma = new Gramma(grammaString);
const firstSet = new FirstSet(gramma);

describe("Test of First class", () => {
  it("Get first set", () => {
    expect(firstSet.getArray()).toContain(["a", "c", "b", "c", "ε"]);
  });
});
