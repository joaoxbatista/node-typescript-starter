import { SymbolsVerifier } from "../src/SymbolsVerifier";

const symbolVerifier = new SymbolsVerifier();
const lowerCaseLetters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const upperCaseLetters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const grammar = `
    A -> aB
    B -> cC | baB
    C -> c
`;

describe("Verificação dos simbolos da gramática: ", () => {
  it("É terminal", () => {
    lowerCaseLetters.forEach((letter) => {
      expect(symbolVerifier.isTerminal(letter)).toBeTruthy();
    });
  });

  it("Não é terminal", () => {
    upperCaseLetters.forEach((letter) => {
      expect(symbolVerifier.isNonTerminal(letter)).toBeTruthy();
    });
  });

  it("Contém terminais", () => {
    expect(symbolVerifier.containsNonTerminal(grammar)).toBeTruthy();
  });

  it("Contém variaveis", () => {
    expect(symbolVerifier.containsTerminal(grammar)).toBeTruthy();
  });
});
