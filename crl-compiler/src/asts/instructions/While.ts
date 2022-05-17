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

export class While implements ControlStatement {
  _executions: number = 0;

  readonly _condition: Expression;
  readonly _body: Statement[];
  readonly rep: RepresentTree;

  _break?: boolean;
  _return?: CrlType;
  __return?: boolean;
  _continue?: boolean;

  constructor(condition: Expression, body: Statement[]) {
    this._condition = condition;
    this._body = body.filter(stmt => stmt);

    this.rep = {
      type: "ControlStatement",
      represent: "Mientras",
      children: [
        { type: "Condition", represent: "Expresion" },
        {
          type: "Body",
          represent: "Cuerpo",
          children: this._body.map((stmt) => stmt.rep),
        },
      ],
    };
  }

  execute(): void {
    compileTools.scopeStack.push("SubAmbito_Mientras");
    this._condition.execute();
    if (!this._condition._value) {
      compileTools.scopeStack.pop();
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
        this._executions++;

        if (this._executions > 1000) {
          addError(
            this._condition,
            "Limite de ejecuciones alcanzado, asegurese el ciclo se pueda romper."
          );
          break;
        }
      }
    } catch (e: any) {
      addError(this._condition, e.message);
    }
    this._break = undefined;
    this._continue = undefined;
    compileTools.symbolsTable.removeScope(compileTools.scopeStack.length);
    compileTools.scopeStack.pop();
  }
}
