import { Statement } from "../asts/AbstractTree";
import { compileInfo } from "../crl-globals";
import { Type } from "../types";
import { Variable } from "./";

export interface Function {
  name: string;
  params: Variable[];
  body: Statement[];
  file?: string;
  type?: Type;
}

export class FunctionsTable {
  private functions: Function[] = [];

  getFunctions(name: string): Function[] {
    return this.functions.filter((func: Function) => func.name === name);
  }

  getFunction(name: string, params: Variable[]): Function | undefined {
    return this.functions.find((func: Function) => {
      if (func.name === name && func.params.length === params.length) {
        for (let i: number = 0; i < params.length; i++) {
          if (params[i].type !== func.params[i].type) return false;
        }
        return true;
      }
      return false;
    });
  }

  addFunction(data: Function, column: number, line: number): void {
    if (this.getFunction(data.name, [...data.params])) {
      return compileInfo.errorsTable.addError({
        message: `La funcion '${data.name}' no se pudo sobrecargar porque ya existe.`,
        column,
        line,
        type: 2,
      });
    }
    if (data.name in ["Mostrar", "DibujarTS", "DibujarAST", "DibujarEXP"]) {
      return compileInfo.errorsTable.addError({
        message: `La funcion '${data.name}' no se pudo sobrecargar porque tiene el mismo nombre que las funciones por defecto.`,
        column,
        line,
        type: 2,
      });
    }
    // if (
    //   data.type &&
    //   !data.body.find()
    // ) {
    //   return errorsTable.addError({
    //     message: `La funcion ${data.name} se declaro con un tipo pero nunca se retorna ningun valor.`,
    //     column,
    //     line,
    //     type: 2,
    //   });
    // }
    data.file = compileInfo.filename;
    this.functions.push(data);
  }
}
