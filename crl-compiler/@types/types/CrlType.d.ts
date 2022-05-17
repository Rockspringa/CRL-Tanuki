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
export declare class CrlNumber {
    readonly value: number;
    constructor(value: number);
    toString(): string;
}
export declare enum Type {
    BOOL = 0,
    CHAR = 1,
    INT = 2,
    DOUBLE = 3,
    STRING = 4
}
export declare class CrlBool extends CrlNumber implements CrlType {
    readonly type: Type;
    plus(other: CrlType): CrlType;
    minus(other: CrlType): CrlType;
    times(other: CrlType): CrlType;
    divided(other: CrlType): CrlType;
    modulus(other: CrlType): CrlType;
    raisedTo(other: CrlType): CrlType;
    castTo(type: Type): CrlType;
}
export declare class CrlDouble extends CrlNumber implements CrlType {
    readonly type: Type;
    private readonly rep;
    constructor(value: number);
    toString(): string;
    plus(other: CrlType): CrlType;
    minus(other: CrlType): CrlType;
    times(other: CrlType): CrlType;
    divided(other: CrlType): CrlType;
    modulus(other: CrlType): CrlType;
    raisedTo(other: CrlType): CrlType;
    castTo(type: Type): CrlType;
}
export declare class CrlInt extends CrlNumber implements CrlType {
    readonly type: Type;
    constructor(value: number);
    plus(other: CrlType): CrlType;
    minus(other: CrlType): CrlType;
    times(other: CrlType): CrlType;
    divided(other: CrlType): CrlType;
    modulus(other: CrlType): CrlType;
    raisedTo(other: CrlType): CrlType;
    castTo(type: Type): CrlType;
}
export declare class CrlString implements CrlType {
    readonly type: Type;
    readonly value: string;
    constructor(value: string);
    toString(): string;
    plus(other: CrlType): CrlType;
    minus(other: CrlType): CrlType;
    times(other: CrlType): CrlType;
    divided(other: CrlType): CrlType;
    modulus(other: CrlType): CrlType;
    raisedTo(other: CrlType): CrlType;
    castTo(type: Type): CrlType;
}
export declare class CrlChar extends CrlInt {
    readonly type: Type;
    private readonly char;
    constructor(value: string);
    toString(): string;
    plus(other: CrlType): CrlType;
    minus(other: CrlType): CrlType;
    times(other: CrlType): CrlType;
    divided(other: CrlType): CrlType;
    modulus(other: CrlType): CrlType;
    raisedTo(other: CrlType): CrlType;
    castTo(type: Type): CrlType;
}
//# sourceMappingURL=CrlType.d.ts.map