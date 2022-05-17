import { Injectable } from "@angular/core";
import { Graph } from "@crl-rocks/crl-compiler";

@Injectable({
  providedIn: "root",
})
export class GraphsService {
  private readonly graphs: Graph[] = [];

  constructor() {}

  postGraphs(graphs: Graph[]): void {
    this.graphs.length = 0;
    this.graphs.push(...graphs);
  }

  getGraphs(): Graph[] {
    return [...this.graphs];
  }
}
