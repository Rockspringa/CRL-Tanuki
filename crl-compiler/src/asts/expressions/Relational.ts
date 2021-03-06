import { compileTools, Expression, RepresentTree } from "../AbstractTree";
import { CrlNumber, CrlType } from "../../types/CrlType";
import { CrlBool } from "../../types/CrlType";

enum RelationalOperator {
  EQUAL,
  DIFFERENT,
  LESS,
  LESS_EQUAL,
  GREATER,
  GREATER_EQUAL,
  UNCERTAINTY,
}

export class Relational implements Expression {
  readonly _column: number;
  readonly _line: number;
  readonly _val1: Expression;
  readonly _val2: Expression;
  readonly _operator: RelationalOperator;

  _value?: CrlType;
  rep: RepresentTree;

  constructor(
    val1: Expression,
    val2: Expression,
    operator: RelationalOperator,
    column: number,
    line: number
  ) {
    this._operator = operator;
    this._column = column;
    this._line = line;
    this._val1 = val1;
    this._val2 = val2;

    this.rep = {
      type: "Relacional",
      represent: this._getSymbol(),
      children: [val1.rep, val2.rep],
    };
  }

  execute(): void {
    this._val1.execute();
    this._val2.execute();

    if (!(this._val1._value && this._val2._value)) return;
    if (this._val1._value.constructor !== this._val2._value.constructor) {
      return compileTools.errorsTable.addError({
        message:
          "No se pueden comparar las expresiones porque son de diferente tipo.",
        column: this._column,
        line: this._line,
        type: 2,
      });
    }

    const val1: number | string =
      this._val1._value instanceof CrlNumber
        ? this._val1._value.value
        : this._val1._value.toString();
    const val2: number | string =
      this._val2._value instanceof CrlNumber
        ? this._val2._value.value
        : this._val2._value.toString();

    switch (this._operator) {
      case 0: // EQUAL
        this._value = new CrlBool(+(val1 === val2));
        break;

      case 1: // DIFFERENT
        this._value = new CrlBool(+(val1 !== val2));
        break;

      case 2: // LESS
        this._value = new CrlBool(+(val1 < val2));
        break;

      case 3: // LESS_EQUAL
        this._value = new CrlBool(+(val1 <= val2));
        break;

      case 4: // GREATER
        this._value = new CrlBool(+(val1 > val2));
        break;

      case 5: // GREATER_EQUAL
        this._value = new CrlBool(+(val1 >= val2));
        break;

      case 6: // UNCERTAINTY
        if (typeof val1 === "number" && typeof val2 === "number") {
          this._value = new CrlBool(
            +(
              Math.abs(val2 - val1) <=
              +compileTools.symbolsTable
                .getSymbol(`__inc_${compileTools.filename}`, 0)
                .data.toString()
            )
          );
        } else if (typeof val1 === "string" && typeof val2 === "string") {
          this._value = new CrlBool(
            +(
              val1.trim().localeCompare(val2.trim(), undefined, {
                sensitivity: "accent",
              }) === 0
            )
          );
        }
        break;
    }
  }

  private _getSymbol() {
    switch (this._operator) {
      case 0: // EQUAL
        return "==";

      case 1: // DIFFERENT
        return "!=";

      case 2: // LESS
        return "<";

      case 3: // LESS_EQUAL
        return "<=";

      case 4: // GREATER
        return ">";

      case 5: // GREATER_EQUAL
        return ">=";

      case 6: // UNCERTAINTY
        return "~";

      default:
        return " ";
    }
  }
}
