import Multimap from "./Multimap";
declare class ArrayMultimap<K, V> implements Multimap<K, V> {
    private _size;
    get size(): number;
    private _keySize;
    get keySize(): number;
    private _map;
    constructor(iterable?: Iterable<[K, V]>);
    [Symbol.iterator](): Iterator<[K, V], any, undefined>;
    asMap(): Map<K, V[]>;
    set(key: K, ...values: V[]): ArrayMultimap<K, V>;
    delete(key: K, ...values: V[]): boolean;
    clear(): void;
    forEach: (callbackFn: (value: V, key: K, multimap: ArrayMultimap<K, V>) => void) => void;
    forEachCollection: (callbackFn: (collection: V[], key: K, multimap: ArrayMultimap<K, V>) => void) => void;
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    collections(): IterableIterator<V[]>;
    entries(): IterableIterator<[K, V]>;
    has(key: K): boolean;
    hasEntry(key: K, value: V): boolean;
    get(key: K): V[] | undefined;
    count(key: K): number;
}
export default ArrayMultimap;
//# sourceMappingURL=ArrayMultimap.d.ts.map