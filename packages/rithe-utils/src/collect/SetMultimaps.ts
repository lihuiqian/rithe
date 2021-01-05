import Iterables from "./Iterables";
import SetMultimap from "./SetMultimap";
import Sets from "./Sets";

function empty() {
    return new SetMultimap()
}

function from<K, V>(iterable: Iterable<[K, V]>): SetMultimap<K, V> {
    return new SetMultimap(iterable)
}

function invertFrom<K, V>(map: Map<K, V>): SetMultimap<V, K> {
    return new SetMultimap(Iterables.map(map, ([k, v]) => [v, k]))
}

function concat<K, V>(...multimaps: SetMultimap<K, V>[]): SetMultimap<K, V> {
    return multimaps.reduce((acc, multimap) => (multimap.forEach((value, key) => acc.set(key, value)), acc), new SetMultimap())
}

function transform<K, V, T>(multimap: SetMultimap<K, V>, project: (entry: [K, V]) => T): SetMultimap<K, T> {
    const result = new SetMultimap<K, T>()
    multimap.forEach((value, key) => result.set(key, project([key, value])))
    return result
}

function filter<K, V>(multimap: SetMultimap<K, V>, predicate: (entry: [K, V]) => boolean): SetMultimap<K, V> {
    return new SetMultimap(Iterables.filter(multimap, predicate))
}

function filterCollections<K, V>(multimap: SetMultimap<K, V>, predicate: (entry: [K, Set<V>]) => boolean): SetMultimap<K, V> {
    const result = new SetMultimap<K, V>()
    multimap.forEachCollection((collection, key) => {
        if (predicate([key, collection]))
            for (const value of collection)
                result.set(key, value)
    })
    return result
}

function elementsEqual<K, V>(multimap1: SetMultimap<K, V>, multimap2: SetMultimap<K, V>): boolean {
    if (multimap1.size !== multimap2.size || multimap1.keySize !== multimap2.keySize) return false
    let result = true
    multimap1.forEachCollection((collection, key) => {
        const collection2 = multimap2.get(key)
        if (!collection2 || !Sets.elementsEqual(collection, collection2)) result = false
    })
    return result
}

function set<K, V>(multimap: SetMultimap<K, V>, ...entries: [K, V][]): SetMultimap<K, V> {
    const result = new SetMultimap(multimap)
    entries.forEach(([key, value]) => result.set(key, value))
    return result
}

function _delete<K, V>(multimap: SetMultimap<K, V>, ...entries: [K, Set<V> | undefined][]): SetMultimap<K, V> {
    const result = new SetMultimap(multimap)
    entries.forEach(([key, values = []]) => result.delete(key, ...values))
    return result
}

export default {
    empty,
    from,
    invertFrom,
    concat,
    transform,
    filter,
    filterCollections,
    elementsEqual,
    set,
    delete: _delete,
}