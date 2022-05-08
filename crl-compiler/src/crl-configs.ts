import { AnalyzeError, Graph } from "./containers";
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
import { CrlBool, CrlChar, CrlDouble, CrlInt, CrlString } from "./types";
import { errorsTable, files, parseImport } from "./crl-globals";

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
  files: files,
  scopeStack: [],
  parseImport: parseImport,
  errorsTable: errorsTable,
  CrlBool,
  CrlChar,
  CrlDouble,
  CrlInt,
  CrlString,
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
