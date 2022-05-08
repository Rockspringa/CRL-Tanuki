export interface AnalyzeError {
  message: string;
  column: number;
  line: number;
  type: ErrorType;
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
  }
}
