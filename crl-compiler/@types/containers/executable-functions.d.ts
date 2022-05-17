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
export declare class FunctionsTable {
    private functions;
    private readonly addError;
    private readonly getFilename;
    constructor(_addError: Function, _getFilename: Function);
    getFunctions(name: string): CrlFunction[];
    getFunction(name: string, params: Variable[]): CrlFunction | undefined;
    addFunction(data: CrlFunction, column: number, line: number): void;
}
//# sourceMappingURL=executable-functions.d.ts.map