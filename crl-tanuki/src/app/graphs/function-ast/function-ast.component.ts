import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { RepresentTree } from "@crl-rocks/crl-compiler";
import { getTreantLikeData } from "../../../model/tools.function";

declare var Treant: any;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "app-function-ast",
  templateUrl: "./function-ast.component.html",
  styleUrls: ["./function-ast.component.css"],
})
export class FunctionAstComponent implements OnInit {
  @Input() id!: string;
  @Input() functionInfo!: RepresentTree;

  tree: any;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.tree = getTreantLikeData(this.functionInfo, `#${this.id}`, 0);
    (() => {
      Treant(this.tree);
    })();
  }
}
