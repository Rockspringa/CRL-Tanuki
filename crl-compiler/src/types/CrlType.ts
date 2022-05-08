export interface CrlType {
  readonly type: Type;

  toString(): string;

  plus(other: CrlType): CrlType;

  minus(other: CrlType): CrlType;

  times(other: CrlType): CrlType;

  divided(other: CrlType): CrlType;

  modulus(other: CrlType): CrlType;

  raisedTo(other: CrlType): CrlType;

  castTo(type: Type): CrlType;
}

export class CrlNumber {
  readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  toString(): string {
    return `${this.value}`;
  }
}

export enum Type {
  BOOL,
  CHAR,
  INT,
  DOUBLE,
  STRING,
}
