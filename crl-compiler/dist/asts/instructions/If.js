"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.If = void 0;
const AbstractTree_1 = require("../AbstractTree");
class If {
    constructor(condition, body, elseBody) {
        var _a;
        this._executions = 0;
        this._condition = condition;
        this._body = body.filter(stmt => stmt);
        this._elseBody = elseBody === null || elseBody === void 0 ? void 0 : elseBody.filter(stmt => stmt);
        this.rep = {
            type: "ControlStatement",
            represent: "Si",
            children: [
                { type: "Condition", represent: "Expresion" },
                {
                    type: "Body",
                    represent: "Cuerpo",
                    children: this._body.map((instruct) => instruct.rep),
                },
            ],
        };
        if (this._elseBody) {
            (_a = this.rep.children) === null || _a === void 0 ? void 0 : _a.push({
                type: "Statement",
                represent: "Sino",
                children: [
                    {
                        type: "Body",
                        represent: "Cuerpo",
                        children: this._elseBody.map((instruct) => instruct.rep),
                    },
                ],
            });
        }
    }
    execute() {
        AbstractTree_1.compileTools.scopeStack.push("SubAmbito_Si");
        this._condition.execute();
        if (this._condition._value) {
            try {
                const condition = this._condition._value.castTo(0);
                if (condition.value) {
                    (0, AbstractTree_1.executeStatements)(this._body, this);
                }
                else if (this._elseBody) {
                    AbstractTree_1.compileTools.scopeStack.pop();
                    AbstractTree_1.compileTools.scopeStack.push("SubAmbito_Sino");
                    (0, AbstractTree_1.executeStatements)(this._elseBody, this);
                }
                AbstractTree_1.compileTools.symbolsTable.removeScope(AbstractTree_1.compileTools.scopeStack.length);
            }
            catch (e) {
                (0, AbstractTree_1.addError)(this._condition, e.message);
            }
        }
        AbstractTree_1.compileTools.scopeStack.pop();
    }
}
exports.If = If;
//# sourceMappingURL=If.js.map