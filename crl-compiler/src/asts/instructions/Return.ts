import { Expression, RepresentTree, Statement } from "../AbstractTree";
import { CrlType } from "../../types";

export class Return implements Statement {
  readonly _value?: Expression;
  readonly rep: RepresentTree;

  _return?: CrlType;

  constructor(value?: Expression) {
    this._value = value;

    this.rep = {
      type: "Statement",
      represent: "Retorno",
    };
    if (value) {
      this.rep.children = [{ type: "Statement", represent: "Expression" }];
    }
  }

  execute(): void {
    this._value?.execute();

    if (!this._value?._value) return;
    this._return = this._value._value;
  }
}
