import { Expression, RepresentTree } from "../AbstractTree";
import { errorsTable, symbolsTable } from "../../crl-globals";
import { CrlType } from "../../types";

export class Reference implements Expression {
  readonly _name: string;
  readonly _scope: number;
  readonly _column: number;
  readonly _line: number;
  readonly rep: RepresentTree;

  _value?: CrlType;

  constructor(name: string, column: number, line: number, scope: number) {
    this._column = column;
    this._scope = scope;
    this._name = name;
    this._line = line;

    this.rep = {
      type: "Variable",
      represent: name,
    };
  }

  execute(): void {
    try {
      this._value = symbolsTable.getSymbol(this._name, this._scope).data;
    } catch (e: any) {
      if (e instanceof Error) {
        errorsTable.addError({
          message: e.message,
          column: this._column,
          line: this._line,
          type: 2,
        });
      }
    }
  }
}
