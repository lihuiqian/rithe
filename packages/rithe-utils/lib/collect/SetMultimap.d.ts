declare class SetMultimap<K, V> implements Iterable<[K, V]> {
    private _size;
    get size(): number;
    private _keySize;
    get keySize(): number;
    private _map;
    constructor(iterable?: Iterable<[K, V]>);
    [Symbol.iterator](): Iterator<[K, V], any, undefined>;
    asMap(): Map<K, Set<V>>;
    set(key: K, ...values: V[]): SetMultimap<K, V>;
    delete(key: K, ...values: V[]): boolean;
    clear(): void;
    forEach: (callbackFn: (value: V, key: K, multimap: SetMultimap<K, V>) => void) => void;
    forEachCollection: (callbackFn: (collection: Set<V>, key: K, multimap: SetMultimap<K, V>) => void) => void;
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    collections(): IterableIterator<Set<V>>;
    entries(): IterableIterator<[K, V]>;
    has(key: K): boolean;
    hasEntry(key: K, value: V): boolean;
    get(key: K): Set<V> | undefined;
    count(key: K): number;
}
export default SetMultimap;
//# sourceMappingURL=SetMultimap.d.ts.map