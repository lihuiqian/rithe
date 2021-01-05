import Comparator from "../base/Comparator"
import Arrays from "./Arrays"
import Sets from "./Sets"

const EMPTY: Iterable<any> = []

function empty<T>(): Iterable<T> {
    return EMPTY
}

function from<T>(iterable: Iterable<T>): Iterable<T> {
    return {
        *[Symbol.iterator](): Iterator<T, any, undefined> {
            for (const value of iterable) yield value
        }
    }
}

function range(start: number, count: number, step = 1): Iterable<number> {
    return {
        *[Symbol.iterator](): Iterator<number, any, undefined> {
            for (let i = 0, item = start; i < count; i++, item += step) yield item
        }
    }
}

function repeat<T>(value: T, count: number): Iterable<T> {
    return {
        *[Symbol.iterator](): Iterator<T, any, undefined> {
            for (let i = 0; i < count; i++) yield value
        }
    }
}

function concat<T>(...iterables: Iterable<T>[]): Iterable<T> {
    return {
        *[Symbol.iterator](): Iterator<T, any, undefined> {
            for (const iterable of iterables)
                for (const item of iterable)
                    yield item
        }
    }
}

function zip<T>(...iterables: Iterable<T>[]): Iterable<T[]> {
    return {
        *[Symbol.iterator](): Iterator<T[], any, undefined> {
            const iterators = iterables.map(iterable => iterable[Symbol.iterator]())
            let nexts = iterators.map(iterator => iterator.next())
            while (!nexts.map(next => next.done).reduce((a, b) => a || b, false)) {
                yield nexts.map(next => next.value)
                nexts = iterators.map(iterator => iterator.next())
            }
        }
    }
}

function map<T, R>(iterable: Iterable<T>, project: (value: T, index: number) => R): Iterable<R> {
    return {
        *[Symbol.iterator](): Iterator<R, any, undefined> {
            let index = 0
            for (const value of iterable) yield project(value, index++)
        }
    }
}

function pairwise<T>(iterable: Iterable<T>): Iterable<[T, T]> {
    return {
        *[Symbol.iterator](): Iterator<[T, T], any, undefined> {
            let prev: T | undefined = undefined, index = 0
            for (const curr of iterable) {
                if (index++ > 0) yield [prev!, curr]
                prev = curr
            }
        }
    }
}

function scan<T>(iterable: Iterable<T>, accumulator: (acc: T, value: T, index: number) => T, initial?: T): Iterable<T>
function scan<T, R>(iterable: Iterable<T>, accumulator: (acc: R, value: T, index: number) => R, initial: R): Iterable<T>
function scan(iterable: Iterable<unknown>, accumulator: (acc: unknown, value: unknown, index: number) => unknown, initial?: unknown): Iterable<unknown> {
    return {
        *[Symbol.iterator](): Iterator<unknown, any, undefined> {
            let acc = initial, index = 0
            for (const value of iterable) {
                acc = index === 0 && acc === undefined ? value : accumulator(acc, value, index)
                index++
                yield acc
            }
        }
    }
}

function buffer<T>(iterable: Iterable<T>, count: number, step = count): Iterable<T[]> {
    return {
        *[Symbol.iterator](): Iterator<T[], any, undefined> {
            const buffer: T[] = []
            let index = 0
            for (const value of iterable) {
                buffer.length === count && buffer.shift()
                buffer.push(value)
                if (index >= count - 1 && (index - count + 1) % step === 0) yield buffer
                index++
            }
            while (buffer.length > 1) {
                buffer.shift()
                if ((index - count + 1) % step === 0) yield buffer
                index++
            }
        }
    }
}

function flatMap<T, R>(iterable: Iterable<T>, project: (value: T, index: number) => R[]): Iterable<R> {
    return {
        *[Symbol.iterator](): Iterator<R, any, undefined> {
            let index = 0
            for (const value of iterable) {
                for (const subValue of project(value, index++)) {
                    yield subValue
                }
            }
        }
    }
}

function skip<T>(iterable: Iterable<T>, count: number): Iterable<T> {
    return {
        *[Symbol.iterator](): Iterator<T, any, undefined> {
            let index = 0
            for (const value of iterable) {
                if (index++ >= count) yield value
            }
        }
    }
}

function skipLast<T>(iterable: Iterable<T>, count: number): Iterable<T> {
    return {
        *[Symbol.iterator](): Iterator<T, any, undefined> {
            const buffer: T[] = []
            for (const value of iterable) {
                buffer.push(value)
                if (buffer.length > count) yield buffer.shift()!
            }
        }
    }
}

