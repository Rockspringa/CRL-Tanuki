import { Symbol } from "./symbols-table";
import { RepresentTree } from "../asts/AbstractTree";

export interface Graph {}

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

export class InfoGraphics {
  private graphs: Graph[] = [];

  getGraphs(): Graph[] {
    return this.graphs.map((graph: Graph) => Object.assign({}, graph));
  }

  addGraph(data: FunctionTree | ExpressionTree | ScopeSymbolsTable) {
    this.graphs.push(data);
  }
}
