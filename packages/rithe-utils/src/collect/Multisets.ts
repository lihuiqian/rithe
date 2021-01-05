import Comparator from "../base/Comparator"
import Comparators from "../base/Comparators"
import Iterables from "./Iterables"
import Multimap from "./Multimap"
import Multiset from "./Multiset"

function empty() {
    return new Multiset()
}

function from<T>(iterable: Iterable<T>): Multiset<T> {
    return new Multiset(iterable)
}

function resultFrom<T>(map: Map<T, number>): Multiset<T> {
    const result = new Multiset<T>()
    map.forEach((count, value) => result.setCount(value, count))
    return result
}

function countFrom<T>(multimap: Multimap<T, unknown>): Multiset<T> {
    const result = new Multiset<T>()
    multimap.forEach((_, value) => result.add(value))
    return result
}

function range(start: number, count: number, step = 1): Multiset<number> {
    return new Multiset(Iterables.range(start, count, step))
}

function concat<T>(...multisets: Multiset<T>[]): Multiset<T> {
    return multisets.reduce((acc, multiset) => (multiset.forEachEntry((value, count) => acc.setCount(value, acc.count(value) + count)), acc), new Multiset<T>())
}

function union<T>(multiset1: Multiset<T>, multiset2: Multiset<T>): Multiset<T> {
    const result = new Multiset<T>(multiset1)
    multiset2.forEachEntry((value, count) => result.count(value) < count && result.setCount(value, count))
    return result
}

function intersection<T>(multiset1: Multiset<T>, multiset2: Multiset<T>): Multiset<T> {
    const result = new Multiset<T>()
    multiset1.forEachEntry((value, count) => multiset2.has(value) && result.setCount(value, Math.min(count, multiset2.count(value))))
    return result
}

function difference<T>(multiset1: Multiset<T>, multiset2: Multiset<T>): Multiset<T> {
    const result = new Multiset<T>(multiset1)
    multiset2.forEachEntry((value, count) => result.has(value) && result.setCount(value, Math.max(0, result.count(value) - count)))
    return result
}

function symmetricDifference<T>(multiset1: Multiset<T>, multiset2: Multiset<T>): Multiset<T> {
    const result = new Multiset<T>(multiset1)
    multiset2.forEachEntry((value, count) => result.setCount(value, result.has(value) ? Math.abs(count - result.count(value)) : count))
    return result
}

function sum<T>(multiset1: Multiset<T>, multiset2: Multiset<T>): Multiset<T> {
    const result = new Multiset<T>(multiset1)
    multiset2.forEachEntry((value, count) => result.setCount(value, result.count(value) + count))
    return result
}

function removeOccurrences<T>(multiset1: Multiset<T>, multiset2: Multiset<T>): Multiset<T> {
    const result = new Multiset<T>(multiset1)
    multiset2.forEachEntry((value, count) => result.setCount(value, result.count(value) - count))
    return result
}

function retainOccurrences<T>(multiset1: Multiset<T>, multiset2: Multiset<T>): Multiset<T> {
    const result = new Multiset<T>(multiset1)
    multiset2.forEachEntry((value, count) => result.setCount(value, Math.min(result.count(value), count)))
    return result
}

function map<T, R>(multiset: Multiset<T>, project: (value: T) => R): Multiset<R> {
    return new Multiset(Iterables.map(multiset, project))
}

function flatMap<T, R>(multiset: Multiset<T>, project: (value: T) => R[]): Multiset<R> {
    return new Multiset(Iterables.flatMap(multiset, project))
}

function filter<T>(multiset: Multiset<T>, predicate: (value: T) => boolean): Multiset<T> {
    const result = new Multiset<T>()
    multiset.forEachEntry((value, count) => predicate(value) && result.setCount(value, count))
    return result
}

function filterEntries<T>(multiset: Multiset<T>, predicate: (value: T, count: number) => boolean): Multiset<T> {
    const result = new Multiset<T>()
    multiset.forEachEntry((value, count) => predicate(value, count) && result.setCount(value, count))
    return result
}

function sortByCount<T>(multiset: Multiset<T>, comparator: Comparator<number>): Multiset<T> {
    const entries = Iterables.sort(multiset.entries(), Comparators.compare(entry => entry[1], comparator))
    return resultFrom(new Map(entries))
}

function distinct<T>(multiset: Multiset<T>): Multiset<T> {
    const result = new Multiset<T>()
    multiset.forEachEntry(value => result.add(value))
    return result
}

function partition<T>(multiset: Multiset<T>, size: number): Multiset<T>[] {
    return Iterables.partition(multiset, size).map(from)
}

function first<T>(multiset: Multiset<T>): T | undefined
function first<T>(multiset: Multiset<T>, defaultValue: T): T
function first<T>(multiset: Multiset<T>, defaultValue?: T): T | undefined {
    const firstEntry = multiset.entries().next().value
    return firstEntry === undefined ? defaultValue : firstEntry[0]
}

function max<T>(multiset: Multiset<T>, comparator: Comparator<T>): T | undefined {
    let first = true
    let acc: T | undefined = undefined
    multiset.forEachEntry(item => {
        if (first) {
            first = false
            acc = item
        } else if (comparator(acc as T, item) < 0) {
            acc = item
        }
    })
    return acc
}

function min<T>(multiset: Multiset<T>, comparator: Comparator<T>): T | undefined {
    let first = true
    let acc: T | undefined = undefined
    multiset.forEachEntry(item => {
        if (first) {
            first = false
            acc = item
        } else if (comparator(acc as T, item) > 0) {
            acc = item
        }
    })
    return acc
}

function elementsEqual<T>(multiset1: Multiset<T>, multiset2: Multiset<T>): boolean {
    if (multiset1.size !== multiset2.size) return false
    for (const [value, count] of multiset1.entries()) {
        if (multiset2.count(value) !== count) return false
    }
    return true
}

function add<T>(multiset: Multiset<T>, ...items: T[]): Multiset<T> {
    const result = new Multiset(multiset)
    items.forEach(result.add)
    return result
}

function delete_<T>(multiset: Multiset<T>, ...items: T[]): Multiset<T> {
    const result = new Multiset(multiset)
    items.forEach(result.delete)
    return result
}

function setCount<T>(multiset: Multiset<T>, item: T, count: number): Multiset<T> {
    const result = new Multiset(multiset)
    result.setCount(item, count)
    return result
}

export default {
    empty,
    from,
    resultFrom,
    countFrom,
    range,
    concat,
    union,
    intersection,
    difference,
    symmetricDifference,
    sum,
    removeOccurrences,
    retainOccurrences,
    map,
    flatMap,
    filter,
    filterEntries,
    sortByCount,
    distinct,
    partition,
    first,
    max,
    min,
    elementsEqual,
    add,
    delete: delete_,
    setCount,
}