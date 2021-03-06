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
  private readonly getFilename: Function;
  private readonly getScopeName: Function;

  constructor(_getFilename: Function, _getScopeName: Function) {
    this.getFilename = _getFilename;
    this.getScopeName = _getScopeName;
  }

  getErrors(): AnalyzeError[] {
    return this.errors.map((error: AnalyzeError) => Object.assign({}, error));
  }

  addError(data: AnalyzeError) {
    this.errors.push(data);
    data.file = this.getFilename();
    data.scopeName = this.getScopeName();
  }
}
