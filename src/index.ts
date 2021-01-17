import { SymbolsVerifier } from './SymbolsVerifier';
const setence = `A: bB|cC
B: b|bC
C: c|
`;

const nonTerminal = `A`;
const terminal = `a`;

const symbolsVerifier = new SymbolsVerifier();

console.log(symbolsVerifier.isNonTerminal(nonTerminal));
console.log(symbolsVerifier.isNonTerminal(terminal));

console.log(symbolsVerifier.isTerminal(nonTerminal));
console.log(symbolsVerifier.isTerminal(terminal));