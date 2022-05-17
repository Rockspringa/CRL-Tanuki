import {
  addError,
  compileTools,
  ControlStatement,
  executeStatements,
  Expression,
  RepresentTree,
  Statement,
} from "../AbstractTree";
import { Declare } from "./Declare";
import { CrlBool, CrlInt, CrlType } from "../../types/CrlType";
import { Symbol } from "../../containers/symbols-table";

export class For implements ControlStatement {
  _executions: number = 0;

  readonly _declaration: Declare;
  readonly _condition: Expression;
  readonly _increment: boolean;
  readonly _body: Statement[];
  readonly rep: RepresentTree;

  _break?: boolean;
  _return?: CrlType;
  __return?: boolean;
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
    this._body = body.filter((stmt) => stmt);

    this.rep = {
      type: "ControlStatement",
      represent: "Para",
      children: [
        this._declaration.rep,
        { type: "Condition", represent: "Expresion" },
        {
          type: "Increment",
          represent: increment ? "Incremento" : "Decremento",
        },
        {
          type: "Body",
          represent: "Cuerpo",
          children: this._body.map((stmt) => stmt.rep),
        },
      ],
    };
  }

  execute(): void {
    compileTools.scopeStack.push("SubAmbito_Para");
    this._declaration.execute();

    let _var: Symbol;
    try {
      _var = compileTools.symbolsTable.getSymbol(
        this._declaration._names[0],
        compileTools.scopeStack.length
      );
    } catch (e: any) {
      addError(this._declaration, e.message);
      compileTools.scopeStack.pop();
      return;
    }

    this._condition.execute();
    if (!this._condition._value) {
      compileTools.symbolsTable.removeScope(compileTools.scopeStack.length);
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

        _var.data = new CrlInt(
          (_var.data as CrlInt).value + (this._increment ? 1 : -2)
        );

        this._condition.execute();
        this._executions++;

        if (this._executions > 5000) {
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
