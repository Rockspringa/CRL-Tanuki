class CrlChar extends CrlInt {
  private readonly char: string;

  constructor(value: string) {
    super(value.charCodeAt(0));
    this.char = value;
  }

  toString(): string {
    return this.char;
  }

  plus(other: CrlType): CrlType {
    if (other instanceof CrlBool)
      throw new Error(
        "No se pudieron convertir los valores al tipo necesario."
      );
    return super.plus(other);
  }

  minus(other: CrlType): CrlType {
    if (other instanceof CrlBool)
      throw new Error(
        "No se pudieron convertir los valores al tipo necesario."
      );
    return super.minus(other);
  }

  times(other: CrlType): CrlType {
    if (other instanceof CrlBool)
      throw new Error(
        "No se pudieron convertir los valores al tipo necesario."
      );
    return super.times(other);
  }

  divided(other: CrlType): CrlType {
    if (other instanceof CrlBool)
      throw new Error(
        "No se pudieron convertir los valores al tipo necesario."
      );
    return super.divided(other);
  }

  modulus(other: CrlType): CrlType {
    if (other instanceof CrlBool)
      throw new Error(
        "No se pudieron convertir los valores al tipo necesario."
      );
    return super.modulus(other);
  }

  raisedTo(other: CrlType): CrlType {
    if (other instanceof CrlNumber && !(other instanceof CrlBool)) {
      return new CrlDouble(this.value ** other.value);
    }
    throw new Error("No se pudieron convertir los valores al tipo necesario.");
  }
}