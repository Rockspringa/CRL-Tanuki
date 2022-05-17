import { ExecutableStatement, Expression, RepresentTree } from "../AbstractTree";
import { CrlType } from "../../types/CrlType";
export declare class FunctionCall implements Expression, ExecutableStatement {
    static readonly specialFunctions: string[];
    readonly _func: {
        name: string;
        params: Expression[];
    };
    readonly _column: number;
    readonly _line: number;
    readonly rep: RepresentTree;
    _return?: CrlType;
    _value?: CrlType;
    constructor(func: {
        name: string;
        params: Expression[];
    }, column: number, line: number);
    execute(): void;
    private executeDefaultFunctions;
    private addParamsToSymbolsTable;
}
//# sourceMappingURL=FunctionCall.d.ts.map