import { Expression, RepresentTree } from "../AbstractTree";
import {compileInfo, scopeStack} from "../../crl-globals";
import { CrlType } from "../../types";

export class Reference implements Expression {
  readonly _name: string;
  readonly _column: number;
  readonly _line: number;
  readonly rep: RepresentTree;

  _value?: CrlType;

  constructor(name: string, column: number, line: number) {
    this._column = column;
    this._name = name;
    this._line = line;

    this.rep = {
      type: "Variable",
      represent: name,
    };
  }

  execute(): void {
    try {
      this._value = compileInfo.symbolsTable.getSymbol(
        this._name,
        scopeStack.length
      ).data;
    } catch (e: any) {
      if (e instanceof Error) {
        compileInfo.errorsTable.addError({
          message: e.message,
          column: this._column,
          line: this._line,
          type: 2,
        });
      }
    }
  }
}
