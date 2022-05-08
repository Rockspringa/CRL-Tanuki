import { CrlChar, CrlDouble, CrlNumber, CrlString, CrlType, Type } from "./";

export class CrlInt extends CrlNumber implements CrlType {
  readonly type;

  constructor(value: number) {
    super(value | 0);
    this.type = 3;
  }

  plus(other: CrlType): CrlType {
    if (other instanceof CrlDouble) {
      return new CrlDouble(this.value + other.value);
    } else if (other instanceof CrlString) {
      return new CrlString(this.toString() + other.toString());
    } else if (other instanceof CrlNumber) {
      return new CrlDouble(this.value + other.value);
    }
    throw new Error("No se pudieron convertir los valores al tipo necesario.");
  }

  minus(other: CrlType): CrlType {
    if (other instanceof CrlDouble) {
      return new CrlDouble(this.value - other.value);
    } else if (other instanceof CrlNumber) {
      return new CrlDouble(this.value - other.value);
    }
    throw new Error("No se pudieron convertir los valores al tipo necesario.");
  }

  times(other: CrlType): CrlType {
    if (other instanceof CrlDouble) {
      return new CrlDouble(this.value * other.value);
    } else if (other instanceof CrlNumber) {
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
      if (other instanceof CrlInt || other instanceof CrlChar)
        return new CrlInt(this.value ** other.value);
      return new CrlDouble(this.value ** other.value);
    }
    throw new Error("No se pudieron convertir los valores al tipo necesario.");
  }

  castTo(type: Type): CrlType {
    switch (type) {
      case 0:
        throw new Error("No se pudo castear de int a bool");
      case 1:
        return new CrlChar(String.fromCharCode(this.value));
      case 2:
        return this;
      case 3:
        return new CrlDouble(this.value);
      case 4:
        return new CrlString(this.toString());
      default:
        throw new Error("No se pudo castear de bool a desconocido");
    }
  }
}
