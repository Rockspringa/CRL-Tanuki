import { CrlType, Type } from "../types";

export interface Symbol {
  scopeName: string;
  column: number;
  scope: number;
  data: CrlType;
  name: string;
  line: number;
}

export interface Variable {
  name: string;
  type: Type;
}

export class SymbolsTable {
  private symbols: Symbol[] = [];
  private subSymbolsTable: Symbol[][] = [];

  getSymbol(name: string, scope: number): Symbol {
    let sym = this.symbols.find(
      (symbol: Symbol) => symbol.name === name && symbol.scope === scope
    );

    if (sym) {
      return sym;
    } else {
      let i = scope;
      while (!sym && 0 <= i) {
        sym = this.symbols.find(
          (symbol: Symbol) => symbol.name === name && symbol.scope === i
        );
      }
      if (sym) {
        return sym;
      } else {
        throw new Error(`No existe la variable ${name}.`);
      }
    }
  }

  addSymbol(data: Symbol): void {
    this.symbols.push(data);

    if (this.subSymbolsTable[data.scope]) {
      this.subSymbolsTable[data.scope].push(data);
    }
  }

  getScope(scope: number): Symbol[] {
    this.subSymbolsTable[scope] = this.symbols.filter(
      (symbol) => symbol.scope === scope
    );
    return this.subSymbolsTable[0];
  }

  removeScope(scope: number): void {
    this.subSymbolsTable.splice(scope, 1);
    this.symbols.filter((symbol: Symbol) => symbol.scope !== scope);
  }
}
