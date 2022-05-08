import {
  addError,
  ExecutableStatement,
  Expression,
  RepresentTree,
} from "../AbstractTree";
import { symbolsTable } from "../../crl-globals";

export class Assign implements ExecutableStatement {
  readonly _scope: number;
  readonly _column: number;
  readonly _line: number;

  readonly _name: string;
  readonly _value: Expression;

  readonly rep: RepresentTree = {
    type: "Statement",
    represent: "Asignacion",
    children: [
      { type: "ID", represent: "ID" },
      { type: "Statement", represent: "Expression" },
    ],
  };

  constructor(
    name: string,
    value: Expression,
    scope: number,
    column: number,
    line: number
  ) {
    this._name = name;
    this._value = value;
    this._scope = scope;
    this._column = column;
    this._line = line;
  }

  execute(): void {
    this._value.execute();

    if (!this._value._value) return;

    try {
      const _symbol = symbolsTable.getSymbol(this._name, this._scope);
      _symbol.data = this._value._value.castTo(_symbol.data.type);
    } catch (e: any) {
      addError(this._value, e.message);
    }
  }
}
