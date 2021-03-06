import {
  addError, compileTools,
  ExecutableStatement,
  Expression,
  RepresentTree,
} from "../AbstractTree";

export class Assign implements ExecutableStatement {
  readonly _column: number;
  readonly _line: number;

  readonly _name: string;
  readonly _value: Expression;

  readonly rep: RepresentTree = {
    type: "Statement",
    represent: "Asignacion",
    children: [
      {type: "ID", represent: "ID"},
      {type: "Statement", represent: "Expression"},
    ],
  };

  constructor(name: string, value: Expression, column: number, line: number) {
    this._name = name;
    this._value = value;
    this._column = column;
    this._line = line;
  }

  execute(): void {
    this._value.execute();

    if (!this._value._value) return;

    try {
      const _symbol = compileTools.symbolsTable.getSymbol(
        this._name,
        compileTools.scopeStack.length
      );
      _symbol.data = this._value._value.castTo(_symbol.data.type);
    } catch (e: any) {
      addError(this._value, e.message);
    }
  }
}
