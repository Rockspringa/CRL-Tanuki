import { RepresentTree, Statement } from "../AbstractTree";

export class Continue implements Statement {
  readonly rep: RepresentTree = {
    type: "Statement",
    represent: "Continuar",
  };

  execute(): void {}
}
