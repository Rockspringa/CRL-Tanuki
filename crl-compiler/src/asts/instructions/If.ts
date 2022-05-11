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

export class If implements ControlStatement {
  readonly _condition: Expression;
  readonly _body: Statement[];
  readonly _elseBody?: Statement[];
  readonly rep: RepresentTree;

  _break?: boolean;
  _return?: CrlType;
  __return?: boolean;
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
    scopeStack.push("SubAmbito_Si");
    this._condition.execute();

    if (this._condition._value) {
      try {
        const condition = this._condition._value.castTo(0) as CrlBool;
        if (condition.value) {
          executeStatements(this._body, this);
        } else if (this._elseBody) {
          scopeStack.pop();
          scopeStack.push("SubAmbito_Sino");
          executeStatements(this._elseBody, this);
        }
        compileInfo.symbolsTable.removeScope(scopeStack.length);
      } catch (e: any) {
        addError(this._condition, e.message);
      }
    }
    scopeStack.pop();
  }
}
