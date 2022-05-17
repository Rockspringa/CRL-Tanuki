"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arithmetic = void 0;
const AbstractTree_1 = require("../AbstractTree");
var ArithmeticOperator;
(function (ArithmeticOperator) {
    ArithmeticOperator[ArithmeticOperator["PLUS"] = 0] = "PLUS";
    ArithmeticOperator[ArithmeticOperator["MINUS"] = 1] = "MINUS";
    ArithmeticOperator[ArithmeticOperator["TIMES"] = 2] = "TIMES";
    ArithmeticOperator[ArithmeticOperator["DIVIDED"] = 3] = "DIVIDED";
    ArithmeticOperator[ArithmeticOperator["MODULUS"] = 4] = "MODULUS";
    ArithmeticOperator[ArithmeticOperator["RAISED_TO"] = 5] = "RAISED_TO";
})(ArithmeticOperator || (ArithmeticOperator = {}));
class Arithmetic {
    constructor(num1, num2, operator, column, line) {
        this._column = column;
        this._operator = operator;
        this._line = line;
        this._val1 = num1;
        this._val2 = num2;
        this.rep = {
            type: "Aritmetica",
            represent: this.getSymbol(),
            children: [num1.rep, num2.rep],
        };
    }
    execute() {
        this._val1.execute();
        this._val2.execute();
        if (!(this._val1._value && this._val2._value))
            return;
        const num1 = this._val1._value;
        const num2 = this._val2._value;
        try {
            switch (this._operator) {
                case 0: // PLUS
                    this._value = num1.plus(num2);
                    this.rep.represent = "+";
                    break;
                case 1: // MINUS
                    this._value = num1.minus(num2);
                    this.rep.represent = "-";
                    break;
                case 2: // TIMES
                    this._value = num1.times(num2);
                    this.rep.represent = "*";
                    break;
                case 3: // DIVIDED
                    this._value = num1.divided(num2);
                    this.rep.represent = "/";
                    break;
                case 4: // MODULUS
                    this._value = num1.modulus(num2);
                    this.rep.represent = "%";
                    break;
                case 5: // RAISED_TO
                    this._value = num1.raisedTo(num2);
                    this.rep.represent = "^";
                    break;
            }
        }
        catch (e) {
            if (e instanceof Error) {
                (0, AbstractTree_1.addError)(this, e.message);
            }
        }
    }
    getSymbol() {
        switch (this._operator) {
            case 0: // PLUS
                return "+";
            case 1: // MINUS
                return "-";
            case 2: // TIMES
                return "*";
            case 3: // DIVIDED
                return "/";
            case 4: // MODULUS
                return "%";
            case 5: // RAISED_TO
                return "^";
            default:
                return " ";
        }
    }
}
exports.Arithmetic = Arithmetic;
//# sourceMappingURL=Arithmetic.js.map