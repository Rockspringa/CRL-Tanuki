"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = void 0;
class Return {
    constructor(value) {
        this.__return = true;
        this._value = value;
        this.rep = {
            type: "Statement",
            represent: "Retorno",
        };
        if (value) {
            this.rep.children = [{ type: "Statement", represent: "Expression" }];
        }
    }
    execute() {
        var _a, _b;
        (_a = this._value) === null || _a === void 0 ? void 0 : _a.execute();
        if (!((_b = this._value) === null || _b === void 0 ? void 0 : _b._value))
            return;
        this._return = this._value._value;
    }
}
exports.Return = Return;
//# sourceMappingURL=Return.js.map