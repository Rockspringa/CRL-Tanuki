"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionsTable = void 0;
class FunctionsTable {
    constructor(_addError, _getFilename) {
        this.functions = [];
        this.addError = _addError;
        this.getFilename = _getFilename;
    }
    getFunctions(name) {
        return this.functions.filter((func) => func.name === name);
    }
    getFunction(name, params) {
        return this.functions.find((func) => {
            if (func.name === name && func.params.length === params.length) {
                for (let i = 0; i < params.length; i++) {
                    if (params[i].type !== func.params[i].type)
                        return false;
                }
                return true;
            }
            return false;
        });
    }
    addFunction(data, column, line) {
        if (this.getFunction(data.name, [...data.params])) {
            return this.addError({
                message: `La funcion '${data.name}' no se pudo sobrecargar porque ya existe.`,
                column,
                line,
                type: 2,
            });
        }
        if (data.name in ["Mostrar", "DibujarTS", "DibujarAST", "DibujarEXP"]) {
            return this.addError({
                message: `La funcion '${data.name}' no se pudo sobrecargar porque tiene el mismo nombre que las funciones por defecto.`,
                column,
                line,
                type: 2,
            });
        }
        // if (
        //   data.type &&
        //   !data.body.find()
        // ) {
        //   return errorsTable.addError({
        //     message: `La funcion ${data.name} se declaro con un tipo pero nunca se retorna ningun valor.`,
        //     column,
        //     line,
        //     type: 2,
        //   });
        // }
        data.file = this.getFilename();
        data.body = data.body.filter(stmt => stmt);
        this.functions.push(data);
    }
}
exports.FunctionsTable = FunctionsTable;
//# sourceMappingURL=executable-functions.js.map