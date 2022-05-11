import { CrlInt, CrlNumber, CrlString, CrlType, Type } from "./";

export class CrlDouble extends CrlNumber implements CrlType {
  readonly type: Type = 3;
  private readonly rep: string;

  constructor(value: number) {
    super(value);
    this.rep = Number.isInteger(value) ? value.toFixed(1) : `${value}`;
  }

  toString(): string {
    return this.rep;
  }

  plus(other: CrlType): CrlType {
    if (other instanceof CrlString) {
      return new CrlString(this.toString() + other.toString());
    } else if (other instanceof CrlNumber) {
      return new CrlDouble(this.value + other.value);
    }
    throw new Error("No se pudieron convertir los valores al tipo necesario.");
  }

  minus(other: CrlType): CrlType {
    if (other instanceof CrlNumber) {
      return new CrlDouble(this.value - other.value);
    }
    throw new Error("No se pudieron convertir los valores al tipo necesario.");
  }

  times(other: CrlType): CrlType {
    if (other instanceof CrlNumber) {
      return new CrlDouble(this.value * other.value);
    }
    throw new Error("No se pudieron convertir los valores al tipo necesario.");
  }

  divided(other: CrlType): CrlType {
    if (other instanceof CrlNumber) {
      return new CrlDouble(this.value / other.value);
    }
    throw new Error("No se pudieron convertir los valores al tipo necesario.");
  }

  modulus(other: CrlType): CrlType {
    if (other instanceof CrlNumber) {
      return new CrlDouble(this.value % other.value);
    }
    throw new Error("No se pudieron convertir los valores al tipo necesario.");
  }

  raisedTo(other: CrlType): CrlType {
    if (other instanceof CrlNumber) {
      return new CrlDouble(this.value ** other.value);
    }
    throw new Error("No se pudieron convertir los valores al tipo necesario.");
  }

  castTo(type: Type): CrlType {
    switch (type) {
      case 0:
        throw new Error("No se pudo castear de double a bool");
      case 1:
        throw new Error("No se pudo castear de double a char");
      case 2:
        return new CrlInt(this.value);
      case 3:
        return this;
      case 4:
        return new CrlString(this.toString());
      default:
        throw new Error("No se pudo castear de bool a desconocido");
    }
  }
}
