import { readFile } from "fs";
const parseCrl = require("./parser/crl-parser").parse;

export const parseFile = (filepath: string) =>
  readFile(filepath, (err, data) => {
    if (err) throw err;
    parseCrl(data.toString().concat("\n").replace(/\s+$/, "\n"));
  });

export const parse = (code: string) => parseCrl(code.concat("\n").replace(/\s+$/, "\n"));
