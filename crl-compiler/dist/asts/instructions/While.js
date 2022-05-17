"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.While = void 0;
const AbstractTree_1 = require("../AbstractTree");
class While {
    constructor(condition, body) {
        this._executions = 0;
        this._condition = condition;
        this._body = body.filter(stmt => stmt);
        this.rep = {
            type: "ControlStatement",
            represent: "Mientras",
            children: [
                { type: "Condition", represent: "Expresion" },
                {
                    type: "Body",
                    represent: "Cuerpo",
                    children: this._body.map((stmt) => stmt.rep),
                },
            ],
        };
    }
    execute() {
        AbstractTree_1.compileTools.scopeStack.push("SubAmbito_Mientras");
        this._condition.execute();
        if (!this._condition._value) {
            AbstractTree_1.compileTools.scopeStack.pop();
            return;
        }
        try {
            while (this._condition._value.castTo(0).value &&
                !this._break &&
                !this._return) {
                (0, AbstractTree_1.executeStatements)(this._body, this);
                this._condition.execute();
                this._executions++;
                if (this._executions > 1000) {
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
exports.While = While;
//# sourceMappingURL=While.js.map