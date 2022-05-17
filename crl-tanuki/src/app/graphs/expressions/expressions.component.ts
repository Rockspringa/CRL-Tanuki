import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from "@angular/core";
import { ExpressionTree } from "@crl-rocks/crl-compiler";
import { getTreantLikeData } from "../../../model/tools.function";

declare var Treant: any;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "app-expressions",
  templateUrl: "./expressions.component.html",
  styleUrls: ["./expressions.component.css"],
})
export class ExpressionsComponent implements OnInit {
  @Input() id!: string;
  @Input() _id!: string;
  @Input() index!: number;
  @Input() expression!: ExpressionTree;
  @Output() downloadGraph = new EventEmitter<never>();

  tree: any;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.tree = getTreantLikeData(this.expression.expression, `#${this._id}`, 1);
    (() => {
      Treant(this.tree);
    })();
  }
}
