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

export const toolsBundle = (compileInfo: CompileInfo, parseImport: Function) => ({
  compileInfo,
  parseImport,
  indents: [0],
  dedents: [],
  eof: false,
  CrlBool,
  CrlChar,
  CrlDouble,
  CrlInt,
  CrlString,
  Type,
  Arithmetic,
  FunctionCall,
  Logics,
  Reference,
  Relational,
  Value,
  Assign,
  Break,
  Continue,
  Declare,
  For,
  If,
  Return,
  While,
});
