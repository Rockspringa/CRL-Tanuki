import {
  ConsoleOutput,
  ErrorsTable,
  FunctionsTable,
  InfoGraphics,
  SymbolsTable,
} from "./containers";
import { parse as parseCrl, parser as properties } from "./parser/crl-parser";
import {
  CodeFile,
  CompileInfo,
  CompileOutput,
  toolsBundle,
} from "./crl-globals";
import { CrlDouble } from "./types";
import { executeStatements } from "./asts/AbstractTree";
import { FunctionCall } from "./asts/expressions";

export const getScopeName = () => scopeStack.join("_");
export const scopeStack: string[] = [];

export let compileInfo: CompileInfo = {
  files: [],
  filename: "__base__",
  graphsOut: new InfoGraphics(),
  consoleOut: new ConsoleOutput(),
  errorsTable: new ErrorsTable(),
  symbolsTable: new SymbolsTable(),
  functionsTable: new FunctionsTable(),
};

export const executeFunction = (filename: string, callback: Function) => {
  const tmp = compileInfo.filename;
  compileInfo.filename = filename;
  callback();
  compileInfo.filename = tmp;
};

export const parse = (
  filename: string,
  code: string,
  _files: CodeFile[]
): CompileOutput => {
  compileInfo.files = _files;
  compileInfo.filename = filename;

  Object.assign(properties.yy, toolsBundle);

  commonParse(filename, code);
  executePrincipal();

  compileInfo = {
    files: [],
    filename: "__base__",
    graphsOut: new InfoGraphics(),
    consoleOut: new ConsoleOutput(),
    errorsTable: new ErrorsTable(),
    symbolsTable: new SymbolsTable(),
    functionsTable: new FunctionsTable(),
  };

  const a = getOutputData();
  console.log(JSON.stringify(a, null, 2));
  return a;
};

export const parseImport = (filename: string, column: number, line: number) => {
  const _file: CodeFile | undefined = compileInfo.files.find(
    (_file: CodeFile) => _file.name === filename
  );
  if (_file) {
    commonParse(_file.name, _file.code);
  } else {
    compileInfo.errorsTable.addError({
      message: `No se encontro el archivo '${filename}'.`,
      column,
      line,
      type: 2,
    });
  }
};

const executePrincipal = (): void => {
  const main = compileInfo.functionsTable.getFunction("Principal", []);
  if (main) {
    if (main.type) {
      compileInfo.errorsTable.addError({
        message: "La funcion principal debe ser 'Void'",
        type: 2,
        line: 0,
        column: 0,
      });
    } else if (main.file != compileInfo.filename) {
      compileInfo.errorsTable.addError({
        message: "La funcion principal debe de estar en el archivo inicial.",
        type: 2,
        line: 0,
        column: 0,
      });
    } else {
      scopeStack.push("Funcion_Principal");
      executeStatements(
        main.body,
        new FunctionCall({ name: main.name, params: [] }, 0, 0)
      );
      scopeStack.pop();
      return;
    }
  } else {
    compileInfo.errorsTable.addError({
      message: "No existe una funcion principal en el proyecto.",
      type: 2,
      line: 0,
      column: 0,
    });
  }
};

const getOutputData = (): CompileOutput => {
  if ((properties.yy as any).compileInfo.errorsTable.getErrors().length) {
    return {
      errors: (properties.yy as any).compileInfo.errorsTable.getErrors(),
    };
  } else {
    return {
      data: {
        console: (properties.yy as any).compileInfo.consoleOut.getOutput(),
        graphs: (properties.yy as any).compileInfo.graphsOut.getGraphs(),
      },
    };
  }
};

const commonParse = (filename: string, code: string) => {
  const tmp = compileInfo.filename;

  compileInfo.filename = filename;
  compileInfo.symbolsTable.addSymbol({
    scopeName: "__base__",
    scope: 0,
    data: new CrlDouble(0.5),
    name: `__inc_${filename}`,
    line: -1,
    column: -1,
  });

  parseCrl(code.toString().replace(/\r/g, ""));

  compileInfo.filename = tmp;
};
