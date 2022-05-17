import { CrlType } from "../types/CrlType";
export declare let compileTools: any;
export declare const setCompileTools: (ci: any) => void;
export interface AbstractTree {
    rep: RepresentTree;
    execute(): void;
}
export interface RepresentTree {
    type: string;
    represent: string;
    children?: RepresentTree[];
}
export interface Expression extends AbstractTree {
    readonly _column: number;
    readonly _line: number;
    _value?: CrlType;
}
export interface Statement extends AbstractTree {
    _break?: boolean;
    _return?: CrlType;
    __return?: boolean;
    _continue?: boolean;
}
export interface ExecutableStatement extends AbstractTree {
    readonly _column: number;
    readonly _line: number;
}
export interface ControlStatement extends Statement {
    _executions: number;
    _body: Statement[];
    _break?: boolean;
    _return?: CrlType;
    __return?: boolean;
    _continue?: boolean;
}
export declare const executeStatements: (body: Statement[], statement: Statement) => void;
export declare const addError: (_this: {
    _column: number;
    _line: number;
}, msg: string, type?: number) => void;
export declare const capitalize: (str: string) => string;
//# sourceMappingURL=AbstractTree.d.ts.map