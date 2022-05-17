"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbolsTable = void 0;
class SymbolsTable {
    constructor() {
        this.symbols = [];
        this.subSymbolsTable = [];
    }
    getSymbol(name, scope) {
        let sym = this.symbols.find((symbol) => symbol.name === name && symbol.scope === scope);
        if (sym) {
            return sym;
        }
        else {
            let i = scope - 1;
            while (!sym && 0 <= i) {
                sym = this.symbols.find((symbol) => symbol.name === name && symbol.scope === i);
                i--;
            }
            if (sym) {
                return sym;
            }
            else {
                throw new Error(`Se esta usando la variable '${name}' antes de declararla.`);
            }
        }
    }
    addSymbol(data) {
        if (this.symbols.find(symbol => symbol.name === data.name && symbol.scope === data.scope)) {
            throw new Error(`La variable '${data.name}' ya se declaro anteriormente en el mismo ambito.`);
        }
        this.symbols.push(data);
        if (!data.scopeName)
            data.scopeName = "__global__";
        if (this.subSymbolsTable[data.scope]) {
            this.subSymbolsTable[data.scope].push(data);
        }
    }
    getScope(scope) {
        this.subSymbolsTable[scope] = this.symbols.filter((symbol) => symbol.scope === scope);
        return this.subSymbolsTable[scope];
    }
    removeScope(scope) {
        this.subSymbolsTable.splice(scope, 1);
        this.symbols = this.symbols.filter((symbol) => symbol.scope !== scope);
    }
}
exports.SymbolsTable = SymbolsTable;
//# sourceMappingURL=symbols-table.js.map