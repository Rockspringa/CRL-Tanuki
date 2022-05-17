"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Value = void 0;
const AbstractTree_1 = require("../AbstractTree");
const CrlType_1 = require("../../types/CrlType");
const CrlType_2 = require("../../types/CrlType");
class Value {
    constructor(value, type, column, line) {
        this._column = column;
        this._value = value;
        this._line = line;
        this.rep = {
            type: (0, AbstractTree_1.capitalize)(CrlType_1.Type[type]),
            represent: value instanceof CrlType_2.CrlBool
                ? value.value
                    ? "true"
                    : "false"
                : value.toString(),
        };
    }
    execute() { }
}
exports.Value = Value;
//# sourceMappingURL=Value.js.map