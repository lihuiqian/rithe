import Comparator from "../base/Comparator"
import Iterables from "./Iterables"
import Multisets from "./Multisets"

function empty<T>(): T[] {
    return []
}

function from<T>(iterable: Iterable<T>): T[] {
    return Array.from(iterable)
}

function range(start: number, count: number, step = 1): number[] {
    return from(Iterables.range(start, count, step))
}

function repeat<T>(value: T, count: number): T[] {
    const result = new Array(count)
    return result.fill(value)
}

function concat<T>(...arrs: T[][]): T[] {
    return arrs.reduce((acc, cur) => acc.concat(cur), [])
}

function zip<T>(...arrs: T[][]): T[][] {
    return from(Iterables.zip(...arrs))
}

function map<T, R>(arr: T[], project: (value: T, index: number) => R): R[] {
    return arr.map(project)
}

function pairwise<T>(arr: T[]): [T, T][] {
    return from(Iterables.pairwise(arr))
}

function scan<T>(arr: T[], accumulator: (acc: T, value: T, index: number) => T, initial?: T): T[]
function scan<T, R>(arr: T[], accumulator: (acc: R, value: T, index: number) => R, initial: R): T[]
function scan(arr: unknown[], accumulator: (acc: unknown, value: unknown, index: number) => unknown, initial?: unknown): unknown[] {
    return from(Iterables.scan(arr, accumulator, initial))
}

function buffer<T>(arr: T[], count: number, step = count): T[][] {
    const result: T[][] = []
    for (let i = 0; i < arr.length; i += step) {
        result.push(arr.slice(i, i + count))
    }
    return result
}

function flatMap<T, R>(arr: T[], project: (value: T, index: number) => R[]): R[] {
    return from(Iterables.flatMap(arr, project))
}

function skip<T>(arr: T[], count: number): T[] {
    return arr.slice(count)
}

function skipLast<T>(arr: T[], count: number): T[] {
    return arr.slice(0, - count)
}

function take<T>(arr: T[], count: number): T[] {
    return arr.slice(0, count)
}

function takeLast<T>(arr: T[], count: number): T[] {
    return arr.slice(-count)
}

function filter<T>(arr: T[], predicate: (value: T, index: number) => boolean): T[] {
    return arr.filter(predicate)
}

function reverse<T>(arr: T[]): T[] {
    return arr.slice().reverse()
}

function sort<T>(arr: T[], comparator: Comparator<T>): T[] {
    return arr.sort(comparator)
}

function distinct<T>(arr: T[]): T[] {
    return from(new Set(arr))
}

function partition<T>(arr: T[], size: number): T[][] {
    const result = []
    for (let i = 0; i < ((arr.length - 1) / size | 0) + 1; i++) {
        result.push(arr.slice(i * size, (i + 1) * size))
    }
    return result
}

function reduce<T>(arr: T[], accumulator: (acc: T, value: T, index: number) => T): T | undefined
function reduce<T>(arr: T[], accumulator: (acc: T, value: T, index: number) => T, initial: T): T
function reduce<T>(arr: T[], accumulator: (acc: T, value: T, index: number) => T, initial?: T): T | undefined {
    return initial === undefined ? arr.length === 0 ? undefined : arr.reduce(accumulator) : arr.reduce(accumulator, initial)
}

function first<T>(arr: T[]): T | undefined
function first<T>(arr: T[], defaultValue: T): T
function first<T>(arr: T[], defaultValue?: T): T | undefined {
    const firstValue = arr[0]
    return firstValue === undefined ? defaultValue : firstValue
}

function last<T>(arr: T[]): T | undefined
function last<T>(arr: T[], defaultValue: T): T
function last<T>(arr: T[], defaultValue?: T): T | undefined {
    const lastValue = arr[arr.length - 1]
    return lastValue === undefined ? defaultValue : lastValue
}

function max<T>(arr: T[], comparator: Comparator<T>): T | undefined {
    return Iterables.max(arr, comparator)
}

function min<T>(arr: T[], comparator: Comparator<T>): T | undefined {
    return Iterables.min(arr, comparator)
}

function has<T>(arr: T[], value: T): boolean {
    return arr.indexOf(value) >= 0
}

function elementsEqual<T>(arr1: T[], arr2: T[]): boolean {
    if (arr1.length !== arr2.length) return false
    return Multisets.elementsEqual(Multisets.from(arr1), Multisets.from(arr2))
}

function equals<T>(arr1: T[], arr2: T[]): boolean {
    if (arr1.length !== arr2.length) return false
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false
    }
    return true
}

function fill<T>(arr: T[], item: T, start?: number, end?: number): T[] {
    const result = arr.slice()
    return result.fill(item, start, end)
}

function push<T>(arr: T[], ...items: T[]): T[] {
    const result = arr.slice()
    result.push(...items)
    return result
}

function pop<T>(arr: T[], size: number): T[] {
    const result = arr.slice()
    for (let i = 0; i < size; i++) result.pop()
    return result
}

function unshift<T>(arr: T[], ...items: T[]): T[] {
    const result = arr.slice()
    result.unshift(...items)
    return result
}

function shift<T>(arr: T[], size: number): T[] {
    const result = arr.slice()
    for (let i = 0; i < size; i++) result.shift()
    return result
}

function slice<T>(arr: T[], start?: number, end?: number): T[] {
    return arr.slice(start, end)
}

function splice<T>(arr: T[], start: number, deleteCount?: number): T[]
function splice<T>(arr: T[], start: number, deleteCount: number, ...items: T[]): T[]
function splice<T>(arr: T[], start: number, deleteCount: number | undefined = 0, ...items: T[]): T[] {
    const result = arr.slice()
    result.splice(start, deleteCount, ...items)
    return result
}

export default {
    empty,
    from,
    range,
    repeat,
    concat,
    zip,
    map,
    pairwise,
    scan,
    buffer,
    flatMap,
    skip,
    skipLast,
    take,
    takeLast,
    filter,
    reverse,
    sort,
    distinct,
    partition,
    reduce,
    first,
    last,
    max,
    min,
    has,
    elementsEqual,
    equals,
    fill,
    push,
    pop,
    unshift,
    shift,
    slice,
    splice,
}