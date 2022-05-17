import { ControlStatement, Expression, RepresentTree, Statement } from "../AbstractTree";
import { Declare } from "./Declare";
import { CrlType } from "../../types/CrlType";
export declare class For implements ControlStatement {
    _executions: number;
    readonly _declaration: Declare;
    readonly _condition: Expression;
    readonly _increment: boolean;
    readonly _body: Statement[];
    readonly rep: RepresentTree;
    _break?: boolean;
    _return?: CrlType;
    __return?: boolean;
    _continue?: boolean;
    constructor(declaration: Declare, condition: Expression, increment: boolean, body: Statement[]);
    execute(): void;
}
//# sourceMappingURL=For.d.ts.map