"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declare = void 0;
const AbstractTree_1 = require("../AbstractTree");
const CrlType_1 = require("../../types/CrlType");
const CrlType_2 = require("../../types/CrlType");
const CrlType_3 = require("../../types/CrlType");
const CrlType_4 = require("../../types/CrlType");
const CrlType_5 = require("../../types/CrlType");
class Declare {
    constructor(_var, column, line) {
        var _a;
        this._type = _var.type;
        this._names = _var.names;
        this._value = _var.value;
        this._column = column;
        this._line = line;
        this.rep = {
            type: "Statement",
            represent: "Declaracion",
            children: [
                {
                    type: "IDs",
                    represent: "Lista IDs",
                    children: _var.names.map(() => ({ type: "ID", represent: "ID" })),
                },
            ],
        };
        if (_var.value)
            (_a = this.rep.children) === null || _a === void 0 ? void 0 : _a.push({ type: "Statement", represent: "Expression" });
    }
    execute() {
        var _a, _b;
        (_a = this._value) === null || _a === void 0 ? void 0 : _a.execute();
        if (this._value && !this._value._value) {
            return;
        }
        const _val = ((_b = this._value) === null || _b === void 0 ? void 0 : _b._value) || this.getDefaultValue();
        let data;
        try {
            data = _val.castTo(this._type);
        }
        catch (e) {
            if (this._value)
                (0, AbstractTree_1.addError)(this._value, e.message);
            return;
        }
        for (const name of this._names) {
            try {
                AbstractTree_1.compileTools.symbolsTable.addSymbol({
                    scopeName: AbstractTree_1.compileTools.getScopeName(),
                    column: this._column,
                    scope: AbstractTree_1.compileTools.scopeStack.length,
                    line: this._line,
                    data,
                    name,
                });
            }
            catch (e) {
                (0, AbstractTree_1.addError)(this, e.message);
            }
        }
    }
    getDefaultValue() {
        switch (this._type) {
            case 0:
                return new CrlType_4.CrlBool(0);
            case 1:
                return new CrlType_3.CrlChar(String.fromCharCode(0));
            case 2:
                return new CrlType_5.CrlInt(0);
            case 3:
                return new CrlType_1.CrlDouble(0);
            default:
                return new CrlType_2.CrlString("");
        }
    }
}
exports.Declare = Declare;
//# sourceMappingURL=Declare.js.map