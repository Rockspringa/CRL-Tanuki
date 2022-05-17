import { ControlStatement, Expression, RepresentTree, Statement } from "../AbstractTree";
import { CrlType } from "../../types/CrlType";
export declare class If implements ControlStatement {
    _executions: number;
    readonly _condition: Expression;
    readonly _body: Statement[];
    readonly _elseBody?: Statement[];
    readonly rep: RepresentTree;
    _break?: boolean;
    _return?: CrlType;
    __return?: boolean;
    _continue?: boolean;
    constructor(condition: Expression, body: Statement[], elseBody?: Statement[]);
    execute(): void;
}
//# sourceMappingURL=If.d.ts.map