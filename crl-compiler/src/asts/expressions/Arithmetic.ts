import { RepresentTree, Expression } from "../AbstractTree";
import { errors } from "../../parser/crl-parser";

enum Operator {
  PLUS,
  MINUS,
  TIMES,
  DIVISION,
  MODULUS,
  RAISED_TO,
}

export class Arithmetic implements Expression {
  private readonly _scope: number;
  private readonly _column: number;
  private readonly _line: number;
  private readonly _num1: CrlType | Expression;
  private readonly _num2: CrlType | Expression;
  private readonly _operator: Operator;

  _value?: CrlType;
  rep: RepresentTree;

  constructor(
    num1: CrlType | Expression,
    num2: CrlType | Expression,
    operator: Operator,
    column: number,
    line: number,
    scope: number
  ) {
    this._column = column;
    this._scope = scope;
    this._operator = operator;
    this._line = line;
    this._num1 = num1;
    this._num2 = num2;

    this.rep = {
      type: "Aritmetica",
      represent: "",
      children: [],
    };
  }

  execute(): void {
    let num1: CrlType;
    let num2: CrlType;

    if (this._num1.plus) {
      this._num1.execute();
    }
    switch (operator) {
      case 0: // PLUS
        break;

      case 1: // MINUS
        break;

      case 2: // TIMES
        break;

      case 3: // DIVISION
        break;

      case 4: // MODULUS
        break;

      case 5: // RAISED_TO
        break;
    }
  }
}
