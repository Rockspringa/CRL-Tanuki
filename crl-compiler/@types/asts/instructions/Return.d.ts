import { Expression, RepresentTree, Statement } from "../AbstractTree";
import { CrlType } from "../../types/CrlType";
export declare class Return implements Statement {
    readonly __return?: boolean;
    readonly _value?: Expression;
    readonly rep: RepresentTree;
    _return?: CrlType;
    constructor(value?: Expression);
    execute(): void;
}
//# sourceMappingURL=Return.d.ts.map