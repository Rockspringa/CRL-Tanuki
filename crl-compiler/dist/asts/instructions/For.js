"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
const AbstractTree_1 = require("../AbstractTree");
const CrlType_1 = require("../../types/CrlType");
class For {
    constructor(declaration, condition, increment, body) {
        this._executions = 0;
        this._declaration = declaration;
        this._condition = condition;
        this._increment = increment;
        this._body = body.filter((stmt) => stmt);
        this.rep = {
            type: "ControlStatement",
            represent: "Para",
            children: [
                this._declaration.rep,
                { type: "Condition", represent: "Expresion" },
                {
                    type: "Increment",
                    represent: increment ? "Incremento" : "Decremento",
                },
                {
                    type: "Body",
                    represent: "Cuerpo",
                    children: this._body.map((stmt) => stmt.rep),
                },
            ],
        };
    }
    execute() {
        AbstractTree_1.compileTools.scopeStack.push("SubAmbito_Para");
        this._declaration.execute();
        let _var;
        try {
            _var = AbstractTree_1.compileTools.symbolsTable.getSymbol(this._declaration._names[0], AbstractTree_1.compileTools.scopeStack.length);
        }
        catch (e) {
            (0, AbstractTree_1.addError)(this._declaration, e.message);
            AbstractTree_1.compileTools.scopeStack.pop();
            return;
        }
        this._condition.execute();
        if (!this._condition._value) {
            AbstractTree_1.compileTools.symbolsTable.removeScope(AbstractTree_1.compileTools.scopeStack.length);
            AbstractTree_1.compileTools.scopeStack.pop();
            return;
        }
        try {
            while (this._condition._value.castTo(0).value &&
                !this._break &&
                !this._return) {
                (0, AbstractTree_1.executeStatements)(this._body, this);
                _var.data = new CrlType_1.CrlInt(_var.data.value + (this._increment ? 1 : -2));
                this._condition.execute();
                this._executions++;
                if (this._executions > 5000) {
                    (0, AbstractTree_1.addError)(this._condition, "Limite de ejecuciones alcanzado, asegurese el ciclo se pueda romper.");
                    break;
                }
            }
        }
        catch (e) {
            (0, AbstractTree_1.addError)(this._condition, e.message);
        }
        this._break = undefined;
        this._continue = undefined;
        AbstractTree_1.compileTools.symbolsTable.removeScope(AbstractTree_1.compileTools.scopeStack.length);
        AbstractTree_1.compileTools.scopeStack.pop();
    }
}
exports.For = For;
//# sourceMappingURL=For.js.map