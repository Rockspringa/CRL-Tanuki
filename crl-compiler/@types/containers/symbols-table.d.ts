import { CrlType, Type } from "../types/CrlType";
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
export declare class SymbolsTable {
    private symbols;
    private subSymbolsTable;
    getSymbol(name: string, scope: number): Symbol;
    addSymbol(data: Symbol): void;
    getScope(scope: number): Symbol[];
    removeScope(scope: number): void;
}
//# sourceMappingURL=symbols-table.d.ts.map