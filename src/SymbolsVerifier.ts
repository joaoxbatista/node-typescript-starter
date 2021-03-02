export class SymbolsVerifier {
  /**
   * isNonTerminal
   * Verifica se começa e termina com uma letra maiúscula
   * @param symbol
   */
  public isNonTerminal(symbol: string): boolean {
    return /^[A-Z]$/.test(symbol);
  }

  /**
   * isTerminal
   * Verifica se não começa e não termina com uma letra maiúscula
   * @param symbol
   */
  public isTerminal(symbol: string): boolean {
    return !this.isNonTerminal(symbol);
  }

  /**
   * containsNonTerminal
   * Verifica se contém uma letras maiúscula
   * @param symbol
   */
  public containsNonTerminal(symbols: string): boolean {
    return /[A-Z]/gm.test(symbols);
  }

  /**
   * containsTerminal
   * Verifica se não contém letras maiúscula
   * @param symbol
   */
  public containsTerminal(symbols: string): boolean {
    return /[^A-Z]/gm.test(symbols);
  }
}
