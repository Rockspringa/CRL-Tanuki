export interface Graph {}

export interface FunctionTree extends Graph {
  tree: {};
}

export interface ExpresionTree extends Graph {
  tree: {};
}

export interface ScopeSymbolsTable extends Graph {
  symbols: Symbol[];
}

export class InfoGraphics {
  graphs: Graph[] = [];

  getGraphs(): Graph[] {
    return this.graphs.map((graph: Graph) => Object.assign({}, graph));
  }

  addGraph(data: Graph) {
    this.graphs.push(data);
  }
}
