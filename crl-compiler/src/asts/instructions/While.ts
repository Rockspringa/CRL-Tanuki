import {
  addError,
  ControlStatement,
  executeStatements,
  Expression,
  RepresentTree,
  Statement,
} from "../AbstractTree";
import { CrlBool, CrlType } from "../../types";

export class While implements ControlStatement {
  readonly _condition: Expression;
  readonly _body: Statement[];
  readonly rep: RepresentTree;

  _return?: CrlType;
  _break?: boolean;
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
    this._condition.execute();
    if (!this._condition._value) return;

    try {
      while (
        (this._condition._value.castTo(0) as CrlBool).value &&
        !this._break
      ) {
        executeStatements(this._body, this);
        this._condition.execute();
      }
      this._break = undefined;
      this._continue = undefined;
    } catch (e: any) {
      return addError(this._condition, e.message);
    }
  }
}
