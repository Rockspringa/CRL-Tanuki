import { RepresentTree, Statement } from "../AbstractTree";

export class Break implements Statement {
  readonly _break: boolean = true;
  readonly rep: RepresentTree = {
    type: "Statement",
    represent: "Break",
  };

  execute(): void {}
}
