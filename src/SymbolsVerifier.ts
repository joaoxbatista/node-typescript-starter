
export class SymbolsVerifier {
  public isNonTerminal(symbol: string): boolean {
    return /[A-Z]/.test(symbol)
  }
  public isTerminal(symbol: string): boolean {
    return /[^A-Z]/.test(symbol)
  }
}