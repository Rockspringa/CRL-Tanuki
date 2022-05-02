export interface AbstractTree {
  rep: RepresentTree;

  execute(): void;
}

export interface RepresentTree {
  type: string;
  represent: string;
  children?: [];
}

export interface Expression extends AbstractTree {
  _value?: CrlType;
}
