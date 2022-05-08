import { Expression, RepresentTree } from "../AbstractTree";
import { actualFile, errorsTable, symbolsTable } from "../../crl-globals";
import { CrlBool, CrlNumber, CrlType } from "../../types";

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
      represent: "",
      children: [],
    };
  }

  execute(): void {
    this._val1.execute();
    this._val2.execute();

    if (!(this._val1._value && this._val2._value)) return;
    if (this._val1._value.constructor !== this._val2._value.constructor) {
      return errorsTable.addError({
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
    this.rep.children = [this._val1.rep, this._val2.rep];

    switch (this._operator) {
      case 0: // EQUAL
        this._value = new CrlBool(+(val1 === val2));
        this.rep.represent = "==";
        break;

      case 1: // DIFFERENT
        this._value = new CrlBool(+(val1 !== val2));
        this.rep.represent = "!=";
        break;

      case 2: // LESS
        this._value = new CrlBool(+(val1 < val2));
        this.rep.represent = "<";
        break;

      case 3: // LESS_EQUAL
        this._value = new CrlBool(+(val1 <= val2));
        this.rep.represent = "<=";
        break;

      case 4: // GREATER
        this._value = new CrlBool(+(val1 > val2));
        this.rep.represent = ">";
        break;

      case 5: // GREATER_EQUAL
        this._value = new CrlBool(+(val1 >= val2));
        this.rep.represent = ">=";
        break;

      case 6: // UNCERTAINTY
        if (typeof val1 === "number" && typeof val2 === "number") {
          this._value = new CrlBool(
            +(
              Math.abs(val2 - val1) <=
              +symbolsTable.getSymbol(`__inc_${actualFile}`, 0).data.toString()
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
        this.rep.represent = "~";
        break;
    }
  }
}
