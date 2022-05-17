"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toolsBundle = void 0;
const CrlType_1 = require("./types/CrlType");
const Break_1 = require("./asts/instructions/Break");
const Logics_1 = require("./asts/expressions/Logics");
const Continue_1 = require("./asts/instructions/Continue");
const FunctionCall_1 = require("./asts/expressions/FunctionCall");
const CrlType_2 = require("./types/CrlType");
const Return_1 = require("./asts/instructions/Return");
const CrlType_3 = require("./types/CrlType");
const Reference_1 = require("./asts/expressions/Reference");
const CrlType_4 = require("./types/CrlType");
const Relational_1 = require("./asts/expressions/Relational");
const For_1 = require("./asts/instructions/For");
const While_1 = require("./asts/instructions/While");
const Declare_1 = require("./asts/instructions/Declare");
const CrlType_5 = require("./types/CrlType");
const Value_1 = require("./asts/expressions/Value");
const Assign_1 = require("./asts/instructions/Assign");
const If_1 = require("./asts/instructions/If");
const CrlType_6 = require("./types/CrlType");
const Arithmetic_1 = require("./asts/expressions/Arithmetic");
const toolsBundle = (compileInfo, parseImport) => ({
    compileInfo,
    parseImport,
    indents: [0],
    dedents: [],
    eof: false,
    CrlBool: CrlType_2.CrlBool,
    CrlChar: CrlType_4.CrlChar,
    CrlDouble: CrlType_1.CrlDouble,
    CrlInt: CrlType_6.CrlInt,
    CrlString: CrlType_3.CrlString,
    Type: CrlType_5.Type,
    Arithmetic: Arithmetic_1.Arithmetic,
    FunctionCall: FunctionCall_1.FunctionCall,
    Logics: Logics_1.Logics,
    Reference: Reference_1.Reference,
    Relational: Relational_1.Relational,
    Value: Value_1.Value,
    Assign: Assign_1.Assign,
    Break: Break_1.Break,
    Continue: Continue_1.Continue,
    Declare: Declare_1.Declare,
    For: For_1.For,
    If: If_1.If,
    Return: Return_1.Return,
    While: While_1.While,
});
exports.toolsBundle = toolsBundle;
//# sourceMappingURL=crl-configs.js.map