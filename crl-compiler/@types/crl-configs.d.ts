import { CrlDouble } from "./types/CrlType";
import { AnalyzeError, ErrorsTable } from "./containers/report-errors";
import { Break } from "./asts/instructions/Break";
import { Logics } from "./asts/expressions/Logics";
import { Continue } from "./asts/instructions/Continue";
import { Graph, InfoGraphics } from "./containers/images";
import { ConsoleOutput } from "./containers/console";
import { FunctionsTable } from "./containers/executable-functions";
import { FunctionCall } from "./asts/expressions/FunctionCall";
import { CrlBool } from "./types/CrlType";
import { Return } from "./asts/instructions/Return";
import { CrlString } from "./types/CrlType";
import { SymbolsTable } from "./containers/symbols-table";
import { Reference } from "./asts/expressions/Reference";
import { CrlChar } from "./types/CrlType";
import { Relational } from "./asts/expressions/Relational";
import { For } from "./asts/instructions/For";
import { While } from "./asts/instructions/While";
import { Declare } from "./asts/instructions/Declare";
import { Type } from "./types/CrlType";
import { Value } from "./asts/expressions/Value";
import { Assign } from "./asts/instructions/Assign";
import { If } from "./asts/instructions/If";
import { CrlInt } from "./types/CrlType";
import { Arithmetic } from "./asts/expressions/Arithmetic";
export interface CompileInfo {
    files: CodeFile[];
    graphsOut: InfoGraphics;
    consoleOut: ConsoleOutput;
    errorsTable: ErrorsTable;
    symbolsTable: SymbolsTable;
    functionsTable: FunctionsTable;
    filename: string;
}
export interface CodeFile {
    name: string;
    code: string;
}
export interface CompileOutput {
    data?: {
        console: string[];
        graphs: Graph[];
    };
    errors?: AnalyzeError[];
}
export declare const toolsBundle: (compileInfo: CompileInfo, parseImport: Function) => {
    compileInfo: CompileInfo;
    parseImport: Function;
    indents: number[];
    dedents: never[];
    eof: boolean;
    CrlBool: typeof CrlBool;
    CrlChar: typeof CrlChar;
    CrlDouble: typeof CrlDouble;
    CrlInt: typeof CrlInt;
    CrlString: typeof CrlString;
    Type: typeof Type;
    Arithmetic: typeof Arithmetic;
    FunctionCall: typeof FunctionCall;
    Logics: typeof Logics;
    Reference: typeof Reference;
    Relational: typeof Relational;
    Value: typeof Value;
    Assign: typeof Assign;
    Break: typeof Break;
    Continue: typeof Continue;
    Declare: typeof Declare;
    For: typeof For;
    If: typeof If;
    Return: typeof Return;
    While: typeof While;
};
//# sourceMappingURL=crl-configs.d.ts.map