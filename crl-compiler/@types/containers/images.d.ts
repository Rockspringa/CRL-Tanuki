import { Symbol } from "./symbols-table";
import { RepresentTree } from "../asts/AbstractTree";
export interface Graph {
}
export interface FunctionTree extends Graph {
    functions: RepresentTree[];
    functionName: string;
}
export interface ExpressionTree extends Graph {
    expression: RepresentTree;
}
export interface ScopeSymbolsTable extends Graph {
    symbols: Symbol[];
    scopeName: string;
}
export declare class InfoGraphics {
    private graphs;
    getGraphs(): Graph[];
    addGraph(data: FunctionTree | ExpressionTree | ScopeSymbolsTable): void;
}
//# sourceMappingURL=images.d.ts.map