import { Expression, RepresentTree } from "../AbstractTree";
import { CrlType } from "../../types/CrlType";
declare enum RelationalOperator {
    EQUAL = 0,
    DIFFERENT = 1,
    LESS = 2,
    LESS_EQUAL = 3,
    GREATER = 4,
    GREATER_EQUAL = 5,
    UNCERTAINTY = 6
}
export declare class Relational implements Expression {
    readonly _column: number;
    readonly _line: number;
    readonly _val1: Expression;
    readonly _val2: Expression;
    readonly _operator: RelationalOperator;
    _value?: CrlType;
    rep: RepresentTree;
    constructor(val1: Expression, val2: Expression, operator: RelationalOperator, column: number, line: number);
    execute(): void;
    private _getSymbol;
}
export {};
//# sourceMappingURL=Relational.d.ts.map