import ArrayMultimap from "./ArrayMultimap";
import Arrays from "./Arrays";
import Iterables from "./Iterables";

function empty() {
    return new ArrayMultimap()
}

function from<K, V>(iterable: Iterable<[K, V]>): ArrayMultimap<K, V> {
    return new ArrayMultimap(iterable)
}

function invertFrom<K, V>(map: Map<K, V>): ArrayMultimap<V, K> {
    return new ArrayMultimap(Iterables.map(map, ([k, v]) => [v, k]))
}

function concat<K, V>(...multimaps: ArrayMultimap<K, V>[]): ArrayMultimap<K, V> {
    return multimaps.reduce((acc, multimap) => (multimap.forEach((value, key) => acc.set(key, value)), acc), new ArrayMultimap())
}

function transform<K, V, T>(multimap: ArrayMultimap<K, V>, project: (entry: [K, V]) => T): ArrayMultimap<K, T> {
    const result = new ArrayMultimap<K, T>()
    multimap.forEach((value, key) => result.set(key, project([key, value])))
    return result
}

function filter<K, V>(multimap: ArrayMultimap<K, V>, predicate: (entry: [K, V]) => boolean): ArrayMultimap<K, V> {
    return new ArrayMultimap(Iterables.filter(multimap, predicate))
}

function filterCollections<K, V>(multimap: ArrayMultimap<K, V>, predicate: (entry: [K, V[]]) => boolean): ArrayMultimap<K, V> {
    const result = new ArrayMultimap<K, V>()
    multimap.forEachCollection((collection, key) => {
        if (predicate([key, collection]))
            for (const value of collection)
                result.set(key, value)
    })
    return result
}

function elementsEqual<K, V>(multimap1: ArrayMultimap<K, V>, multimap2: ArrayMultimap<K, V>): boolean {
    if (multimap1.size !== multimap2.size || multimap1.keySize !== multimap2.keySize) return false
    let result = true
    multimap1.forEachCollection((collection, key) => {
        const collection2 = multimap2.get(key)
        if (!collection2 || !Arrays.elementsEqual(collection, collection2)) result = false
    })
    return result
}

function set<K, V>(multimap: ArrayMultimap<K, V>, ...entries: [K, V][]): ArrayMultimap<K, V> {
    const result = new ArrayMultimap(multimap)
    entries.forEach(([key, value]) => result.set(key, value))
    return result
}

function _delete<K, V>(multimap: ArrayMultimap<K, V>, ...entries: [K, V[] | undefined][]): ArrayMultimap<K, V> {
    const result = new ArrayMultimap(multimap)
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