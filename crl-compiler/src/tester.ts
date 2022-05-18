import {readFileSync} from "fs";
import {parse} from "./crl-compiler";

let file1 = readFileSync("./tests/uno.crl").toString();
let file2 = readFileSync("./tests/aritmeticas.crl").toString();

console.log(
  JSON.stringify(
    parse("uno.crl", file1, [{name: "aritmeticas.crl", code: file2}, {name: "uno.crl", code: file1}]),
    null,
    2
  )
);