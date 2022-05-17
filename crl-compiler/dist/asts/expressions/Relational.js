"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relational = void 0;
const AbstractTree_1 = require("../AbstractTree");
const CrlType_1 = require("../../types/CrlType");
const CrlType_2 = require("../../types/CrlType");
var RelationalOperator;
(function (RelationalOperator) {
    RelationalOperator[RelationalOperator["EQUAL"] = 0] = "EQUAL";
    RelationalOperator[RelationalOperator["DIFFERENT"] = 1] = "DIFFERENT";
    RelationalOperator[RelationalOperator["LESS"] = 2] = "LESS";
    RelationalOperator[RelationalOperator["LESS_EQUAL"] = 3] = "LESS_EQUAL";
    RelationalOperator[RelationalOperator["GREATER"] = 4] = "GREATER";
    RelationalOperator[RelationalOperator["GREATER_EQUAL"] = 5] = "GREATER_EQUAL";
    RelationalOperator[RelationalOperator["UNCERTAINTY"] = 6] = "UNCERTAINTY";
})(RelationalOperator || (RelationalOperator = {}));
class Relational {
    constructor(val1, val2, operator, column, line) {
        this._operator = operator;
        this._column = column;
        this._line = line;
        this._val1 = val1;
        this._val2 = val2;
        this.rep = {
            type: "Relacional",
            represent: this._getSymbol(),
            children: [val1.rep, val2.rep],
        };
    }
    execute() {
        this._val1.execute();
        this._val2.execute();
        if (!(this._val1._value && this._val2._value))
            return;
        if (this._val1._value.constructor !== this._val2._value.constructor) {
            return AbstractTree_1.compileTools.errorsTable.addError({
                message: "No se pueden comparar las expresiones porque son de diferente tipo.",
                column: this._column,
                line: this._line,
                type: 2,
            });
        }
        const val1 = this._val1._value instanceof CrlType_1.CrlNumber
            ? this._val1._value.value
            : this._val1._value.toString();
        const val2 = this._val2._value instanceof CrlType_1.CrlNumber
            ? this._val2._value.value
            : this._val2._value.toString();
        switch (this._operator) {
            case 0: // EQUAL
                this._value = new CrlType_2.CrlBool(+(val1 === val2));
                break;
            case 1: // DIFFERENT
                this._value = new CrlType_2.CrlBool(+(val1 !== val2));
                break;
            case 2: // LESS
                this._value = new CrlType_2.CrlBool(+(val1 < val2));
                break;
            case 3: // LESS_EQUAL
                this._value = new CrlType_2.CrlBool(+(val1 <= val2));
                break;
            case 4: // GREATER
                this._value = new CrlType_2.CrlBool(+(val1 > val2));
                break;
            case 5: // GREATER_EQUAL
                this._value = new CrlType_2.CrlBool(+(val1 >= val2));
                break;
            case 6: // UNCERTAINTY
                if (typeof val1 === "number" && typeof val2 === "number") {
                    this._value = new CrlType_2.CrlBool(+(Math.abs(val2 - val1) <=
                        +AbstractTree_1.compileTools.symbolsTable
                            .getSymbol(`__inc_${AbstractTree_1.compileTools.filename}`, 0)
                            .data.toString()));
                }
                else if (typeof val1 === "string" && typeof val2 === "string") {
                    this._value = new CrlType_2.CrlBool(+(val1.trim().localeCompare(val2.trim(), undefined, {
                        sensitivity: "accent",
                    }) === 0));
                }
                break;
        }
    }
    _getSymbol() {
        switch (this._operator) {
            case 0: // EQUAL
                return "==";
            case 1: // DIFFERENT
                return "!=";
            case 2: // LESS
                return "<";
            case 3: // LESS_EQUAL
                return "<=";
            case 4: // GREATER
                return ">";
            case 5: // GREATER_EQUAL
                return ">=";
            case 6: // UNCERTAINTY
                return "~";
            default:
                return " ";
        }
    }
}
exports.Relational = Relational;
//# sourceMappingURL=Relational.js.map