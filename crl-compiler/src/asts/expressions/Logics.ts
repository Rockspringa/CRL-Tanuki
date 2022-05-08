import { Expression, RepresentTree } from "../AbstractTree";
import { errorsTable } from "../../crl-globals";
import { CrlBool, CrlType } from "../../types";

enum LogicOperator {
  AND,
  OR,
  XOR,
  NOT,
}

export class Logics implements Expression {
  readonly _column: number;
  readonly _line: number;
  readonly _val1: Expression;
  readonly _val2: Expression;
  readonly _operator: LogicOperator;

  _value?: CrlType;
  rep: RepresentTree;

  constructor(
    val1: Expression,
    val2: Expression,
    operator: LogicOperator,
    column: number,
    line: number
  ) {
    this._column = column;
    this._operator = operator;
    this._line = line;
    this._val1 = val1;
    this._val2 = val2;

    this.rep = {
      type: "Logica",
      represent: "",
      children: [],
    };
  }

  execute(): void {
    this._val1.execute();
    this._val2.execute();

    if (!(this._val1._value && this._val2._value)) return;
    if (!(this._val1._value instanceof CrlBool)) {
      return errorsTable.addError({
        message:
          "Se esperaba una expresion booleana a la izquiera del operador logico.",
        column: this._column,
        line: this._line,
        type: 2,
      });
    } else if (!(this._val2._value instanceof CrlBool)) {
      return errorsTable.addError({
        message:
          "Se esperaba una expresion booleana a la derecha del operador logico.",
        column: this._column,
        line: this._line,
        type: 2,
      });
    }

    const val1: CrlBool = this._val1._value;
    const val2: CrlBool = this._val2._value;
    this.rep.children = [this._val1.rep, this._val2.rep];

    switch (this._operator) {
      case 0: // AND
        this._value = new CrlBool(val1.value && val2.value);
        this.rep.represent = "&&";
        break;

      case 1: // OR
        this._value = new CrlBool(val1.value || val2.value);
        this.rep.represent = "||";
        break;

      case 2: // XOR
        this._value = new CrlBool(+(val1.value != val2.value));
        this.rep.represent = "|&";
        break;

      case 3: // NOT
        this._value = new CrlBool(+(val1.value === val2.value));
        this.rep.represent = "!";
        this.rep.children = [this._val1.rep];
        break;
    }
  }
}
