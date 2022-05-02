import { AbstractTree } from "../asts/AbstractTree";
import { Variable } from "./symbols-table";
import { errors } from "../parser/crl-parser";

export interface Function {
  name: string;
  params: Set<Variable>;
  body: AbstractTree[];
  type?: Type;
}

export class FunctionsTable {
  functions: Function[] = [];

  getFunction(name: string, params: Variable[], type?: Type): Function | undefined {
    return this.functions.find((func: Function) => {
      if (func.name === name && func.type === type && func.params.size === params.length) {
        const savedParams: Variable[] = [...func.params];
        for (let i: number = 0; i < params.length; i++) {
          if (params[i].type !== savedParams[i].type) return false;
        }
        return true;
      }
      return false;
    });
  }

  addFunction(data: Function, column: number, line: number): void {
    if (this.getFunction(data.name, [...data.params], data.type)) {
      return errors.addError({
        message: `La funcion ${data.name} no se pudo sobrecargar porque ya existe.`,
        column,
        line,
        type: 2,
      });
    }
    this.functions.push(data);
  }
}
