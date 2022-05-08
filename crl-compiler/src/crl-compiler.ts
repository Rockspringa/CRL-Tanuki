import { readFile } from "fs";
import {
  ConsoleOutput,
  ErrorsTable,
  FunctionsTable,
  InfoGraphics,
  SymbolsTable,
} from "./containers";
import { parse as parseCrl, parser as properties } from "./parser/crl-parser";
import { CodeFile, CompileOutput, toolsBundle } from "./crl-globals";
import { CrlDouble } from "./types";

export let files: CodeFile[];
export let graphsOut: InfoGraphics;
export let consoleOut: ConsoleOutput;
export let errorsTable: ErrorsTable;
export let symbolsTable: SymbolsTable;
export let functionsTable: FunctionsTable;

export let actualFile: string = "__base__";

export const executeFunction = (filename: string, callback: Function) => {
  const tmp = actualFile;
  actualFile = filename;
  callback();
  actualFile = tmp;
};

export const parseFile = (
  name: string,
  filepath: string,
  files: CodeFile[]
) => {
  readFile(filepath, (err, data) => {
    if (err) throw err;
    parse(name, data.toString(), files);
  });
};

export const parse = (
  filename: string,
  code: string,
  _files: CodeFile[]
): CompileOutput => {
  files = _files;
  graphsOut = new InfoGraphics();
  consoleOut = new ConsoleOutput();
  errorsTable = new ErrorsTable();
  symbolsTable = new SymbolsTable();
  functionsTable = new FunctionsTable();

  properties.yy = toolsBundle;

  commonParse(filename, code);

  if (errorsTable.getErrors().length) {
    return { errors: errorsTable.getErrors() };
  } else {
    return {
      data: {
        console: consoleOut.getOutput(),
        graphs: graphsOut.getGraphs(),
      },
    };
  }
};

export const parseImport = (filename: string, column: number, line: number) => {
  const _file: CodeFile | undefined = files.find(
    (_file: CodeFile) => _file.name === filename
  );
  if (_file) {
    commonParse(_file.name, _file.code);
  } else {
    errorsTable.addError({
      message: `No se encontro el archivo '${filename}'.`,
      column,
      line,
      type: 2,
    });
  }
};

const commonParse = (filename: string, code: string) => {
  const tmp = actualFile;

  actualFile = filename;
  symbolsTable.addSymbol({
    scopeName: "__base__",
    scope: 0,
    data: new CrlDouble(0.5),
    name: `__inc_${filename}`,
    line: -1,
    column: -1,
  });

  parseCrl(code.toString().concat("\n").replace(/\s+$/, "\n"));

  actualFile = tmp;
};