function take<T>(iterable: Iterable<T>, count: number): Iterable<T> {
    return {
        *[Symbol.iterator](): Iterator<T, any, undefined> {
            let index = 0
            for (const value of iterable) {
                if (index++ < count) yield value
            }
        }
    }
}

function takeLast<T>(iterable: Iterable<T>, count: number): Iterable<T> {
    const buffer: T[] = []
    for (const value of iterable) {
        buffer.push(value)
        if (buffer.length > count) buffer.shift()
    }
    return buffer
}

function filter<T>(iterable: Iterable<T>, predicate: (value: T, index: number) => boolean): Iterable<T> {
    return {
        *[Symbol.iterator](): Iterator<T, any, undefined> {
            let index = 0
            for (const value of iterable) {
                if (predicate(value, index++)) yield value
            }
        }
    }
}

function reverse<T>(iterable: Iterable<T>): Iterable<T> {
    return Arrays.reverse(Arrays.from(iterable))
}

function sort<T>(iterable: Iterable<T>, comparator: Comparator<T>): Iterable<T> {
    return Arrays.sort(Arrays.from(iterable), comparator)
}

function distinct<T>(iterable: Iterable<T>): Iterable<T> {
    return Sets.from(iterable)
}

function partition<T>(iterable: Iterable<T>, size: number): Iterable<T>[] {
    const result = []
    let buffer = []
    let index = 0
    for (const value of iterable) {
        buffer.push(value)
        if (++index % size === 0) {
            result.push(buffer)
            buffer = []
        }
    }
    if (buffer.length > 0) result.push(buffer)
    return result
}

function reduce<T>(iterable: Iterable<T>, accumulator: (acc: T, value: T, index: number) => T): T | undefined
function reduce<T>(iterable: Iterable<T>, accumulator: (acc: T, value: T, index: number) => T, initial: T): T
function reduce<T>(iterable: Iterable<T>, accumulator: (acc: T, value: T, index: number) => T, initial?: T): T | undefined {
    let acc = initial, index = 0
    for (const value of iterable) {
        acc = index === 0 && acc === undefined ? value : accumulator(acc!, value, index)
        index++
    }
    return acc
}

function size<T>(iterable: Iterable<T>): number {
    let count = 0
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _value of iterable) {
        count++
    }
    return count
}

function get<T>(iterable: Iterable<T>, index: number): T | undefined {
    let i = 0
    for (const value of iterable) {
        if (i++ === index) return value
    }
    return undefined
}

function indexOf<T>(iterable: Iterable<T>, value: T): number {
    let index = 0
    for (const v of iterable) {
        if (v === value) return index
        index++
    }
    return -1
}

function lastIndexOf<T>(iterable: Iterable<T>, value: T): number {
    let index = 0, lastIndex = -1
    for (const v of iterable) {
        v === value && (lastIndex = index)
        index++
    }
    return lastIndex
}

function first<T>(iterable: Iterable<T>): T | undefined
function first<T>(iterable: Iterable<T>, defaultValue: T): T
function first<T>(iterable: Iterable<T>, defaultValue?: T): T | undefined {
    for (const value of iterable) {
        return value
    }
    return defaultValue
}

function last<T>(iterable: Iterable<T>): T | undefined
function last<T>(iterable: Iterable<T>, defaultValue: T): T
function last<T>(iterable: Iterable<T>, defaultValue?: T): T | undefined {
    return reduce(iterable, (_acc, value) => value, defaultValue)
}

function max<T>(iterable: Iterable<T>, comparator: Comparator<T>): T | undefined {
    return reduce(iterable, (acc, value) => comparator(acc, value) < 0 ? value : acc)
}

function min<T>(iterable: Iterable<T>, comparator: Comparator<T>): T | undefined {
    return reduce(iterable, (acc, value) => comparator(acc, value) > 0 ? value : acc)
}

function has<T>(iterable: Iterable<T>, value: T): boolean {
    return indexOf(iterable, value) >= 0
}

function equals<T>(iterable1: Iterable<T>, iterable2: Iterable<T>): boolean {
    const iterator1 = iterable1[Symbol.iterator](), iterator2 = iterable2[Symbol.iterator]()
    let next1 = iterator1.next(), next2 = iterator2.next()
    while (!next1.done && !next2.done) {
        if (next1.value !== next2.value) return false
        next1 = iterator1.next(), next2 = iterator2.next()
    }
    return next1.done === next2.done
}

export default {
    EMPTY,
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
    size,
    get,
    indexOf,
    lastIndexOf,
    first,
    last,
    max,
    min,
    has,
    equals,
}