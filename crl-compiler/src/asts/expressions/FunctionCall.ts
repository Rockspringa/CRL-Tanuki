import {
  addError,
  capitalize,
  ExecutableStatement,
  executeStatements,
  Expression,
  RepresentTree,
} from "../AbstractTree";
import {compileInfo, executeFunction, getScopeName, scopeStack} from "../../crl-globals";
import {Variable} from "../../containers";
import {CrlType, Type} from "../../types";
import {Reference} from "./Reference";

export class FunctionCall implements Expression, ExecutableStatement {
  static readonly specialFunctions = [
    "Mostrar",
    "DibujarAST",
    "DibujarTS",
    "DibujarEXP",
  ];
  readonly _func: { name: string; params: Expression[] };
  readonly _column: number;
  readonly _line: number;
  readonly rep: RepresentTree;

  _return?: CrlType;
  _value?: CrlType;

  constructor(
    func: { name: string; params: Expression[] },
    column: number,
    line: number,
  ) {
    this._column = column;
    this._func = func;
    this._line = line;

    this.rep = {
      type: "Funcion",
      represent: func.name,
    };
  }

  execute(): void {
    const values: CrlType[] = [];
    const vars: Variable[] = [];

    scopeStack.push(`Funcion_${this._func.name}`);
    if (!FunctionCall.specialFunctions.includes(this._func.name) || this._func.name === "Mostrar") {
      for (const _var of this._func.params) {
        _var.execute();

        if (!_var._value) {
          scopeStack.pop();
          return;
        }
        vars.push({name: `${vars.length}`, type: _var._value.type});
        values.push(_var._value);
      }
    }

    if (FunctionCall.specialFunctions.includes(this._func.name)) {
      this.executeDefaultFunctions(this._func.name, values);
      scopeStack.pop();
      return;
    }
    const _func = compileInfo.functionsTable.getFunction(this._func.name, vars);
    const paramsJoined = vars
      .map((_var) => capitalize(Type[_var.type]))
      .join(", ");
    if (!_func || !_func.file) {
      addError(
        this,
        `No se encontro la funcion ${this._func.name} con los parametros '${paramsJoined}'.`
      );
      scopeStack.pop();
      return;
    }
    this.addParamsToSymbolsTable(_func.params, values);
    executeFunction(_func.file, () => executeStatements(_func.body, this));

    if (this._return) {
      if (!_func.type) {
        addError(
          this,
          `La ${this._func.name} con los parametros '${paramsJoined}' es de tipo void pero retorna un valor.`
        );
      }else {
        try {
          this._value = this._return.castTo(_func.type);
        } catch (e: any) {
          if (!(e instanceof Error)) return;
          addError(
            this,
            e.message +
            ` en el retorno de la funcion ${this._func.name} con los parametros '${paramsJoined}'.`
          );
        }
      }
    } else if (!this._return && _func.type) {
      addError(
        this,
        `La ${
          this._func.name
        } con los parametros '${paramsJoined}' es de tipo ${
          Type[_func.type]
        } pero no retorna ningun valor.`,
        1
      );
    }
    compileInfo.symbolsTable.removeScope(scopeStack.length);
    scopeStack.pop();
  }

  private executeDefaultFunctions(func: string, values: CrlType[]) {
    switch (func) {
      case "Mostrar":
        if (!values.length) {
          return addError(this, "La funcion 'Mostrar' necesita, al menos, un parametro.");
        }
        let out = values[0].toString();
        for (let i = 1; i < values.length; i++) {
          out = out.replace(`{${i - 1}}`, values[i].toString());
        }
        compileInfo.consoleOut.addMessage(out);
        break;

      case "DibujarAST":
        if (this._func.params.length === 1 && !(this._func.params[0] instanceof Reference)) {
          return addError(this, "La funcion 'DibujarAST' solo acepta un unico parametro de tipo id.");
        }
        const name = (this._func.params[0] as Reference)._name;
        const functions: RepresentTree[] = compileInfo.functionsTable
          .getFunctions(name)
          .map((func) => {
            const vars = func.params.map((param) => Type[param.type]).join(", ");
            return {
              type: "Function",
              represent: `${func.type ? Type[func.type] : "Void"} : ${name}( ${vars} )`,
              children: func.body.map((stmt) => stmt.rep),
            };
          });
        compileInfo.graphsOut.addGraph({functions, functionName: name});
        break;

      case "DibujarTS":
        compileInfo.graphsOut.addGraph({
          symbols: compileInfo.symbolsTable.getScope(scopeStack.length),
          scopeName: getScopeName(),
        });
        break;

      default:
        compileInfo.graphsOut.addGraph({
          expression: this._func.params[0].rep,
        });
    }
  }

  private addParamsToSymbolsTable(params: Variable[], values: CrlType[]) {
    for (let i = 0; i < params.length; i++) {
      try {
        compileInfo.symbolsTable.addSymbol({
          scopeName: getScopeName(),
          scope: scopeStack.length,
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
