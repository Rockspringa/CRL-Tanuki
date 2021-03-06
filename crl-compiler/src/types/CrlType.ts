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

// CrlBool.ts
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

// CrlDouble.ts
export class CrlDouble extends CrlNumber implements CrlType {
  readonly type: Type = 3;
  private readonly rep: string;

  constructor(value: number) {
    super(value);
    this.rep = Number.isInteger(value) ? value.toFixed(1) : `${value}`;
  }

  override toString(): string {
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

// CrlInt.ts
export class CrlInt extends CrlNumber implements CrlType {
  readonly type: Type;

  constructor(value: number) {
    super(value | 0);
    this.type = 2;
  }

  plus(other: CrlType): CrlType {
    if (other.type === 3 && other instanceof CrlNumber) {
      return new CrlDouble(this.value + other.value);
    } else if (other.type === 4) {
      return new CrlString(this.toString() + other.toString());
    } else if (other instanceof CrlNumber) {
      return new CrlDouble(this.value + other.value);
    }
    throw new Error("No se pudieron convertir los valores al tipo necesario.");
  }

  minus(other: CrlType): CrlType {
    if (other.type === 3 && other instanceof CrlNumber) {
      return new CrlDouble(this.value - other.value);
    } else if (other instanceof CrlNumber) {
      return new CrlDouble(this.value - other.value);
    }
    throw new Error("No se pudieron convertir los valores al tipo necesario.");
  }

  times(other: CrlType): CrlType {
    if (other.type === 3 && other instanceof CrlNumber) {
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

// CrlString
export class CrlString implements CrlType {
  readonly type: Type = 4;
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

// CrlChar.ts
export class CrlChar extends CrlInt {
  override readonly type: Type = 1;

  private readonly char: string;

  constructor(value: string) {
    super(value.charCodeAt(0));
    this.char = value;
  }

  override toString(): string {
    return this.char;
  }

  override plus(other: CrlType): CrlType {
    if (other instanceof CrlBool)
      throw new Error(
        "No se pudieron convertir los valores al tipo necesario."
      );
    return super.plus(other);
  }

  override minus(other: CrlType): CrlType {
    if (other instanceof CrlBool)
      throw new Error(
        "No se pudieron convertir los valores al tipo necesario."
      );
    return super.minus(other);
  }

  override times(other: CrlType): CrlType {
    if (other instanceof CrlBool)
      throw new Error(
        "No se pudieron convertir los valores al tipo necesario."
      );
    return super.times(other);
  }

  override divided(other: CrlType): CrlType {
    if (other instanceof CrlBool)
      throw new Error(
        "No se pudieron convertir los valores al tipo necesario."
      );
    return super.divided(other);
  }

  override modulus(other: CrlType): CrlType {
    if (other instanceof CrlBool)
      throw new Error(
        "No se pudieron convertir los valores al tipo necesario."
      );
    return super.modulus(other);
  }

  override raisedTo(other: CrlType): CrlType {
    if (other instanceof CrlNumber && !(other instanceof CrlBool)) {
      return new CrlDouble(this.value ** other.value);
    }
    throw new Error("No se pudieron convertir los valores al tipo necesario.");
  }

  override castTo(type: Type): CrlType {
    switch (type) {
      case 0:
        throw new Error("No se pudo castear de char a bool");
      case 1:
        return this;
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
