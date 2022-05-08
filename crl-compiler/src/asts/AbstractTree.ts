import { Break, Continue, Return } from "./instructions";
import { errorsTable } from "../crl-globals";
import { CrlType } from "../types";

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
  _return?: CrlType;
}

export interface ExecutableStatement extends AbstractTree {
  readonly _column: number;
  readonly _line: number;
}

export interface ControlStatement extends Statement {
  _body: Statement[];
  _break?: boolean;
  _continue?: boolean;
}

export const executeStatements = (
  body: Statement[],
  statement: Statement | ControlStatement
) =>
  body.forEach((instruct: Statement | ControlStatement) => {
    instruct.execute();

    if (instruct instanceof Return || instruct._return) {
      statement._return = instruct._return;
      return;
    }
    if (
      (instruct instanceof Break ||
        ("_break" in instruct && instruct._break)) &&
      "_break" in statement
    ) {
      statement._break = true;
      return;
    }
    if (
      (instruct instanceof Continue ||
        ("_continue" in instruct && instruct._continue)) &&
      "_continue" in statement
    ) {
      statement._continue = true;
      return;
    }
  });

export const addError = (
  _this: { _column: number; _line: number },
  msg: string,
  type: number = 2
): void => {
  errorsTable.addError({
    message: msg,
    column: _this._column,
    line: _this._line,
    type: type,
  });
};

export const capitalize = (str: string) =>
  str[0].toUpperCase() + str.substring(1).toLowerCase();
