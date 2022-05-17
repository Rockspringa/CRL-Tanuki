import { ControlStatement, Expression, RepresentTree, Statement } from "../AbstractTree";
import { CrlType } from "../../types/CrlType";
export declare class While implements ControlStatement {
    _executions: number;
    readonly _condition: Expression;
    readonly _body: Statement[];
    readonly rep: RepresentTree;
    _break?: boolean;
    _return?: CrlType;
    __return?: boolean;
    _continue?: boolean;
    constructor(condition: Expression, body: Statement[]);
    execute(): void;
}
//# sourceMappingURL=While.d.ts.map