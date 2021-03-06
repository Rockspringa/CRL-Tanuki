import { CrlType } from "../types/CrlType";

export let compileTools: any;

export const setCompileTools = (ci: any) => {
  compileTools = ci;
}

export interface AbstractTree {
  rep: RepresentTree;

  execute(): void;
}

export interface RepresentTree {
  type: string;
  represent: string;
  children?: RepresentTree[];
}

export interface Expression extends AbstractTree {
  readonly _column: number;
  readonly _line: number;

  _value?: CrlType;
}

export interface Statement extends AbstractTree {
  _break?: boolean;
  _return?: CrlType;
  __return?: boolean;
  _continue?: boolean;
}

export interface ExecutableStatement extends AbstractTree {
  readonly _column: number;
  readonly _line: number;
}

export interface ControlStatement extends Statement {
  _executions: number;

  _body: Statement[];
  _break?: boolean;
  _return?: CrlType;
  __return?: boolean;
  _continue?: boolean;
}

export const executeStatements = (body: Statement[], statement: Statement) => {
  for (const instruct of body) {
    instruct.execute();

    if (instruct.__return) {
      statement._return = instruct._return;
      statement.__return = instruct.__return;
      return;
    }
    if (instruct._break) {
      statement._break = true;
      return;
    }
    if (instruct._continue) {
      statement._continue = true;
      return;
    }
  }
};

export const addError = (
  _this: { _column: number; _line: number },
  msg: string,
  type: number = 2
): void => {
  compileTools.errorsTable.addError({
    message: msg,
    column: _this._column,
    line: _this._line,
    type: type,
  });
};

export const capitalize = (str: string) =>
  str[0].toUpperCase() + str.substring(1).toLowerCase();
