declare function empty(): object;
declare function of<T extends object>(object: T): T;
declare function concat(...objects: object[]): object;
declare function set<T extends object, K extends keyof T, V extends T[K]>(object: T, ...entries: [K, V][]): T;
declare function _delete<T extends object, K extends keyof T>(object: T, ...keys: K[]): T;
declare function trim<T extends object, K extends keyof T>(object: T): T;
declare const _default: {
    EMPTY: object;
    empty: typeof empty;
    of: typeof of;
    concat: typeof concat;
    set: typeof set;
    delete: typeof _delete;
    trim: typeof trim;
};
export default _default;
//# sourceMappingURL=Objects.d.ts.map