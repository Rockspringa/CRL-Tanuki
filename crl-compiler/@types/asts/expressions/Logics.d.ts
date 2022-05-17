import { Expression, RepresentTree } from "../AbstractTree";
import { CrlType } from "../../types/CrlType";
declare enum LogicOperator {
    AND = 0,
    OR = 1,
    XOR = 2,
    NOT = 3
}
export declare class Logics implements Expression {
    readonly _column: number;
    readonly _line: number;
    readonly _val1: Expression;
    readonly _val2: Expression;
    readonly _operator: LogicOperator;
    _value?: CrlType;
    rep: RepresentTree;
    constructor(val1: Expression, val2: Expression, operator: LogicOperator, column: number, line: number);
    execute(): void;
    private getSymbol;
}
export {};
//# sourceMappingURL=Logics.d.ts.map