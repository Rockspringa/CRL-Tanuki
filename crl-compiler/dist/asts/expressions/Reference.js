"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reference = void 0;
const AbstractTree_1 = require("../AbstractTree");
class Reference {
    constructor(name, column, line) {
        this._column = column;
        this._name = name;
        this._line = line;
        this.rep = {
            type: "Variable",
            represent: name,
        };
    }
    execute() {
        try {
            this._value = AbstractTree_1.compileTools.symbolsTable.getSymbol(this._name, AbstractTree_1.compileTools.scopeStack.length).data;
        }
        catch (e) {
            if (e instanceof Error) {
                AbstractTree_1.compileTools.errorsTable.addError({
                    message: e.message,
                    column: this._column,
                    line: this._line,
                    type: 2,
                });
            }
        }
    }
}
exports.Reference = Reference;
//# sourceMappingURL=Reference.js.map