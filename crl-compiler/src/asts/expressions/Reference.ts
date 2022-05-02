import { Expression, RepresentTree } from "../AbstractTree";
import { symbolsTable, errors } from "../../parser/crl-parser";

export class Reference implements Expression {
  private readonly _name: string;
  private readonly _scope: number;
  private readonly _column: number;
  private readonly _line: number;

  _value: CrlType | undefined;
  rep: RepresentTree;

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
        errors.addError({
          message: e.message,
          column: this._column,
          line: this._line,
          type: 2,
        });
      }
    }
  }
}
