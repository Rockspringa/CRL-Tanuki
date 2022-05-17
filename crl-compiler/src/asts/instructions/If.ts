import {
  addError, compileTools,
  ControlStatement,
  executeStatements,
  Expression,
  RepresentTree,
  Statement,
} from "../AbstractTree";
import { CrlType } from "../../types/CrlType";
import { CrlBool } from "../../types/CrlType";

export class If implements ControlStatement {
  _executions: number = 0;

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
    this._body = body.filter(stmt => stmt);
    this._elseBody = elseBody?.filter(stmt => stmt);

    this.rep = {
      type: "ControlStatement",
      represent: "Si",
      children: [
        { type: "Condition", represent: "Expresion" },
        {
          type: "Body",
          represent: "Cuerpo",
          children: this._body.map((instruct) => instruct.rep),
        },
      ],
    };
    if (this._elseBody) {
      this.rep.children?.push({
        type: "Statement",
        represent: "Sino",
        children: [
          {
            type: "Body",
            represent: "Cuerpo",
            children: this._elseBody.map((instruct) => instruct.rep),
          },
        ],
      });
    }
  }

  execute(): void {
    compileTools.scopeStack.push("SubAmbito_Si");
    this._condition.execute();

    if (this._condition._value) {
      try {
        const condition = this._condition._value.castTo(0) as CrlBool;
        if (condition.value) {
          executeStatements(this._body, this);
        } else if (this._elseBody) {
          compileTools.scopeStack.pop();
          compileTools.scopeStack.push("SubAmbito_Sino");
          executeStatements(this._elseBody, this);
        }
        compileTools.symbolsTable.removeScope(compileTools.scopeStack.length);
      } catch (e: any) {
        addError(this._condition, e.message);
      }
    }
    compileTools.scopeStack.pop();
  }
}
