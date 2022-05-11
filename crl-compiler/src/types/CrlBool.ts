import {
  CrlChar,
  CrlDouble,
  CrlInt,
  CrlNumber,
  CrlString,
  CrlType,
  Type,
} from "./";

export class CrlBool extends CrlNumber implements CrlType {
  readonly type: Type = 0;

  plus(other: CrlType): CrlType {
    if (other instanceof CrlInt) {
      return new CrlInt(this.value + other.value);
    } else if (other instanceof CrlString) {
      return new CrlString(this.toString() + other.toString());
    } else if (other instanceof CrlNumber && !(other instanceof CrlChar)) {
      return new CrlDouble(this.value + other.value);
    }
    throw new Error("No se pudieron convertir los valores al tipo necesario.");
  }

  minus(other: CrlType): CrlType {
    if (other instanceof CrlInt) {
      return new CrlInt(this.value - other.value);
    } else if (other instanceof CrlDouble) {
      return new CrlDouble(this.value - other.value);
    }
    throw new Error("No se pudieron convertir los valores al tipo necesario.");
  }

  times(other: CrlType): CrlType {
    if (other instanceof CrlInt) {
      return new CrlInt(this.value * other.value);
    } else if (other instanceof CrlDouble) {
      return new CrlDouble(this.value * other.value);
    }
    throw new Error("No se pudieron convertir los valores al tipo necesario.");
  }

  divided(other: CrlType): CrlType {
    if (other instanceof CrlInt || other instanceof CrlDouble) {
      return new CrlDouble(this.value / other.value);
    }
    throw new Error("No se pudieron convertir los valores al tipo necesario.");
  }

  modulus(other: CrlType): CrlType {
    if (other instanceof CrlInt || other instanceof CrlDouble) {
      return new CrlDouble(this.value % other.value);
    }
    throw new Error("No se pudieron convertir los valores al tipo necesario.");
  }

  raisedTo(other: CrlType): CrlType {
    if (other instanceof CrlInt || other instanceof CrlDouble) {
      return new CrlDouble(this.value ** other.value);
    }
    throw new Error("No se pudieron convertir los valores al tipo necesario.");
  }

  castTo(type: Type): CrlType {
    switch (type) {
      case 0:
        return this;
      case 1:
        throw new Error("No se pudo castear de bool a char");
      case 2:
        return new CrlInt(this.value);
      case 3:
        return new CrlDouble(this.value);
      case 4:
        return new CrlString(this.toString());
      default:
        throw new Error("No se pudo castear de bool a desconocido");
    }
  }
}
