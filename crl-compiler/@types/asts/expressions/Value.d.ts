import { Expression, RepresentTree } from "../AbstractTree";
import { CrlType, Type } from "../../types/CrlType";
export declare class Value implements Expression {
    readonly _column: number;
    readonly _line: number;
    readonly rep: RepresentTree;
    _value: CrlType;
    constructor(value: CrlType, type: Type, column: number, line: number);
    execute(): void;
}
//# sourceMappingURL=Value.d.ts.map