interface CrlType {
  toString(): string;

  plus(other: CrlType): CrlType;

  minus(other: CrlType): CrlType;

  times(other: CrlType): CrlType;

  divided(other: CrlType): CrlType;

  modulus(other: CrlType): CrlType;

  raisedTo(other: CrlType): CrlType;
}

class CrlNumber {
  readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  toString(): string {
    return `${this.value}`;
  }
}

enum Type {
  BOOL,
  CHAR,
  DOUBLE,
  INT,
  STRING,
}
