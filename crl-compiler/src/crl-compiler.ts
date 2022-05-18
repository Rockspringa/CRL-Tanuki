import { parse as parseCrl, parser as properties } from "./parser/crl-parser";
import { ConsoleOutput } from "./containers/console";
import { CrlDouble } from "./types/CrlType";
import { FunctionsTable } from "./containers/executable-functions";
import {
  CodeFile,
  CompileInfo,
  CompileOutput,
  toolsBundle,
} from "./crl-configs";
import { SymbolsTable } from "./containers/symbols-table";
import { AnalyzeError, ErrorsTable } from "./containers/report-errors";
import { FunctionCall } from "./asts/expressions/FunctionCall";
import { executeStatements, setCompileTools } from "./asts/AbstractTree";
import { InfoGraphics } from "./containers/images";

const getScopeName = () => scopeStack.length ? scopeStack.join("_") : "__global__";
const getFilename = () => compileInfo.filename;
const addError = (data: AnalyzeError) => compileInfo.errorsTable.addError(data);
const scopeStack: string[] = [];

let compileInfo: CompileInfo;
let readFiles: string[];

export const executeFunction = (filename: string, callback: Function) => {
  const tmp = compileInfo.filename;
  compileInfo.filename = filename;
  callback();
  compileInfo.filename = tmp;
};

export const parseImport = (filename: string, column: number, line: number) => {
  if (filename in readFiles) {
    return compileInfo.errorsTable.addError({
      message: "Se detecto una referencia circular en los archivos importados.",
      type: 2,
      line,
      column,
    })
  }
  const _file: CodeFile | undefined = compileInfo.files.find(
    (_file: CodeFile) => _file.name === filename
  );
  if (_file) {
    readFiles.unshift(filename);
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

export const parse = (
  filename: string,
  code: string,
  _files: CodeFile[]
): CompileOutput => {
  compileInfo = {
    files: _files,
    filename: filename,
    graphsOut: new InfoGraphics(),
    consoleOut: new ConsoleOutput(),
    errorsTable: new ErrorsTable(getFilename, getScopeName),
    symbolsTable: new SymbolsTable(),
    functionsTable: new FunctionsTable(addError, getFilename),
  };
  readFiles = [filename];

  setPropertiesToSupportElements();
  commonParse(filename, code);
  executePrincipal();

  return getOutputData();
};

const setPropertiesToSupportElements = () => {
  const compileTools: any = {
    executeFunction,
    getScopeName,
    scopeStack,
  };
  Object.assign(compileTools, compileInfo);
  Object.assign(compileTools, compileInfo);
  setCompileTools(compileTools);

  Object.assign(properties.yy, toolsBundle(compileInfo, parseImport));
};

const executePrincipal = (): void => {
  const main = compileInfo.functionsTable.getFunction("Principal", []);
  if (main) {
    if (main.type) {
      compileInfo.errorsTable.addError({
        message: "La funcion principal debe ser 'Void'",
        type: 2,
        line: 0,
        column: 1,
      });
    } else if (main.file != compileInfo.filename) {
      compileInfo.errorsTable.addError({
        message: "La funcion principal debe de estar en el archivo inicial.",
        type: 2,
        line: 0,
        column: 1,
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
      column: 1,
    });
  }
};

const getOutputData = (): CompileOutput => {
  if (properties.yy.compileInfo.errorsTable.getErrors().length) {
    return {
      errors: properties.yy.compileInfo.errorsTable.getErrors(),
    };
  } else {
    return {
      data: {
        console: properties.yy.compileInfo.consoleOut.getOutput(),
        graphs: properties.yy.compileInfo.graphsOut.getGraphs(),
      },
    };
  }
};

const commonParse = (filename: string, code: string) => {
  const tmp = compileInfo.filename;

  compileInfo.filename = filename;
  compileInfo.symbolsTable.addSymbol({
    scopeName: "__global__",
    scope: 0,
    data: new CrlDouble(0.5),
    name: `__inc_${filename}`,
    line: -1,
    column: -1,
  });

  parseCrl(code.toString().replace(/\r/g, ""));

  compileInfo.filename = tmp;
};
