interface Multimap<K, V> extends Iterable<[K, V]> {
    readonly size: number;
    readonly keySize: number;
    asMap(): Map<K, Iterable<V>>;
    set(key: K, ...values: V[]): Multimap<K, V>;
    delete(key: K, ...values: V[]): boolean;
    clear(): void;
    forEach(callbackFn: (value: V, key: K, multimap: Multimap<K, V>) => void): void;
    forEachCollection(callbackFn: (collection: Iterable<V>, key: K, multimap: Multimap<K, V>) => void): void;
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    collections(): IterableIterator<Iterable<V>>;
    entries(): IterableIterator<[K, V]>;
    has(key: K): boolean;
    hasEntry(key: K, value: V): boolean;
    get(key: K): Iterable<V> | undefined;
    count(key: K): number;
}
export default Multimap;
//# sourceMappingURL=Multimap.d.ts.map