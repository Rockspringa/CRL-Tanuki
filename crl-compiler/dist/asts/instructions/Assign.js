"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assign = void 0;
const AbstractTree_1 = require("../AbstractTree");
class Assign {
    constructor(name, value, column, line) {
        this.rep = {
            type: "Statement",
            represent: "Asignacion",
            children: [
                { type: "ID", represent: "ID" },
                { type: "Statement", represent: "Expression" },
            ],
        };
        this._name = name;
        this._value = value;
        this._column = column;
        this._line = line;
    }
    execute() {
        this._value.execute();
        if (!this._value._value)
            return;
        try {
            const _symbol = AbstractTree_1.compileTools.symbolsTable.getSymbol(this._name, AbstractTree_1.compileTools.scopeStack.length);
            _symbol.data = this._value._value.castTo(_symbol.data.type);
        }
        catch (e) {
            (0, AbstractTree_1.addError)(this._value, e.message);
        }
    }
}
exports.Assign = Assign;
//# sourceMappingURL=Assign.js.map