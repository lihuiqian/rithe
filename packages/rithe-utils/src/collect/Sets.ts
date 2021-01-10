import Comparator from "../base/Comparator"
import Iterables from "./Iterables"

function empty<T>(): Set<T> {
    return new Set()
}

function from<T>(iterable: Iterable<T>): Set<T> {
    return new Set<T>(iterable)
}

function range(start: number, count: number, step = 1): Set<number> {
    return new Set(Iterables.range(start, count, step))
}

function concat<T>(...sets: Set<T>[]): Set<T> {
    return sets.reduce(union, new Set())
}

function union<T>(set1: Set<T>, set2: Set<T>): Set<T> {
    const result = new Set(set1)
    set2.forEach(result.add)
    return result
}

function intersection<T>(set1: Set<T>, set2: Set<T>): Set<T> {
    const result = new Set<T>()
    set1.forEach(item => set2.has(item) && result.add(item))
    return result
}

function difference<T>(set1: Set<T>, set2: Set<T>): Set<T> {
    const result = new Set(set1)
    set2.forEach(item => result.delete(item))
    return result
}

function symmetricDifference<T>(set1: Set<T>, set2: Set<T>): Set<T> {
    const result = new Set(set1)
    set2.forEach(item => result.has(item) ? result.delete(item) : result.add(item))
    return result
}

function map<T, R>(set: Set<T>, project: (value: T) => R): Set<R> {
    return new Set(Iterables.map(set, project))
}

function flatMap<T, R>(set: Set<T>, project: (value: T) => R[]): Set<R> {
    return new Set(Iterables.flatMap(set, project))
}

function filter<T>(set: Set<T>, predicate: (value: T) => boolean): Set<T> {
    return new Set(Iterables.filter(set, predicate))
}

function partition<T>(set: Set<T>, size: number): Set<T>[] {
    return Iterables.partition(set, size).map(it => from(it))
}

function first<T>(set: Set<T>): T | undefined
function first<T>(set: Set<T>, defaultValue: T): T
function first<T>(set: Set<T>, defaultValue?: T): T | undefined {
    return Iterables.first(set, defaultValue)
}

function max<T>(set: Set<T>, comparator: Comparator<T>): T | undefined {
    return Iterables.max(set, comparator)
}

function min<T>(set: Set<T>, comparator: Comparator<T>): T | undefined {
    return Iterables.min(set, comparator)
}

function elementsEqual<T>(set1: Set<T>, set2: Set<T>): boolean {
    if (set1.size !== set2.size) return false
    let result = true
    set1.forEach(item => result && !set2.has(item) && (result = false))
    return result
}

function add<T>(set: Set<T>, ...items: T[]): Set<T> {
    const result = new Set(set)
    items.forEach(result.add)
    return result
}

function delete_<T>(set: Set<T>, ...items: T[]): Set<T> {
    const result = new Set(set)
    items.forEach(result.delete)
    return result
}

export default {
    empty,
    from,
    range,
    concat,
    union,
    intersection,
    difference,
    symmetricDifference,
    map,
    flatMap,
    filter,
    partition,
    first,
    max,
    min,
    elementsEqual,
    add,
    delete: delete_,
}