"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionCall = void 0;
const AbstractTree_1 = require("../AbstractTree");
const Reference_1 = require("./Reference");
const CrlType_1 = require("../../types/CrlType");
class FunctionCall {
    constructor(func, column, line) {
        this._column = column;
        this._func = func;
        this._line = line;
        this.rep = {
            type: "Funcion",
            represent: func.name,
        };
    }
    execute() {
        if (AbstractTree_1.compileTools.scopeStack.length > 1000) {
            return (0, AbstractTree_1.addError)(this, "Limite de ambito alcanzado, asegurese que la recursion tenga un limite.");
        }
        const values = [];
        const vars = [];
        AbstractTree_1.compileTools.scopeStack.push(`Funcion_${this._func.name}`);
        if (!FunctionCall.specialFunctions.includes(this._func.name) ||
            this._func.name === "Mostrar") {
            for (const _var of this._func.params) {
                _var.execute();
                if (!_var._value) {
                    AbstractTree_1.compileTools.scopeStack.pop();
                    return;
                }
                vars.push({ name: `${vars.length}`, type: _var._value.type });
                values.push(_var._value);
            }
        }
        if (FunctionCall.specialFunctions.includes(this._func.name)) {
            this.executeDefaultFunctions(this._func.name, values);
            AbstractTree_1.compileTools.scopeStack.pop();
            return;
        }
        const _func = AbstractTree_1.compileTools.functionsTable.getFunction(this._func.name, vars);
        const paramsJoined = vars
            .map((_var) => (0, AbstractTree_1.capitalize)(CrlType_1.Type[_var.type]))
            .join(", ");
        if (!_func || !_func.file) {
            (0, AbstractTree_1.addError)(this, `No se encontro la funcion ${this._func.name} con los parametros '${paramsJoined}'.`);
            AbstractTree_1.compileTools.scopeStack.pop();
            return;
        }
        this.addParamsToSymbolsTable(_func.params, values);
        AbstractTree_1.compileTools.executeFunction(_func.file, () => (0, AbstractTree_1.executeStatements)(_func.body, this));
        if (this._return) {
            if (!_func.type) {
                (0, AbstractTree_1.addError)(this, `La ${this._func.name} con los parametros '${paramsJoined}' es de tipo void pero retorna un valor.`);
            }
            else {
                try {
                    this._value = this._return.castTo(_func.type);
                }
                catch (e) {
                    if (!(e instanceof Error))
                        return;
                    (0, AbstractTree_1.addError)(this, e.message +
                        ` en el retorno de la funcion ${this._func.name} con los parametros '${paramsJoined}'.`);
                }
            }
        }
        else if (!this._return && _func.type) {
            (0, AbstractTree_1.addError)(this, `La ${this._func.name} con los parametros '${paramsJoined}' es de tipo ${CrlType_1.Type[_func.type]} pero no retorna ningun valor.`, 1);
        }
        AbstractTree_1.compileTools.symbolsTable.removeScope(AbstractTree_1.compileTools.scopeStack.length);
        AbstractTree_1.compileTools.scopeStack.pop();
    }
    executeDefaultFunctions(func, values) {
        switch (func) {
            case "Mostrar":
                if (!values.length) {
                    return (0, AbstractTree_1.addError)(this, "La funcion 'Mostrar' necesita, al menos, un parametro.");
                }
                let out = values[0].toString();
                for (let i = 1; i < values.length; i++) {
                    out = out.replace(`{${i - 1}}`, values[i].toString());
                }
                AbstractTree_1.compileTools.consoleOut.addMessage(out);
                break;
            case "DibujarAST":
                if (this._func.params.length === 1 &&
                    !(this._func.params[0] instanceof Reference_1.Reference)) {
                    return (0, AbstractTree_1.addError)(this, "La funcion 'DibujarAST' solo acepta un unico parametro de tipo id.");
                }
                const name = this._func.params[0]._name;
                const functions = AbstractTree_1.compileTools.functionsTable
                    .getFunctions(name)
                    .map((func) => {
                    const vars = func.params
                        .map((param) => CrlType_1.Type[param.type])
                        .join(", ");
                    return {
                        type: "Function",
                        represent: `${func.type ? CrlType_1.Type[func.type] : "Void"} : ${name}( ${vars} )`,
                        children: func.body.map((stmt) => stmt.rep),
                    };
                });
                AbstractTree_1.compileTools.graphsOut.addGraph({ functions, functionName: name });
                break;
            case "DibujarTS":
                AbstractTree_1.compileTools.scopeStack.pop();
                AbstractTree_1.compileTools.graphsOut.addGraph({
                    symbols: AbstractTree_1.compileTools.symbolsTable.getScope(AbstractTree_1.compileTools.scopeStack.length),
                    scopeName: AbstractTree_1.compileTools.getScopeName(),
                });
                AbstractTree_1.compileTools.scopeStack.push("Provisional");
                break;
            default:
                AbstractTree_1.compileTools.graphsOut.addGraph({
                    expression: this._func.params[0].rep,
                });
        }
    }
    addParamsToSymbolsTable(params, values) {
        for (let i = 0; i < params.length; i++) {
            try {
                AbstractTree_1.compileTools.symbolsTable.addSymbol({
                    scopeName: AbstractTree_1.compileTools.getScopeName(),
                    scope: AbstractTree_1.compileTools.scopeStack.length,
                    name: params[i].name,
                    line: this._func.params[i]._line,
                    column: this._func.params[i]._column,
                    data: values[i].castTo(params[i].type),
                });
            }
            catch (e) {
                (0, AbstractTree_1.addError)(this, e.message + " para el parametro " + params[i].name);
            }
        }
    }
}
exports.FunctionCall = FunctionCall;
FunctionCall.specialFunctions = [
    "Mostrar",
    "DibujarAST",
    "DibujarTS",
    "DibujarEXP",
];
//# sourceMappingURL=FunctionCall.js.map