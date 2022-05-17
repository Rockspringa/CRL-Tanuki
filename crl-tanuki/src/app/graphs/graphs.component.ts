import { Component, OnInit } from "@angular/core";
import {
  ExpressionTree,
  FunctionTree,
  Graph,
  ScopeSymbolsTable,
} from "@crl-rocks/crl-compiler";
import { GraphsService } from "../services/graphs.service";
import { RedirectBtnModel } from "../../model/redirect-btn.model";
import html2canvas from "html2canvas";

@Component({
  selector: "app-graphs",
  templateUrl: "./graphs.component.html",
  styleUrls: ["./graphs.component.css"],
})
export class GraphsComponent implements OnInit {
  readonly refs: RedirectBtnModel[] = [
    { icon: "  Codigo ", url: "/code-editor" },
    { icon: "  Consola ", url: "/console" },
  ];

  graphs: Graph[] = [];

  filename: string = "";

  constructor(private graphsService: GraphsService) {}

  ngOnInit(): void {
    this.graphs = this.graphsService.getGraphs();
  }

  getType(graph: Graph): number {
    if ("functions" in graph) {
      return 0;
    } else if ("expression" in graph) {
      return 1;
    } else {
      return 2;
    }
  }

  getFunctionTree(graph: Graph): FunctionTree {
    return graph as FunctionTree;
  }

  getExpressionTree(graph: Graph): ExpressionTree {
    return graph as ExpressionTree;
  }

  getScopeSymbolsTable(graph: Graph): ScopeSymbolsTable {
    return graph as ScopeSymbolsTable;
  }

  getExpressionId(index: number): string {
    return `expression-${index}`;
  }

  async takePicture(id: string) {
    const element = document.getElementById(id);
    this.filename = id + ".png";
    if (!element) return;

    try {
      const canvas = await html2canvas(element);
      const downloader = document.getElementById("downloader");

      downloader?.setAttribute("href", canvas.toDataURL("image/png"));
      downloader?.click();
    } catch (e: any) {
      alert(
        "Ocurrio un error mientras se preparaba su imagen, por favor, intentelo nuevamente."
      );
    }
  }
}
