"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorsTable = exports.ErrorType = void 0;
var ErrorType;
(function (ErrorType) {
    ErrorType[ErrorType["LEXICAL"] = 0] = "LEXICAL";
    ErrorType[ErrorType["SYNTACTICAL"] = 1] = "SYNTACTICAL";
    ErrorType[ErrorType["SEMANTIC"] = 2] = "SEMANTIC";
})(ErrorType = exports.ErrorType || (exports.ErrorType = {}));
class ErrorsTable {
    constructor(_getFilename, _getScopeName) {
        this.errors = [];
        this.getFilename = _getFilename;
        this.getScopeName = _getScopeName;
    }
    getErrors() {
        return this.errors.map((error) => Object.assign({}, error));
    }
    addError(data) {
        this.errors.push(data);
        data.file = this.getFilename();
        data.scopeName = this.getScopeName();
    }
}
exports.ErrorsTable = ErrorsTable;
//# sourceMappingURL=report-errors.js.map