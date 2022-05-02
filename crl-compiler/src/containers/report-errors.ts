export interface Error {
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
  errors: Error[] = [];

  getErrors(): Error[] {
    return this.errors.map((error: Error) => Object.assign({}, error));
  }

  addError(data: Error) {
    this.errors.push(data);
  }
}
