"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrlChar = exports.CrlString = exports.CrlInt = exports.CrlDouble = exports.CrlBool = exports.Type = exports.CrlNumber = void 0;
class CrlNumber {
    constructor(value) {
        this.value = value;
    }
    toString() {
        return `${this.value}`;
    }
}
exports.CrlNumber = CrlNumber;
var Type;
(function (Type) {
    Type[Type["BOOL"] = 0] = "BOOL";
    Type[Type["CHAR"] = 1] = "CHAR";
    Type[Type["INT"] = 2] = "INT";
    Type[Type["DOUBLE"] = 3] = "DOUBLE";
    Type[Type["STRING"] = 4] = "STRING";
})(Type = exports.Type || (exports.Type = {}));
// CrlBool.ts
class CrlBool extends CrlNumber {
    constructor() {
        super(...arguments);
        this.type = 0;
    }
    plus(other) {
        if (other instanceof CrlInt) {
            return new CrlInt(this.value + other.value);
        }
        else if (other instanceof CrlString) {
            return new CrlString(this.toString() + other.toString());
        }
        else if (other instanceof CrlNumber && !(other instanceof CrlChar)) {
            return new CrlDouble(this.value + other.value);
        }
        throw new Error("No se pudieron convertir los valores al tipo necesario.");
    }
    minus(other) {
        if (other instanceof CrlInt) {
            return new CrlInt(this.value - other.value);
        }
        else if (other instanceof CrlDouble) {
            return new CrlDouble(this.value - other.value);
        }
        throw new Error("No se pudieron convertir los valores al tipo necesario.");
    }
    times(other) {
        if (other instanceof CrlInt) {
            return new CrlInt(this.value * other.value);
        }
        else if (other instanceof CrlDouble) {
            return new CrlDouble(this.value * other.value);
        }
        throw new Error("No se pudieron convertir los valores al tipo necesario.");
    }
    divided(other) {
        if (other instanceof CrlInt || other instanceof CrlDouble) {
            return new CrlDouble(this.value / other.value);
        }
        throw new Error("No se pudieron convertir los valores al tipo necesario.");
    }
    modulus(other) {
        if (other instanceof CrlInt || other instanceof CrlDouble) {
            return new CrlDouble(this.value % other.value);
        }
        throw new Error("No se pudieron convertir los valores al tipo necesario.");
    }
    raisedTo(other) {
        if (other instanceof CrlInt || other instanceof CrlDouble) {
            return new CrlDouble(this.value ** other.value);
        }
        throw new Error("No se pudieron convertir los valores al tipo necesario.");
    }
    castTo(type) {
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
exports.CrlBool = CrlBool;
// CrlDouble.ts
class CrlDouble extends CrlNumber {
    constructor(value) {
        super(value);
        this.type = 3;
        this.rep = Number.isInteger(value) ? value.toFixed(1) : `${value}`;
    }
    toString() {
        return this.rep;
    }
    plus(other) {
        if (other instanceof CrlString) {
            return new CrlString(this.toString() + other.toString());
        }
        else if (other instanceof CrlNumber) {
            return new CrlDouble(this.value + other.value);
        }
        throw new Error("No se pudieron convertir los valores al tipo necesario.");
    }
    minus(other) {
        if (other instanceof CrlNumber) {
            return new CrlDouble(this.value - other.value);
        }
        throw new Error("No se pudieron convertir los valores al tipo necesario.");
    }
    times(other) {
        if (other instanceof CrlNumber) {
            return new CrlDouble(this.value * other.value);
        }
        throw new Error("No se pudieron convertir los valores al tipo necesario.");
    }
    divided(other) {
        if (other instanceof CrlNumber) {
            return new CrlDouble(this.value / other.value);
        }
        throw new Error("No se pudieron convertir los valores al tipo necesario.");
    }
    modulus(other) {
        if (other instanceof CrlNumber) {
            return new CrlDouble(this.value % other.value);
        }
        throw new Error("No se pudieron convertir los valores al tipo necesario.");
    }
    raisedTo(other) {
        if (other instanceof CrlNumber) {
            return new CrlDouble(this.value ** other.value);
        }
        throw new Error("No se pudieron convertir los valores al tipo necesario.");
    }
    castTo(type) {
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
exports.CrlDouble = CrlDouble;
// CrlInt.ts
class CrlInt extends CrlNumber {
    constructor(value) {
        super(value | 0);
        this.type = 2;
    }
    plus(other) {
        if (other.type === 3 && other instanceof CrlNumber) {
            return new CrlDouble(this.value + other.value);
        }
        else if (other.type === 4) {
            return new CrlString(this.toString() + other.toString());
        }
        else if (other instanceof CrlNumber) {
            return new CrlDouble(this.value + other.value);
        }
        throw new Error("No se pudieron convertir los valores al tipo necesario.");
    }
    minus(other) {
        if (other.type === 3 && other instanceof CrlNumber) {
            return new CrlDouble(this.value - other.value);
        }
        else if (other instanceof CrlNumber) {
            return new CrlDouble(this.value - other.value);
        }
        throw new Error("No se pudieron convertir los valores al tipo necesario.");
    }
    times(other) {
        if (other.type === 3 && other instanceof CrlNumber) {
            return new CrlDouble(this.value * other.value);
        }
        else if (other instanceof CrlNumber) {
            return new CrlDouble(this.value * other.value);
        }
        throw new Error("No se pudieron convertir los valores al tipo necesario.");
    }
    divided(other) {
        if (other instanceof CrlNumber) {
            return new CrlDouble(this.value / other.value);
        }
        throw new Error("No se pudieron convertir los valores al tipo necesario.");
    }
    modulus(other) {
        if (other instanceof CrlNumber) {
            return new CrlDouble(this.value % other.value);
        }
        throw new Error("No se pudieron convertir los valores al tipo necesario.");
    }
    raisedTo(other) {
        if (other instanceof CrlNumber) {
            if (other instanceof CrlInt || other instanceof CrlChar)
                return new CrlInt(this.value ** other.value);
            return new CrlDouble(this.value ** other.value);
        }
        throw new Error("No se pudieron convertir los valores al tipo necesario.");
    }
    castTo(type) {
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
exports.CrlInt = CrlInt;
// CrlString
class CrlString {
    constructor(value) {
        this.type = 4;
        this.value = value;
    }
    toString() {
        return this.value;
    }
    plus(other) {
        return new CrlString(this.toString() + other.toString());
    }
    minus(other) {
        throw new Error("No se pudieron convertir los valores al tipo necesario.");
    }
    times(other) {
        throw new Error("No se pudieron convertir los valores al tipo necesario.");
    }
    divided(other) {
        throw new Error("No se pudieron convertir los valores al tipo necesario.");
    }
    modulus(other) {
        throw new Error("No se pudieron convertir los valores al tipo necesario.");
    }
    raisedTo(other) {
        throw new Error("No se pudieron convertir los valores al tipo necesario.");
    }
    castTo(type) {
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
exports.CrlString = CrlString;
// CrlChar.ts
class CrlChar extends CrlInt {
    constructor(value) {
        super(value.charCodeAt(0));
        this.type = 1;
        this.char = value;
    }
    toString() {
        return this.char;
    }
    plus(other) {
        if (other instanceof CrlBool)
            throw new Error("No se pudieron convertir los valores al tipo necesario.");
        return super.plus(other);
    }
    minus(other) {
        if (other instanceof CrlBool)
            throw new Error("No se pudieron convertir los valores al tipo necesario.");
        return super.minus(other);
    }
    times(other) {
        if (other instanceof CrlBool)
            throw new Error("No se pudieron convertir los valores al tipo necesario.");
        return super.times(other);
    }
    divided(other) {
        if (other instanceof CrlBool)
            throw new Error("No se pudieron convertir los valores al tipo necesario.");
        return super.divided(other);
    }
    modulus(other) {
        if (other instanceof CrlBool)
            throw new Error("No se pudieron convertir los valores al tipo necesario.");
        return super.modulus(other);
    }
    raisedTo(other) {
        if (other instanceof CrlNumber && !(other instanceof CrlBool)) {
            return new CrlDouble(this.value ** other.value);
        }
        throw new Error("No se pudieron convertir los valores al tipo necesario.");
    }
    castTo(type) {
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
exports.CrlChar = CrlChar;
//# sourceMappingURL=CrlType.js.map