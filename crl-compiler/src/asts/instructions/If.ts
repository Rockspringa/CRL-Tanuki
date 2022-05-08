import {
  addError,
  ControlStatement,
  executeStatements,
  Expression,
  RepresentTree,
  Statement,
} from "../AbstractTree";
import { CrlBool, CrlType } from "../../types";

export class If implements ControlStatement {
  readonly _condition: Expression;
  readonly _body: Statement[];
  readonly _elseBody?: Statement[];
  readonly rep: RepresentTree;

  _return?: CrlType;
  _break?: boolean;
  _continue?: boolean;

  constructor(
    condition: Expression,
    body: Statement[],
    elseBody?: Statement[]
  ) {
    this._condition = condition;
    this._body = body;
    this._elseBody = elseBody;

    this.rep = {
      type: "ControlStatement",
      represent: "Si",
      children: [
        { type: "Condition", represent: "Expresion" },
        {
          type: "Body",
          represent: "Cuerpo",
          children: body.map((instruct) => instruct.rep),
        },
      ],
    };
    if (elseBody) {
      this.rep.children?.push({
        type: "Statement",
        represent: "Sino",
        children: [
          {
            type: "Body",
            represent: "Cuerpo",
            children: elseBody.map((instruct) => instruct.rep),
          },
        ],
      });
    }
  }

  execute(): void {
    this._condition.execute();

    if (this._condition._value) {
      try {
        const condition: CrlBool = this._condition._value.castTo(0) as CrlBool;
        if (condition.value) {
          executeStatements(this._body, this);
        } else if (this._elseBody) {
          executeStatements(this._elseBody, this);
        }
      } catch (e: any) {
        return addError(this._condition, e.message);
      }
    }
  }
}
