import Project from "../fp/Project"
import Iterables from "./Iterables"

function empty() {
    return new Map()
}

function from<K, V>(iterable: Iterable<[K, V]>): Map<K, V> {
    return new Map(iterable)
}

function concat<K, V>(...maps: Map<K, V>[]): Map<K, V> {
    return maps.reduce((acc, map) => (map.forEach((v, k) => acc.set(k, v)), acc), new Map<K, V>())
}

function transform<K, V, T>(map: Map<K, V>, project: Project<[K, V], T>): Map<K, T> {
    return new Map(Iterables.map(map.entries(), ([k, v]) => [k, project([k, v])]))
}

function filter<K, V>(map: Map<K, V>, predicate: (entry: [K, V]) => boolean): Map<K, V> {
    return new Map(Iterables.filter(map, predicate))
}

function elementsEqual<K, V>(map1: Map<K, V>, map2: Map<K, V>): boolean {
    if (map1.size !== map2.size) return false
    for (const [key, value] of map1) {
        if (map2.get(key) !== value) return false
    }
    return true
}

function set<K, V>(map: Map<K, V>, ...entries: [K, V][]): Map<K, V> {
    const result = new Map<K, V>(map)
    entries.forEach(([key, value]) => result.set(key, value))
    return result;
}

function delete_<K, V>(map: Map<K, V>, ...keys: K[]): Map<K, V> {
    const result = new Map<K, V>(map)
    keys.forEach(value => result.delete(value))
    return result
}

export default {
    empty,
    from,
    concat,
    transform,
    filter,
    set,
    delete: delete_,
    elementsEqual,
}
