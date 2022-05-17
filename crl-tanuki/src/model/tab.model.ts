import { CodeFile } from "@crl-rocks/crl-compiler";

export interface TabModel extends CodeFile {
  name: string;
  active: boolean;
  code: string;
}
