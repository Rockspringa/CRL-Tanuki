import { parse } from "./crl-globals";
import { readFileSync } from "fs";

let file1 = readFileSync("./tests/uno.crl").toString();
let file2 = readFileSync("./tests/aritmeticas.crl").toString();

parse("uno.crl", file1, [{ name: "aritmeticas.crl", code: file2 }]);

