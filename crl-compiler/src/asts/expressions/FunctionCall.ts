import {
  addError,
  capitalize,
  ExecutableStatement,
  executeStatements,
  Expression,
  RepresentTree,
} from "../AbstractTree";
import {
  consoleOut,
  executeFunction,
  functionsTable,
  graphsOut,
  symbolsTable,
} from "../../crl-globals";
import { Variable } from "../../containers";
import { CrlType, Type } from "../../types";

export class FunctionCall implements Expression, ExecutableStatement {
  readonly _func: { name: string; params: Expression[] };
  readonly _scopeName: string;
  readonly _scope: number;
  readonly _column: number;
  readonly _line: number;
  readonly rep: RepresentTree;

  _return?: CrlType;
  _value?: CrlType;

  constructor(
    func: { name: string; params: Expression[] },
    column: number,
    line: number,
    scope: number,
    scopeName: string
  ) {
    this._scopeName = scopeName;
    this._column = column;
    this._scope = scope;
    this._func = func;
    this._line = line;

    this.rep = {
      type: "Funcion",
      represent: "Funcion",
    };
  }

  execute(): void {
    const values: CrlType[] = [];
    const vars: Variable[] = [];

    for (const _var of this._func.params) {
      _var.execute();

      if (!_var._value) return;
      vars.push({ name: `${vars.length}`, type: _var._value.type });
      values.push(_var._value);
    }

    const _func = functionsTable.getFunction(this._func.name, vars);
    const paramsJoined = vars
      .map((_var) => capitalize(Type[_var.type]))
      .join(", ");
    if (!_func || !_func.file) {
      return addError(
        this,
        `No se encontro la funcion ${this._func.name} con los parametros '${paramsJoined}'.`
      );
    }
    if (_func.name in ["Mostrar", "DibujarAST", "DibujarTS", "DibujarEXP"]) {
      this.executeDefaultFunctions(_func.name, values);
    } else {
      this.addParamsToSymbolsTable(_func.params, values);
      executeFunction(_func.file, () => executeStatements(_func.body, this));
    }

    if (this._return) {
      if (!_func.type) {
        return addError(
          this,
          `La ${this._func.name} con los parametros '${paramsJoined}' es de tipo void pero retorna un valor.`
        );
      }
      try {
        this._value = this._return.castTo(_func.type);
      } catch (e: any) {
        if (!(e instanceof Error)) return;
        return addError(
          this,
          e.message +
            ` en el retorno de la funcion ${this._func.name} con los parametros '${paramsJoined}'.`
        );
      }
    } else if (!this._return && _func.type) {
      return addError(
        this,
        `La ${
          this._func.name
        } con los parametros '${paramsJoined}' es de tipo ${
          Type[_func.type]
        } pero no retorna ningun valor.`,
        1
      );
    }
  }

  private executeDefaultFunctions(func: string, values: CrlType[]) {
    switch (func) {
      case "Mostrar":
        for (let i = 0; i < values.length; i++) {
          func = func.replace(`\\{${i}\\}`, values[i].toString);
        }
        consoleOut.addMessage(func);
        break;

      case "DibujarAST":
        const name = values[0].toString();
        const functions: RepresentTree[] = functionsTable
          .getFunctions(name)
          .map((func) => {
            const vars = func.params.map((param) => param.type).join(", ");
            return {
              type: "Function",
              represent: `${func.type} : ${name}( ${vars} )`,
              children: func.body.map((stmt) => stmt.rep),
            };
          });
        graphsOut.addGraph({ functions, functionName: name });
        break;

      case "DibujarTS":
        graphsOut.addGraph({
          symbols: symbolsTable.getScope(this._scope),
          scopeName: this._scopeName,
        });
        break;

      default:
        graphsOut.addGraph({ expression: this._func.params[0].rep });
    }
  }

  private addParamsToSymbolsTable(params: Variable[], values: CrlType[]) {
    for (let i = 0; i < params.length; i++) {
      try {
        symbolsTable.addSymbol({
          scopeName: this._scopeName,
          scope: this._scope,
          name: params[i].name,
          line: this._func.params[i]._line,
          column: this._func.params[i]._column,
          data: values[i].castTo(params[i].type),
        });
      } catch (e: any) {
        addError(this, e.message + " para el parametro " + params[i].name);
      }
    }
  }
}
