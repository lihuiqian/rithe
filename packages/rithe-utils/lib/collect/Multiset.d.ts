declare class Multiset<T> implements Iterable<T> {
    _size: Readonly<number>;
    get size(): number;
    private _map;
    constructor(iterable?: Iterable<T>);
    [Symbol.iterator](): Iterator<T, any, undefined>;
    asSet(): Set<T>;
    asMap(): Map<T, number>;
    add(value: T, occurrences?: number): Multiset<T>;
    delete(value: T, occurrences?: number): boolean;
    setCount(value: T, count: number): Multiset<T>;
    clear(): void;
    forEach: (callbackFn: (value: T, multiset: Multiset<T>) => void) => void;
    forEachEntry: (callbackFn: (value: T, count: number, multiset: Multiset<T>) => void) => void;
    entries(): IterableIterator<[T, number]>;
    values(): IterableIterator<T>;
    has(value: T): boolean;
    count(value: T): number;
}
export default Multiset;
//# sourceMappingURL=Multiset.d.ts.map