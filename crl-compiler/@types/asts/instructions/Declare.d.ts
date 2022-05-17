import { ExecutableStatement, Expression, RepresentTree } from "../AbstractTree";
import { Type } from "../../types/CrlType";
export declare class Declare implements ExecutableStatement {
    readonly _column: number;
    readonly _line: number;
    readonly _type: Type;
    readonly _names: string[];
    readonly _value?: Expression;
    readonly rep: RepresentTree;
    constructor(_var: {
        type: Type;
        names: string[];
        value?: Expression;
    }, column: number, line: number);
    execute(): void;
    private getDefaultValue;
}
//# sourceMappingURL=Declare.d.ts.map