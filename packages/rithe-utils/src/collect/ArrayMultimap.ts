import Iterables from "./Iterables"
import Multimap from "./Multimap"

class ArrayMultimap<K, V> implements Multimap<K, V> {

    private _size: number
    get size(): number { return this._size }
    private _keySize: number
    get keySize(): number { return this._keySize }
    private _map: Map<K, V[]>

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

    asMap(): Map<K, V[]> {
        return new Map(Iterables.map(this._map, ([k, vs]) => [k, [...vs]]))
    }

    set(key: K, ...values: V[]): ArrayMultimap<K, V> {
        if (values.length === 0) return this

        const map = this._map
        let collection = map.get(key)
        if (collection === undefined) {
            collection = []
            map.set(key, collection)
            this._keySize++
        }

        collection.push(...values)
        this._size += values.length
        return this
    }

    delete(key: K, ...values: V[]): boolean {
        const map = this._map
        const collection = map.get(key)
        if (collection === undefined) return false

        if (values.length === 0) {
            map.delete(key)
            this._keySize--
            this._size -= collection.length
            return true
        }

        let deleteCount = 0
        values.forEach(value => {
            const index = collection.indexOf(value)
            index >= 0 && (collection.splice(index, 1), deleteCount++)
        })
        this._size -= deleteCount
        if (collection.length === 0) {
            map.delete(key)
            this._keySize--
        }
        return deleteCount > 0
    }

    clear(): void {
        this._map.clear()
        this._size = 0
        this._keySize = 0
    }

    forEach = (callbackFn: (value: V, key: K, multimap: ArrayMultimap<K, V>) => void) => {
        this._map.forEach((collection, key) => collection.forEach((value: V) => callbackFn(value, key, this)))
    }

    forEachCollection = (callbackFn: (collection: V[], key: K, multimap: ArrayMultimap<K, V>) => void) => {
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

    collections(): IterableIterator<V[]> {
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

        return collection.indexOf(value) >= 0
    }

    get(key: K): V[] | undefined {
        return this._map.get(key)
    }

    count(key: K): number {
        const collection = this._map.get(key)
        return collection?.length || 0
    }

}

export default ArrayMultimap