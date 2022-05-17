"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logics = void 0;
const AbstractTree_1 = require("../AbstractTree");
const CrlType_1 = require("../../types/CrlType");
var LogicOperator;
(function (LogicOperator) {
    LogicOperator[LogicOperator["AND"] = 0] = "AND";
    LogicOperator[LogicOperator["OR"] = 1] = "OR";
    LogicOperator[LogicOperator["XOR"] = 2] = "XOR";
    LogicOperator[LogicOperator["NOT"] = 3] = "NOT";
})(LogicOperator || (LogicOperator = {}));
class Logics {
    constructor(val1, val2, operator, column, line) {
        this._column = column;
        this._operator = operator;
        this._line = line;
        this._val1 = val1;
        this._val2 = val2;
        this.rep = {
            type: "Logica",
            represent: this.getSymbol(),
            children: this.getSymbol() !== "!" ? [val1.rep, val2.rep] : [val2.rep],
        };
    }
    execute() {
        this._val1.execute();
        this._val2.execute();
        if (!(this._val1._value && this._val2._value))
            return;
        if (!(this._val1._value instanceof CrlType_1.CrlBool)) {
            return AbstractTree_1.compileTools.errorsTable.addError({
                message: "Se esperaba una expresion booleana a la izquiera del operador logico.",
                column: this._column,
                line: this._line,
                type: 2,
            });
        }
        else if (!(this._val2._value instanceof CrlType_1.CrlBool)) {
            return AbstractTree_1.compileTools.errorsTable.addError({
                message: "Se esperaba una expresion booleana a la derecha del operador logico.",
                column: this._column,
                line: this._line,
                type: 2,
            });
        }
        const val1 = this._val1._value;
        const val2 = this._val2._value;
        switch (this._operator) {
            case 0: // AND
                this._value = new CrlType_1.CrlBool(val1.value && val2.value);
                break;
            case 1: // OR
                this._value = new CrlType_1.CrlBool(val1.value || val2.value);
                break;
            case 2: // XOR
                this._value = new CrlType_1.CrlBool(+(val1.value != val2.value));
                break;
            case 3: // NOT
                this._value = new CrlType_1.CrlBool(+(val1.value === val2.value));
                break;
        }
    }
    getSymbol() {
        switch (this._operator) {
            case 0: // AND
                return "&&";
            case 1: // OR
                return "||";
            case 2: // XOR
                return "|&";
            case 3: // NOT
                return "!";
            default:
                return " ";
        }
    }
}
exports.Logics = Logics;
//# sourceMappingURL=Logics.js.map