class Multiset<T> implements Iterable<T> {

    _size: Readonly<number>
    get size(): number { return this._size }
    private _map: Map<T, number>

    constructor(iterable?: Iterable<T>) {
        this._size = 0
        this._map = new Map()
        if (iterable) {
            for (const value of iterable) {
                this.add(value)
            }
        }
    }

    *[Symbol.iterator](): Iterator<T, any, undefined> {
        for (const [value, count] of this._map.entries()) {
            for (let i = 0; i < count; i++) {
                yield value
            }
        }
    }

    asSet(): Set<T> {
        return new Set(this._map.keys())
    }

    asMap(): Map<T, number> {
        return new Map(this._map.entries())
    }

    add(value: T, occurrences?: number): Multiset<T> {
        const map = this._map
        const prevCount = map.get(value) || 0
        const intOccurrences = occurrences === undefined ? 1 : occurrences < 0 ? 0 : occurrences | 0
        const newCount = prevCount + intOccurrences

        newCount && map.set(value, newCount)
        this._size += intOccurrences
        return this
    }

    delete(value: T, occurrences?: number): boolean {
        const map = this._map
        const prevCount = map.get(value)
        if (prevCount === undefined) return false

        const intOccurrences = occurrences === undefined ? 1 : occurrences < 0 ? 0 : occurrences | 0
        const newCount = prevCount >= intOccurrences ? prevCount - intOccurrences : 0
        const decrement = prevCount - newCount

        newCount ? map.set(value, newCount) : map.delete(value)
        this._size -= decrement
        return !!decrement
    }

    setCount(value: T, count: number): Multiset<T> {
        const map = this._map
        const prevCount = map.get(value) || 0
        const newCount = count < 0 ? 0 : count | 0
        const delta = newCount - prevCount

        newCount ? map.set(value, newCount) : map.delete(value)
        this._size += delta
        return this
    }

    clear(): void {
        this._map.clear()
        this._size = 0
    }

    forEach = (callbackFn: (value: T, multiset: Multiset<T>) => void) => {
        this._map.forEach((count, value) => {
            for (let i = 0; i < count; i++) {
                callbackFn(value, this)
            }
        })
    }

    forEachEntry = (callbackFn: (value: T, count: number, multiset: Multiset<T>) => void) => {
        this._map.forEach((count, value) => callbackFn(value, count, this))
    }

    entries(): IterableIterator<[T, number]> {
        return this._map.entries()
    }

    *values(): IterableIterator<T> {
        for (const [value, count] of this._map) {
            for (let i = 0; i < count; i++) {
                yield value
            }
        }
    }

    has(value: T): boolean {
        return this._map.has(value)
    }

    count(value: T): number {
        return this._map.get(value) || 0
    }

}

export default Multiset