import {
  addError,
  ControlStatement,
  executeStatements,
  Expression,
  RepresentTree,
  Statement,
} from "../AbstractTree";
import { Declare } from "./Declare";
import { symbolsTable } from "../../crl-globals";
import { Symbol } from "../../containers";
import { CrlBool, CrlInt, CrlType } from "../../types";

export class For implements ControlStatement {
  readonly _declaration: Declare;
  readonly _condition: Expression;
  readonly _increment: boolean;
  readonly _body: Statement[];
  readonly rep: RepresentTree;

  _return?: CrlType;
  _break?: boolean;
  _continue?: boolean;

  constructor(
    declaration: Declare,
    condition: Expression,
    increment: boolean,
    body: Statement[]
  ) {
    this._declaration = declaration;
    this._condition = condition;
    this._increment = increment;
    this._body = body;

    this.rep = {
      type: "ControlStatement",
      represent: "Para",
      children: [
        this._declaration.rep,
        { type: "Condition", represent: "Expresion" },
        { type: "Increment", represent: increment ? "++" : "--" },
        {
          type: "Body",
          represent: "Cuerpo",
          children: body.map((stmt) => stmt.rep),
        },
      ],
    };
  }

  execute(): void {
    this._declaration.execute();

    let _var: Symbol;
    try {
      _var = symbolsTable.getSymbol(
        this._declaration._names[0],
        this._declaration._scope
      );
    } catch (e: any) {
      return addError(this._declaration, e.message);
    }

    this._condition.execute();
    if (!this._condition._value) return;

    try {
      while (
        (this._condition._value.castTo(0) as CrlBool).value &&
        !this._break
      ) {
        executeStatements(this._body, this);
        this._condition.execute();

        _var.data = new CrlInt(
          (_var.data as CrlInt).value + (this._increment ? 1 : -2)
        );
      }
      this._break = undefined;
      this._continue = undefined;
    } catch (e: any) {
      return addError(this._condition, e.message);
    }
  }
}
