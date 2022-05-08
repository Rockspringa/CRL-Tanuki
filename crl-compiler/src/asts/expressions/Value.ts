import { capitalize, Expression, RepresentTree } from "../AbstractTree";
import { CrlBool, CrlType, Type } from "../../types";

export class Value implements Expression {
  readonly _column: number;
  readonly _line: number;
  readonly rep: RepresentTree;

  _value: CrlType;

  constructor(value: CrlType, type: Type, column: number, line: number) {
    this._column = column;
    this._value = value;
    this._line = line;

    this.rep = {
      type: capitalize(Type[type]),
      represent:
        value instanceof CrlBool
          ? value.value
            ? "true"
            : "false"
          : value.toString(),
    };
  }

  execute(): void {}
}
