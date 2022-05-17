"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalize = exports.addError = exports.executeStatements = exports.setCompileTools = exports.compileTools = void 0;
const setCompileTools = (ci) => {
    exports.compileTools = ci;
};
exports.setCompileTools = setCompileTools;
const executeStatements = (body, statement) => {
    for (const instruct of body) {
        instruct.execute();
        if (instruct.__return) {
            statement._return = instruct._return;
            statement.__return = instruct.__return;
            return;
        }
        if (instruct._break) {
            statement._break = true;
            return;
        }
        if (instruct._continue) {
            statement._continue = true;
            return;
        }
    }
};
exports.executeStatements = executeStatements;
const addError = (_this, msg, type = 2) => {
    exports.compileTools.errorsTable.addError({
        message: msg,
        column: _this._column,
        line: _this._line,
        type: type,
    });
};
exports.addError = addError;
const capitalize = (str) => str[0].toUpperCase() + str.substring(1).toLowerCase();
exports.capitalize = capitalize;
//# sourceMappingURL=AbstractTree.js.map