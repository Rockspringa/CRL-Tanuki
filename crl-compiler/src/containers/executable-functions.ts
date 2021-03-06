import { Type } from "../types/CrlType";
import { Variable } from "./symbols-table";
import { Statement } from "../asts/AbstractTree";

export interface CrlFunction {
  name: string;
  params: Variable[];
  body: Statement[];
  file?: string;
  type?: Type;
}

export class FunctionsTable {
  private functions: CrlFunction[] = [];
  private readonly addError: Function;
  private readonly getFilename: Function;

  constructor(_addError: Function, _getFilename: Function) {
    this.addError = _addError;
    this.getFilename = _getFilename;
  }

  getFunctions(name: string): CrlFunction[] {
    return this.functions.filter((func: CrlFunction) => func.name === name);
  }

  getFunction(name: string, params: Variable[]): CrlFunction | undefined {
    return this.functions.find((func: CrlFunction) => {
      if (func.name === name && func.params.length === params.length) {
        for (let i: number = 0; i < params.length; i++) {
          if (params[i].type !== func.params[i].type) return false;
        }
        return true;
      }
      return false;
    });
  }

  addFunction(data: CrlFunction, column: number, line: number): void {
    if (this.getFunction(data.name, [...data.params])) {
      return this.addError({
        message: `La funcion '${data.name}' no se pudo sobrecargar porque ya existe.`,
        column,
        line,
        type: 2,
      });
    }
    if (data.name in ["Mostrar", "DibujarTS", "DibujarAST", "DibujarEXP"]) {
      return this.addError({
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
    data.file = this.getFilename();
    data.body = data.body.filter(stmt => stmt);
    this.functions.push(data);
  }
}
