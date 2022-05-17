import { ExecutableStatement, Expression, RepresentTree } from "../AbstractTree";
export declare class Assign implements ExecutableStatement {
    readonly _column: number;
    readonly _line: number;
    readonly _name: string;
    readonly _value: Expression;
    readonly rep: RepresentTree;
    constructor(name: string, value: Expression, column: number, line: number);
    execute(): void;
}
//# sourceMappingURL=Assign.d.ts.map