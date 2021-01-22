import Iterables from "./Iterables"

class SetMultimap<K, V> implements Iterable<[K, V]> {

    private _size: number
    get size(): number { return this._size }
    private _keySize: number
    get keySize(): number { return this._keySize }
    private _map: Map<K, Set<V>>

    constructor(iterable?: Iterable<[K, V]>) {
        this._size = 0
        this._keySize = 0
        this._map = new Map()
        if (iterable) {
            for (const [key, value] of iterable) {
                this.set(key, value)
            }
        }
    }

    *[Symbol.iterator](): Iterator<[K, V], any, undefined> {
        for (const [key, collection] of this._map) {
            for (const value of collection) {
                yield [key, value]
            }
        }
    }

    asMap(): Map<K, Set<V>> {
        return new Map(Iterables.map(this._map, ([k, vs]) => [k, new Set(vs)]))
    }

    set(key: K, ...values: V[]): SetMultimap<K, V> {
        if (values.length === 0) return this

        const map = this._map
        let collection = map.get(key)
        if (collection === undefined) {
            collection = new Set()
            map.set(key, collection)
            this._keySize++
        }

        const prevSize = collection.size
        values.forEach(value => (collection!).add(value))
        this._size += collection.size - prevSize
        return this
    }

    delete(key: K, ...values: V[]): boolean {
        const map = this._map
        const collection = map.get(key)
        if (collection === undefined) return false

        if (values.length === 0) {
            map.delete(key)
            this._keySize--
            this._size -= collection.size
            return true
        }

        const prevSize = collection.size
        values.forEach(value => collection.delete(value))
        this._size -= prevSize - collection.size
        if (collection.size === 0) {
            map.delete(key)
            this._keySize--
        }
        return prevSize > collection.size
    }

    clear(): void {
        this._map.clear()
        this._size = 0
        this._keySize = 0
    }

    forEach = (callbackFn: (value: V, key: K, multimap: SetMultimap<K, V>) => void) => {
        this._map.forEach((collection, key) => collection.forEach((value: V) => callbackFn(value, key, this)))
    }

    forEachCollection = (callbackFn: (collection: Set<V>, key: K, multimap: SetMultimap<K, V>) => void) => {
        this._map.forEach((collection, key) => callbackFn(collection, key, this))
    }

    keys(): IterableIterator<K> {
        return this._map.keys()
    }

    *values(): IterableIterator<V> {
        for (const collection of this._map.values()) {
            for (const value of collection) {
                yield value
            }
        }
    }

    collections(): IterableIterator<Set<V>> {
        return this._map.values()
    }

    *entries(): IterableIterator<[K, V]> {
        for (const [key, collection] of this._map) {
            for (const value of collection) {
                yield [key, value]
            }
        }
    }

    has(key: K): boolean {
        return this._map.has(key)
    }

    hasEntry(key: K, value: V): boolean {
        const collection = this._map.get(key)
        if (collection === undefined) return false

        return collection.has(value)
    }

    get(key: K): Set<V> | undefined {
        return this._map.get(key)
    }

    count(key: K): number {
        const collection = this._map.get(key)
        if (collection === undefined) return 0

        return collection.size
    }

}

export default SetMultimap