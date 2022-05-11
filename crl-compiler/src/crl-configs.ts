import {
  AnalyzeError,
  ConsoleOutput,
  ErrorsTable,
  FunctionsTable,
  Graph,
  InfoGraphics,
  SymbolsTable,
} from "./containers";
import {
  Arithmetic,
  FunctionCall,
  Logics,
  Reference,
  Relational,
  Value,
} from "./asts/expressions";
import {
  Assign,
  Break,
  Continue,
  Declare,
  For,
  If,
  Return,
  While,
} from "./asts/instructions";
import { CrlBool, CrlChar, CrlDouble, CrlInt, CrlString, Type } from "./types";
import { compileInfo, parseImport } from "./crl-globals";

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

export const toolsBundle = {
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
};
