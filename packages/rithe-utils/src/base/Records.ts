import Iterables from "../collect/Iterables"
import Predicate from "../fp/Predicate"
import Project from "../fp/Project"

const EMPTY: Record<keyof any, unknown> = {}

function empty<K extends keyof any, V>(): Record<K, V> {
    return EMPTY as Record<K, V>
}

function of<K extends keyof any, V>(record: Record<K, V>): Record<K, V> {
    return { ...record }
}

function from<K extends keyof any, V>(iterable: Iterable<[K, V]>): Record<K, V> {
    const result: Record<K, V> = {} as Record<K, V>
    for (const [key, value] of iterable) {
        (result as any)[key] = value
    }
    return result
}

function concat<K extends keyof any, V>(...records: Record<K, V>[]): Record<K, V> {
    const result: Record<K, V> = {} as Record<K, V>
    for (const record of records) {
        Object.assign(result, record)
    }
    return result
}

function entries<K extends keyof any, V>(record: Record<K, V>): Iterable<[K, V]> {
    const result: [K, V][] = []
    for (const key of keys(record)) {
        result.push([key, record[key]])
    }
    return result
}

function keys<K extends keyof any>(record: Record<K, unknown>): Iterable<K> {
    const names = Object.getOwnPropertyNames(record)
    const symbols = Object.getOwnPropertySymbols(record)
    const descriptors = Object.getOwnPropertyDescriptors(record)
    const result: K[] = []
    for (const name of names) {
        const descriptor = descriptors[name]
        descriptor.enumerable && descriptor.get && result.push(name as K)
    }
    for (const symbol of symbols) {
        const descriptor = descriptors[symbol as K]
        descriptor.enumerable && descriptor.get && result.push(symbol as K)
    }
    return result
}

function values<V>(record: Record<keyof any, V>): Iterable<V> {
    const result: V[] = []
    for (const key of keys(record)) {
        result.push(record[key as any])
    }
    return result
}

function transform<K extends keyof any, V, T>(record: Record<K, V>, valueProject: Project<V, T>): Record<K, T> {
    const result: Record<K, T> = {} as Record<K, T>
    for (const key of keys(record)) {
        result[key] = valueProject(record[key])
    }
    return result
}

function filter<K extends keyof any, V>(record: Record<K, V>, predicate: Predicate<[K, V]>): Record<K, V> {
    const result: Record<K, V> = {} as Record<K, V>
    for (const entry of entries(record)) {
        predicate(entry) && (result[entry[0]] = entry[1])
    }
    return result
}

function size<K extends keyof any, V>(record: Record<K, V>): number {
    return Iterables.size(keys(record))
}

function elementsEqual<K extends keyof any, V>(record1: Record<K, V>, record2: Record<K, V>): boolean {
    if (size(record1) !== size(record2)) return false
    for (const [key, value] of entries(record1)) {
        if (record2[key] !== value) return false
    }
    return true
}

function set<K extends keyof any, V>(record: Record<K, V>, ...entries: [K, V][]): Record<K, V> {
    if (entries.length === 0) return record
    const result = of(record)
    for (const [key, value] of entries) {
        result[key] = value
    }
    return result
}

function _delete<K extends keyof any, V>(record: Record<K, V>, ...keys: K[]): Record<K, V> {
    if (keys.length === 0) return record
    const result = of(record)
    for (const key of keys) {
        delete result[key]
    }
    return result
}

export default {
    EMPTY,
    empty,
    of,
    from,
    concat,
    entries,
    keys,
    values,
    transform,
    filter,
    size,
    elementsEqual,
    set,
    delete: _delete,
}