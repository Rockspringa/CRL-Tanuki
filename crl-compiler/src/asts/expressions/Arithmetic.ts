import { Expression, RepresentTree } from "../AbstractTree";
import { compileInfo } from "../../crl-globals";
import { CrlType } from "../../types";

enum ArithmeticOperator {
  PLUS,
  MINUS,
  TIMES,
  DIVIDED,
  MODULUS,
  RAISED_TO,
}

export class Arithmetic implements Expression {
  readonly _column: number;
  readonly _line: number;
  readonly _val1: Expression;
  readonly _val2: Expression;
  readonly _operator: ArithmeticOperator;

  _value?: CrlType;
  rep: RepresentTree;

  constructor(
    num1: Expression,
    num2: Expression,
    operator: ArithmeticOperator,
    column: number,
    line: number
  ) {
    this._column = column;
    this._operator = operator;
    this._line = line;
    this._val1 = num1;
    this._val2 = num2;

    this.rep = {
      type: "Aritmetica",
      represent: this.getSymbol(),
      children: [num1.rep, num2.rep],
    };
  }

  execute(): void {
    this._val1.execute();
    this._val2.execute();

    if (!(this._val1._value && this._val2._value)) return;

    const num1: CrlType = this._val1._value;
    const num2: CrlType = this._val2._value;

    try {
      switch (this._operator) {
        case 0: // PLUS
          this._value = num1.plus(num2);
          this.rep.represent = "+";
          break;

        case 1: // MINUS
          this._value = num1.minus(num2);
          this.rep.represent = "-";
          break;

        case 2: // TIMES
          this._value = num1.times(num2);
          this.rep.represent = "*";
          break;

        case 3: // DIVIDED
          this._value = num1.divided(num2);
          this.rep.represent = "/";
          break;

        case 4: // MODULUS
          this._value = num1.modulus(num2);
          this.rep.represent = "%";
          break;

        case 5: // RAISED_TO
          this._value = num1.raisedTo(num2);
          this.rep.represent = "^";
          break;
      }
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

  private getSymbol() {
    switch (this._operator) {
      case 0: // PLUS
        return "+";

      case 1: // MINUS
        return "-";

      case 2: // TIMES
        return "*";

      case 3: // DIVIDED
        return "/";

      case 4: // MODULUS
        return "%";

      case 5: // RAISED_TO
        return "^";

      default:
        return " ";
    }
  }
}
