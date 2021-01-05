/* eslint-disable @typescript-eslint/ban-types */

const EMPTY: object = {}

function empty(): object {
    return EMPTY
}

function of<T extends object>(object: T): T {
    return { ...object }
}

function concat(...objects: object[]): object {
    const result: object = {} as object
    for (const object of objects) {
        Object.assign(result, object)
    }
    return result
}

function set<T extends object, K extends keyof T, V extends T[K]>(object: T, ...entries: [K, V][]): T {
    if (entries.length === 0) return object
    const result = of(object)
    for (const [key, value] of entries) {
        (result as any)[key] = value
    }
    return result
}

function _delete<T extends object, K extends keyof T>(object: T, ...keys: K[]): T {
    if (keys.length === 0) return object
    const result = of(object)
    for (const key of keys) {
        delete result[key]
    }
    return result
}

function trim<T extends object, K extends keyof T>(object: T): T {
    const names = Object.getOwnPropertyNames(object)
    const symbols = Object.getOwnPropertySymbols(object)
    const descriptors = Object.getOwnPropertyDescriptors(object)
    const keys: K[] = []
    for (const name of names) {
        const descriptor = descriptors[name]
        descriptor.enumerable && descriptor.get && (object as any)[name] === undefined && keys.push(name as K)
    }
    for (const symbol of symbols) {
        const descriptor = descriptors[symbol as K]
        descriptor.enumerable && descriptor.get && (object as any)[symbol] === undefined && keys.push(symbol as K)
    }
    return _delete(object, ...keys)
}

export default {
    EMPTY,
    empty,
    of,
    concat,
    set,
    delete: _delete,
    trim,
}