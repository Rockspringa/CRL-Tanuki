import {compileInfo, getScopeName} from "../crl-compiler";

export interface AnalyzeError {
  message: string;
  column: number;
  line: number;
  type: ErrorType;
  file?: string;
  scopeName?: string;
}

export enum ErrorType {
  LEXICAL,
  SYNTACTICAL,
  SEMANTIC,
}

export class ErrorsTable {
  private errors: AnalyzeError[] = [];

  getErrors(): AnalyzeError[] {
    return this.errors.map((error: AnalyzeError) => Object.assign({}, error));
  }

  addError(data: AnalyzeError) {
    this.errors.push(data);
    data.file = compileInfo.filename;
    data.scopeName = getScopeName();
  }
}
