class CrlBool extends CrlNumber implements CrlType {
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
}
