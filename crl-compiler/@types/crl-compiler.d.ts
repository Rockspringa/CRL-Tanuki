import { CodeFile, CompileOutput } from "./crl-configs";
export declare const executeFunction: (filename: string, callback: Function) => void;
export declare const parseImport: (filename: string, column: number, line: number) => void;
export declare const parse: (filename: string, code: string, _files: CodeFile[]) => CompileOutput;
//# sourceMappingURL=crl-compiler.d.ts.map