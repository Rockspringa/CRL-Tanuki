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
  symbols: Symbol[] = [];
  subSymbolsTable: Symbol[][] = [];

  getSymbol(name: string, scope: number): Symbol {
    let sym = this.symbols.find(
      (symbol: Symbol) => symbol.name === name && scope === scope
    );

    if (sym) {
      return sym;
    } else {
      sym = this.symbols.find(
        (symbol: Symbol) => symbol.name === name && scope < scope
      );
      if (sym) {
        return sym;
      } else {
        throw new Error(`No existe la variable ${name}.`);
      }
    }
  }

  addSymbol(data: Symbol): void {
    this.symbols.push(data);

    const length = this.subSymbolsTable.length;

    if (length > 0) {
      this.subSymbolsTable[length].push(data);
    }
  }

  getScopeAndSubScopes(): Symbol[] {
    this.subSymbolsTable.push([]);
    return this.subSymbolsTable[length - 1];
  }

  removeScope(scope: number): void {
    this.subSymbolsTable.pop();
    this.symbols.filter((symbol: Symbol) => symbol.scope !== scope);
  }
}
