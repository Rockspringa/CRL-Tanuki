import {
  addError,
  ControlStatement,
  executeStatements,
  Expression,
  RepresentTree,
  Statement,
} from "../AbstractTree";
import { CrlBool, CrlType } from "../../types";
import {compileInfo, scopeStack} from "../../crl-compiler";

export class While implements ControlStatement {
  readonly _condition: Expression;
  readonly _body: Statement[];
  readonly rep: RepresentTree;

  _break?: boolean;
  _return?: CrlType;
  __return?: boolean;
  _continue?: boolean;

  constructor(condition: Expression, body: Statement[]) {
    this._condition = condition;
    this._body = body;

    this.rep = {
      type: "ControlStatement",
      represent: "Mientras",
      children: [
        { type: "Condition", represent: "Expresion" },
        {
          type: "Body",
          represent: "Cuerpo",
          children: body.map((stmt) => stmt.rep),
        },
      ],
    };
  }

  execute(): void {
    scopeStack.push("SubAmbito_Mientras");
    this._condition.execute();
    if (!this._condition._value) {
      scopeStack.pop();
      return;
    }

    try {
      while (
        (this._condition._value.castTo(0) as CrlBool).value &&
        !this._break &&
        !this._return
      ) {
        executeStatements(this._body, this);
        this._condition.execute();
      }
      this._break = undefined;
      this._continue = undefined;
    } catch (e: any) {
      addError(this._condition, e.message);
    }
    compileInfo.symbolsTable.removeScope(scopeStack.length);
    scopeStack.pop();
  }
}
