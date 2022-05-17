import {
  addError, compileTools,
  ExecutableStatement,
  Expression,
  RepresentTree,
} from "../AbstractTree";
import { CrlType, Type } from "../../types/CrlType";
import { CrlDouble } from "../../types/CrlType";
import { CrlString } from "../../types/CrlType";
import { CrlChar } from "../../types/CrlType";
import { CrlBool } from "../../types/CrlType";
import { CrlInt } from "../../types/CrlType";

export class Declare implements ExecutableStatement {
  readonly _column: number;
  readonly _line: number;

  readonly _type: Type;
  readonly _names: string[];
  readonly _value?: Expression;

  readonly rep: RepresentTree;

  constructor(
    _var: {
      type: Type;
      names: string[];
      value?: Expression;
    },
    column: number,
    line: number
  ) {
    this._type = _var.type;
    this._names = _var.names;
    this._value = _var.value;
    this._column = column;
    this._line = line;

    this.rep = {
      type: "Statement",
      represent: "Declaracion",
      children: [
        {
          type: "IDs",
          represent: "Lista IDs",
          children: _var.names.map(() => ({ type: "ID", represent: "ID" })),
        },
      ],
    };
    if (_var.value)
      this.rep.children?.push({ type: "Statement", represent: "Expression" });
  }

  execute(): void {
    this._value?.execute();

    if (this._value && !this._value._value) {
      return;
    }
    const _val = this._value?._value || this.getDefaultValue();
    let data: CrlType;
    try {
      data = _val.castTo(this._type);
    } catch (e: any) {
      if (this._value) addError(this._value, e.message);
      return;
    }
    for (const name of this._names) {
      try {
        compileTools.symbolsTable.addSymbol({
          scopeName: compileTools.getScopeName(),
          column: this._column,
          scope: compileTools.scopeStack.length,
          line: this._line,
          data,
          name,
        });
      } catch (e: any) {
        addError(this, e.message);
      }
    }
  }

  private getDefaultValue() {
    switch (this._type) {
      case 0:
        return new CrlBool(0);

      case 1:
        return new CrlChar(String.fromCharCode(0));

      case 2:
        return new CrlInt(0);

      case 3:
        return new CrlDouble(0);

      default:
        return new CrlString("");
    }
  }
}
