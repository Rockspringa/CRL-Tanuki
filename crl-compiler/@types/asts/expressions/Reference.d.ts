import { Expression, RepresentTree } from "../AbstractTree";
import { CrlType } from "../../types/CrlType";
export declare class Reference implements Expression {
    readonly _name: string;
    readonly _column: number;
    readonly _line: number;
    readonly rep: RepresentTree;
    _value?: CrlType;
    constructor(name: string, column: number, line: number);
    execute(): void;
}
//# sourceMappingURL=Reference.d.ts.map