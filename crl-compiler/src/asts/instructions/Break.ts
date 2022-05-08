import { RepresentTree, Statement } from "../AbstractTree";

export class Break implements Statement {
  readonly rep: RepresentTree = {
    type: "Statement",
    represent: "Break",
  };

  execute(): void {}
}
