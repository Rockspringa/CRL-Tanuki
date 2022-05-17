"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.parseImport = exports.executeFunction = void 0;
const crl_parser_1 = require("./parser/crl-parser");
const console_1 = require("./containers/console");
const CrlType_1 = require("./types/CrlType");
const executable_functions_1 = require("./containers/executable-functions");
const crl_configs_1 = require("./crl-configs");
const symbols_table_1 = require("./containers/symbols-table");
const report_errors_1 = require("./containers/report-errors");
const FunctionCall_1 = require("./asts/expressions/FunctionCall");
const AbstractTree_1 = require("./asts/AbstractTree");
const images_1 = require("./containers/images");
const getScopeName = () => scopeStack.length ? scopeStack.join("_") : "__global__";
const getFilename = () => compileInfo.filename;
const addError = (data) => compileInfo.errorsTable.addError(data);
const scopeStack = [];
let compileInfo;
const executeFunction = (filename, callback) => {
    const tmp = compileInfo.filename;
    compileInfo.filename = filename;
    callback();
    compileInfo.filename = tmp;
};
exports.executeFunction = executeFunction;
const parseImport = (filename, column, line) => {
    const _file = compileInfo.files.find((_file) => _file.name === filename);
    if (_file) {
        commonParse(_file.name, _file.code);
    }
    else {
        compileInfo.errorsTable.addError({
            message: `No se encontro el archivo '${filename}'.`,
            column,
            line,
            type: 2,
        });
    }
};
exports.parseImport = parseImport;
const parse = (filename, code, _files) => {
    compileInfo = {
        files: _files,
        filename: filename,
        graphsOut: new images_1.InfoGraphics(),
        consoleOut: new console_1.ConsoleOutput(),
        errorsTable: new report_errors_1.ErrorsTable(getFilename, getScopeName),
        symbolsTable: new symbols_table_1.SymbolsTable(),
        functionsTable: new executable_functions_1.FunctionsTable(addError, getFilename),
    };
    setPropertiesToSupportElements();
    commonParse(filename, code);
    executePrincipal();
    return getOutputData();
};
exports.parse = parse;
const setPropertiesToSupportElements = () => {
    const compileTools = {
        executeFunction: exports.executeFunction,
        getScopeName,
        scopeStack,
    };
    Object.assign(compileTools, compileInfo);
    Object.assign(compileTools, compileInfo);
    (0, AbstractTree_1.setCompileTools)(compileTools);
    Object.assign(crl_parser_1.parser.yy, (0, crl_configs_1.toolsBundle)(compileInfo, exports.parseImport));
};
const executePrincipal = () => {
    const main = compileInfo.functionsTable.getFunction("Principal", []);
    if (main) {
        if (main.type) {
            compileInfo.errorsTable.addError({
                message: "La funcion principal debe ser 'Void'",
                type: 2,
                line: 0,
                column: 1,
            });
        }
        else if (main.file != compileInfo.filename) {
            compileInfo.errorsTable.addError({
                message: "La funcion principal debe de estar en el archivo inicial.",
                type: 2,
                line: 0,
                column: 1,
            });
        }
        else {
            scopeStack.push("Funcion_Principal");
            (0, AbstractTree_1.executeStatements)(main.body, new FunctionCall_1.FunctionCall({ name: main.name, params: [] }, 0, 0));
            scopeStack.pop();
            return;
        }
    }
    else {
        compileInfo.errorsTable.addError({
            message: "No existe una funcion principal en el proyecto.",
            type: 2,
            line: 0,
            column: 1,
        });
    }
};
const getOutputData = () => {
    if (crl_parser_1.parser.yy.compileInfo.errorsTable.getErrors().length) {
        return {
            errors: crl_parser_1.parser.yy.compileInfo.errorsTable.getErrors(),
        };
    }
    else {
        return {
            data: {
                console: crl_parser_1.parser.yy.compileInfo.consoleOut.getOutput(),
                graphs: crl_parser_1.parser.yy.compileInfo.graphsOut.getGraphs(),
            },
        };
    }
};
const commonParse = (filename, code) => {
    const tmp = compileInfo.filename;
    compileInfo.filename = filename;
    compileInfo.symbolsTable.addSymbol({
        scopeName: "__global__",
        scope: 0,
        data: new CrlType_1.CrlDouble(0.5),
        name: `__inc_${filename}`,
        line: -1,
        column: -1,
    });
    (0, crl_parser_1.parse)(code.toString().replace(/\r/g, ""));
    compileInfo.filename = tmp;
};
//# sourceMappingURL=crl-compiler.js.map