export interface AnalyzeError {
    message: string;
    column: number;
    line: number;
    type: ErrorType;
    file?: string;
    scopeName?: string;
}
export declare enum ErrorType {
    LEXICAL = 0,
    SYNTACTICAL = 1,
    SEMANTIC = 2
}
export declare class ErrorsTable {
    private errors;
    private readonly getFilename;
    private readonly getScopeName;
    constructor(_getFilename: Function, _getScopeName: Function);
    getErrors(): AnalyzeError[];
    addError(data: AnalyzeError): void;
}
//# sourceMappingURL=report-errors.d.ts.map