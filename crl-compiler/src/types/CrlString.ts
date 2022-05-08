import { CrlType, Type } from "./";

export class CrlString implements CrlType {
  readonly type = 4;
  readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  toString(): string {
    return this.value;
  }

  plus(other: CrlType): CrlType {
    return new CrlString(this.toString() + other.toString());
  }

  minus(other: CrlType): CrlType {
    throw new Error("No se pudieron convertir los valores al tipo necesario.");
  }

  times(other: CrlType): CrlType {
    throw new Error("No se pudieron convertir los valores al tipo necesario.");
  }

  divided(other: CrlType): CrlType {
    throw new Error("No se pudieron convertir los valores al tipo necesario.");
  }

  modulus(other: CrlType): CrlType {
    throw new Error("No se pudieron convertir los valores al tipo necesario.");
  }

  raisedTo(other: CrlType): CrlType {
    throw new Error("No se pudieron convertir los valores al tipo necesario.");
  }

  castTo(type: Type): CrlType {
    switch (type) {
      case 0:
        throw new Error("No se pudo castear de string a bool");
      case 1:
        throw new Error("No se pudo castear de string a char");
      case 2:
        throw new Error("No se pudo castear de string a int");
      case 3:
        throw new Error("No se pudo castear de string a double");
      case 4:
        return this;
      default:
        throw new Error("No se pudo castear de bool a desconocido");
    }
  }
}
