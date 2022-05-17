import { Expression, RepresentTree } from "../AbstractTree";
import { CrlType } from "../../types/CrlType";
declare enum ArithmeticOperator {
    PLUS = 0,
    MINUS = 1,
    TIMES = 2,
    DIVIDED = 3,
    MODULUS = 4,
    RAISED_TO = 5
}
export declare class Arithmetic implements Expression {
    readonly _column: number;
    readonly _line: number;
    readonly _val1: Expression;
    readonly _val2: Expression;
    readonly _operator: ArithmeticOperator;
    _value?: CrlType;
    rep: RepresentTree;
    constructor(num1: Expression, num2: Expression, operator: ArithmeticOperator, column: number, line: number);
    execute(): void;
    private getSymbol;
}
export {};
//# sourceMappingURL=Arithmetic.d.ts.map