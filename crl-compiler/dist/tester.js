"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const crl_compiler_1 = require("./crl-compiler");
let file1 = (0, fs_1.readFileSync)("./tests/uno.crl").toString();
let file2 = (0, fs_1.readFileSync)("./tests/aritmeticas.crl").toString();
console.log(JSON.stringify((0, crl_compiler_1.parse)("uno.crl", file1, [{ name: "aritmeticas.crl", code: file2 }, { name: "uno.crl", code: file1 }]), null, 2));
//# sourceMappingURL=tester.js.map