import { ArrayMultimap, SetMultimaps } from "..";
import Comparator from "../base/Comparator";
import ArrayMultimaps from "./ArrayMultimaps";
import Arrays from "./Arrays";
import Iterables from "./Iterables";
import Maps from "./Maps";
import Multiset from "./Multiset";
import Multisets from "./Multisets";
import SetMultimap from "./SetMultimap";
import Sets from "./Sets";

function iter<T>(array: T[]): FluentArray<T>
function iter<T>(set: Set<T>): FluentSet<T>
function iter<T>(multiset: Multiset<T>): FluentMultiset<T>
function iter<K, V>(map: Map<K, V>): FluentMap<K, V>
function iter<K, V>(multimap: ArrayMultimap<K, V>): FluentArrayMultimap<K, V>
function iter<K, V>(multimap: SetMultimap<K, V>): FluentSetMultimap<K, V>
function iter<T>(iterable: Iterable<T>): FluentIterable<T>
function iter(obj: any) {
    if (obj instanceof Array) {
        return new FluentArray(obj)
    } else if (obj instanceof Set) {
        return new FluentSet(obj)
    } else if (obj instanceof Multiset) {
        return new FluentMultiset(obj)
    } else if (obj instanceof Map) {
        return new FluentMap(obj)
    } else if (obj instanceof ArrayMultimap) {
        return new FluentArrayMultimap(obj)
    } else if (obj instanceof SetMultimap) {
        return new FluentSetMultimap(obj)
    } else {
        return new FluentIterable(obj)
    }
}

class FluentIterable<T> {
    readonly value: Iterable<T>

    constructor(iterable: Iterable<T>) {
        this.value = iterable
    }

    private _call<A extends unknown[], R>(func: (value: Iterable<T>, ...args: A) => Iterable<R>, ...args: A): FluentIterable<R> {
        return new FluentIterable(func(this.value, ...args))
    }

    concat(...iterables: Iterable<T>[]): FluentIterable<T> {
        return this._call(Iterables.concat, ...iterables)
    }

    zip(...iterables: Iterable<T>[]): FluentIterable<T[]> {
        return this._call(Iterables.zip, ...iterables)
    }

    map<R>(project: (value: T, index: number) => R): FluentIterable<R> {
        return this._call(Iterables.map, project)
    }

    pairwise(): FluentIterable<[T, T]> {
        return this._call(Iterables.pairwise)
    }

    scan(accumulator: (acc: T, value: T, index: number) => T, initial?: T): FluentIterable<T>
    scan<R>(accumulator: (acc: R, value: T, index: number) => R, initial: R): FluentIterable<R>
    scan(accumulator: (acc: any, value: any, index: number) => T, initial?: unknown): FluentIterable<unknown> {
        return this._call(Iterables.scan, accumulator, initial)
    }

    buffer(count: number, step = count): FluentIterable<T[]> {
        return this._call(Iterables.buffer, count, step)
    }

    flatMap<R>(project: (value: T, index: number) => R[]): FluentIterable<R> {
        return this._call(Iterables.flatMap, project)
    }

    skip(count: number): FluentIterable<T> {
        return this._call(Iterables.skip, count)
    }

    skipLast(count: number): FluentIterable<T> {
        return this._call(Iterables.skipLast, count)
    }

    take(count: number): FluentIterable<T> {
        return this._call(Iterables.take, count)
    }

    takeLast(count: number): FluentIterable<T> {
        return this._call(Iterables.takeLast, count)
    }

    filter(predicate: (value: T, index: number) => boolean): FluentIterable<T> {
        return this._call(Iterables.filter, predicate)
    }

    reverse(): FluentIterable<T> {
        return this._call(Iterables.reverse)
    }

    sort(comparator: Comparator<T>): FluentIterable<T> {
        return this._call(Iterables.sort, comparator)
    }

    distinct(): FluentIterable<T> {
        return this._call(Iterables.distinct)
    }

    partition(size: number): FluentIterable<T>[] {
        return Iterables.partition(this.value, size).map(i => new FluentIterable(i))
    }

    forEach(consumer: (value: T, index: number) => void): void {
        let index = 0
        for (const value of this.value) {
            consumer(value, index++)
        }
    }

    reduce(accumulator: (acc: T, value: T, index: number) => T): T | undefined
    reduce(accumulator: (acc: T, value: T, index: number) => T, initial: T): T
    reduce(accumulator: (acc: T, value: T, index: number) => T, initial?: T): T | undefined {
        return initial === undefined ? Iterables.reduce(this.value, accumulator) : Iterables.reduce(this.value, accumulator, initial)
    }

    asArray(): FluentArray<T>
    asArray<R>(project: (value: T, index: number) => R): FluentArray<R>
    asArray(project?: (value: T, index: number) => unknown): FluentArray<unknown> {
        return new FluentArray(Arrays.from(project ? Iterables.map(this.value, project) : this.value))
    }

    asSet(): FluentSet<T>
    asSet<R>(project: (value: T, index: number) => R): FluentSet<R>
    asSet(project?: (value: T, index: number) => unknown): FluentSet<unknown> {
        return new FluentSet(Sets.from(project ? Iterables.map(this.value, project) : this.value))
    }

    asMultiset(): FluentMultiset<T>
    asMultiset<R>(project: (value: T, index: number) => R): FluentMultiset<R>
    asMultiset(project?: (value: T, index: number) => unknown): FluentMultiset<unknown> {
        return new FluentMultiset(Multisets.from(project ? Iterables.map(this.value, project) : this.value))
    }

    asMap<K, V>(project: (value: T, index: number) => [K, V]): FluentMap<K, V> {
        return new FluentMap(Maps.from(Iterables.map(this.value, project)))
    }

    asArrayMultimap<K, V>(project: (value: T, index: number) => [K, V]): FluentArrayMultimap<K, V> {
        return new FluentArrayMultimap(ArrayMultimaps.from(Iterables.map(this.value, project)))
    }

    asSetMultimap<K, V>(project: (value: T, index: number) => [K, V]): FluentSetMultimap<K, V> {
        return new FluentSetMultimap(SetMultimaps.from(Iterables.map(this.value, project)))
    }
}

class FluentArray<T> {
    readonly value: T[]

    constructor(array: T[]) {
        this.value = array
    }

    private _call<A extends unknown[], R>(func: (value: T[], ...args: A) => R[], ...args: A): FluentArray<R> {
        return new FluentArray(func(this.value, ...args))
    }

    concat(...arrays: T[][]): FluentArray<T> {
        return this._call(Arrays.concat, ...arrays)
    }

    zip(...arrays: T[][]): FluentArray<T[]> {
        return this._call(Arrays.zip, ...arrays)
    }

    map<R>(project: (value: T, index: number) => R): FluentArray<R> {
        return this._call(Arrays.map, project)
    }

    pairwise(): FluentArray<[T, T]> {
        return this._call(Arrays.pairwise)
    }

    scan(accumulator: (acc: T, value: T, index: number) => T, initial?: T): FluentArray<T>
    scan<R>(accumulator: (acc: R, value: T, index: number) => R, initial: R): FluentArray<R>
    scan(accumulator: (acc: any, value: any, index: number) => T, initial?: unknown): FluentArray<unknown> {
        return this._call(Arrays.scan, accumulator, initial)
    }

    buffer(count: number, step = count): FluentArray<T[]> {
        return this._call(Arrays.buffer, count, step)
    }

    flatMap<R>(project: (value: T, index: number) => R[]): FluentArray<R> {
        return this._call(Arrays.flatMap, project)
    }

    skip(count: number): FluentArray<T> {
        return this._call(Arrays.skip, count)
    }

    skipLast(count: number): FluentArray<T> {
        return this._call(Arrays.skipLast, count)
    }

    take(count: number): FluentArray<T> {
        return this._call(Arrays.take, count)
    }

    takeLast(count: number): FluentArray<T> {
        return this._call(Arrays.takeLast, count)
    }

    filter(predicate: (value: T, index: number) => boolean): FluentArray<T> {
        return this._call(Arrays.filter, predicate)
    }

    reverse(): FluentArray<T> {
        return this._call(Arrays.reverse)
    }

    sort(comparator: Comparator<T>): FluentArray<T> {
        return this._call(Arrays.sort, comparator)
    }

    distinct(): FluentArray<T> {
        return this._call(Arrays.distinct)
    }

    partition(size: number): FluentArray<T>[] {
        return Arrays.partition(this.value, size).map(i => new FluentArray(i))
    }

    forEach(consumer: (value: T, index: number) => void): void {
        let index = 0
        for (const value of this.value) {
            consumer(value, index++)
        }
    }

    reduce(accumulator: (acc: T, value: T, index: number) => T): T | undefined
    reduce(accumulator: (acc: T, value: T, index: number) => T, initial: T): T
    reduce(accumulator: (acc: T, value: T, index: number) => T, initial?: T): T | undefined {
        return initial === undefined ? Iterables.reduce(this.value, accumulator) : Iterables.reduce(this.value, accumulator, initial)
    }

    fill(item: T, start?: number, end?: number): FluentArray<T> {
        return this._call(Arrays.fill, item, start, end)
    }

    push(...items: T[]): FluentArray<T> {
        return this._call(Arrays.push, ...items)
    }

    unshift(...items: T[]): FluentArray<T> {
        return this._call(Arrays.unshift, ...items)
    }

    pop(size = 1): FluentArray<T> {
        return this._call(Arrays.pop, size)
    }

    shift(size = 1): FluentArray<T> {
        return this._call(Arrays.shift, size)
    }

    splice(start: number, deleteCount?: number): FluentArray<T>
    splice(start: number, deleteCount: number, ...items: T[]): FluentArray<T>
    splice(start: number, deleteCount = 0, ...items: T[]): FluentArray<T> {
        return this._call(Arrays.splice, start, deleteCount, ...items) as FluentArray<T>
    }

    slice(start?: number, end?: number): FluentArray<T> {
        return this._call(Arrays.slice, start, end)
    }

    asIterable(): FluentIterable<T>
    asIterable<R>(project: (value: T, index: number) => R): FluentIterable<R>
    asIterable(project?: (value: T, index: number) => unknown): FluentIterable<unknown> {
        return new FluentIterable(project ? Arrays.map(this.value, project) : this.value)
    }

    asSet(): FluentSet<T>
    asSet<R>(project: (value: T, index: number) => R): FluentSet<R>
    asSet(project?: (value: T, index: number) => unknown): FluentSet<unknown> {
        return new FluentSet(Sets.from(project ? Arrays.map(this.value, project) : this.value))
    }

    asMultiset(): FluentMultiset<T>
    asMultiset<R>(project: (value: T, index: number) => R): FluentMultiset<R>
    asMultiset(project?: (value: T, index: number) => unknown): FluentMultiset<unknown> {
        return new FluentMultiset(Multisets.from(project ? Arrays.map(this.value, project) : this.value))
    }

    asMap<K, V>(project: (value: T, index: number) => [K, V]): FluentMap<K, V> {
        return new FluentMap(Maps.from(Arrays.map(this.value, project)))
    }

    asArrayMultimap<K, V>(project: (value: T, index: number) => [K, V]): FluentArrayMultimap<K, V> {
        return new FluentArrayMultimap(ArrayMultimaps.from(Arrays.map(this.value, project)))
    }

    asSetMultimap<K, V>(project: (value: T, index: number) => [K, V]): FluentSetMultimap<K, V> {
        return new FluentSetMultimap(SetMultimaps.from(Arrays.map(this.value, project)))
    }
}

class FluentSet<T> {
    readonly value: Set<T>

    constructor(set: Set<T>) {
        this.value = set
    }

    private _call<A extends unknown[], R>(func: (value: Set<T>, ...args: A) => Set<R>, ...args: A): FluentSet<R> {
        return new FluentSet(func(this.value, ...args))
    }

    concat(...sets: Set<T>[]): FluentSet<T> {
        return this._call(Sets.concat, ...sets)
    }

    union(set: Set<T>): FluentSet<T> {
        return this._call(Sets.union, set)
    }

    intersection(set: Set<T>): FluentSet<T> {
        return this._call(Sets.intersection, set)
    }

    difference(set: Set<T>): FluentSet<T> {
        return this._call(Sets.difference, set)
    }

    sysmmetricDifference(set: Set<T>): FluentSet<T> {
        return this._call(Sets.symmetricDifference, set)
    }

    map<R>(project: (value: T) => R): FluentSet<R> {
        return this._call(Sets.map, project)
    }

    flatMap<R>(project: (value: T) => R[]): FluentSet<R> {
        return this._call(Sets.flatMap, project)
    }

    filter(predicate: (value: T) => boolean): FluentSet<T> {
        return this._call(Sets.filter, predicate)
    }

    partition(size: number): FluentSet<T>[] {
        return Sets.partition(this.value, size).map(i => new FluentSet(i))
    }

    forEach(consumer: (value: T) => void): void {
        for (const value of this.value) {
            consumer(value)
        }
    }

    add(...items: T[]): FluentSet<T> {
        return this._call(Sets.add, ...items)
    }

    delete(...items: T[]): FluentSet<T> {
        return this._call(Sets.delete, ...items)
    }

    asIterable(): FluentIterable<T>
    asIterable<R>(project: (value: T) => R): FluentIterable<R>
    asIterable(project?: (value: T) => unknown): FluentIterable<unknown> {
        return new FluentIterable(project ? Sets.map(this.value, project) : this.value)
    }

    asArray(): FluentArray<T>
    asArray<R>(project: (value: T) => R): FluentArray<R>
    asArray(project?: (value: T) => unknown): FluentArray<unknown> {
        return new FluentArray(Arrays.from(project ? Sets.map(this.value, project) : this.value))
    }

    asMultiset(): FluentMultiset<T>
    asMultiset<R>(project: (value: T) => R): FluentMultiset<R>
    asMultiset(project?: (value: T) => unknown): FluentMultiset<unknown> {
        return new FluentMultiset(Multisets.from(project ? Sets.map(this.value, project) : this.value))
    }

    asMap<K, V>(project: (value: T) => [K, V]): FluentMap<K, V> {
        return new FluentMap(Maps.from(Sets.map(this.value, project)))
    }

    asArrayMultimap<K, V>(project: (value: T) => [K, V]): FluentArrayMultimap<K, V> {
        return new FluentArrayMultimap(ArrayMultimaps.from(Sets.map(this.value, project)))
    }

    asSetMultimap<K, V>(project: (value: T) => [K, V]): FluentSetMultimap<K, V> {
        return new FluentSetMultimap(SetMultimaps.from(Sets.map(this.value, project)))
    }
}

class FluentMultiset<T> {
    readonly value: Multiset<T>

    constructor(multiset: Multiset<T>) {
        this.value = multiset
    }

    private _call<A extends unknown[], R>(func: (value: Multiset<T>, ...args: A) => Multiset<R>, ...args: A): FluentMultiset<R> {
        return new FluentMultiset(func(this.value, ...args))
    }

    concat(...multisets: Multiset<T>[]): FluentMultiset<T> {
        return this._call(Multisets.concat, ...multisets)
    }

    union(set: Multiset<T>): FluentMultiset<T> {
        return this._call(Multisets.union, set)
    }

    intersection(set: Multiset<T>): FluentMultiset<T> {
        return this._call(Multisets.intersection, set)
    }

    difference(set: Multiset<T>): FluentMultiset<T> {
        return this._call(Multisets.difference, set)
    }

    sysmmetricDifference(set: Multiset<T>): FluentMultiset<T> {
        return this._call(Multisets.symmetricDifference, set)
    }

    sum(set: Multiset<T>): FluentMultiset<T> {
        return this._call(Multisets.sum, set)
    }

    removeOccurrences(set: Multiset<T>): FluentMultiset<T> {
        return this._call(Multisets.removeOccurrences, set)
    }

    retainOccurrences(set: Multiset<T>): FluentMultiset<T> {
        return this._call(Multisets.retainOccurrences, set)
    }

    map<R>(project: (value: T) => R): FluentMultiset<R> {
        return this._call(Multisets.map, project)
    }

    flatMap<R>(project: (value: T) => R[]): FluentMultiset<R> {
        return this._call(Multisets.flatMap, project)
    }

    filter(predicate: (value: T) => boolean): FluentMultiset<T> {
        return this._call(Multisets.filter, predicate)
    }

    filterEntries(predicate: (value: T, count: number) => boolean): FluentMultiset<T> {
        return this._call(Multisets.filterEntries, predicate)
    }

    sortByCount(comparator: Comparator<number>): FluentMultiset<T> {
        return this._call(Multisets.sortByCount, comparator)
    }

    distinct(): FluentMultiset<T> {
        return this._call(Multisets.distinct)
    }

    partition(size: number): FluentMultiset<T>[] {
        return Multisets.partition(this.value, size).map(i => new FluentMultiset(i))
    }

    forEach(consumer: (value: T) => void): void {
        for (const value of this.value) {
            consumer(value)
        }
    }

    add(...items: T[]): FluentMultiset<T> {
        return this._call(Multisets.add, ...items)
    }

    delete(...items: T[]): FluentMultiset<T> {
        return this._call(Multisets.delete, ...items)
    }

    setCount(item: T, count: number): FluentMultiset<T> {
        return this._call(Multisets.setCount, item, count)
    }

    asIterable(): FluentIterable<T>
    asIterable<R>(project: (value: T) => R): FluentIterable<R>
    asIterable(project?: (value: T) => unknown): FluentIterable<unknown> {
        return new FluentIterable(project ? Multisets.map(this.value, project) : this.value)
    }

    asArray(): FluentArray<T>
    asArray<R>(project: (value: T) => R): FluentArray<R>
    asArray(project?: (value: T) => unknown): FluentArray<unknown> {
        return new FluentArray(Arrays.from(project ? Multisets.map(this.value, project) : this.value))
    }

    asSet(): FluentSet<T>
    asSet<R>(project: (value: T) => R): FluentSet<R>
    asSet(project?: (value: T) => unknown): FluentSet<unknown> {
        return new FluentSet(Sets.from(project ? Multisets.map(this.value, project) : this.value))
    }

    asMap<K, V>(project: (value: T) => [K, V]): FluentMap<K, V> {
        return new FluentMap(Maps.from(Multisets.map(this.value, project)))
    }

    asArrayMultimap<K, V>(project: (value: T) => [K, V]): FluentArrayMultimap<K, V> {
        return new FluentArrayMultimap(ArrayMultimaps.from(Multisets.map(this.value, project)))
    }

    asSetMultimap<K, V>(project: (value: T) => [K, V]): FluentSetMultimap<K, V> {
        return new FluentSetMultimap(SetMultimaps.from(Multisets.map(this.value, project)))
    }
}

class FluentMap<K, V> {
    readonly value: Map<K, V>

    constructor(map: Map<K, V>) {
        this.value = map
    }

    private _call<A extends unknown[], T>(func: (value: Map<K, V>, ...args: A) => Map<K, T>, ...args: A): FluentMap<K, T> {
        return new FluentMap(func(this.value, ...args))
    }

    concat(...maps: Map<K, V>[]): FluentMap<K, V> {
        return this._call(Maps.concat, ...maps)
    }

    transform<T>(project: (entry: [K, V]) => T): FluentMap<K, T> {
        return this._call(Maps.transform, project)
    }

    filter(predicate: (entry: [K, V]) => boolean): FluentMap<K, V> {
        return this._call(Maps.filter, predicate)
    }

    forEach(consumer: (entry: [K, V]) => void): void {
        for (const entry of this.value) {
            consumer(entry)
        }
    }

    set(...entries: [K, V][]): FluentMap<K, V> {
        return this._call(Maps.set, ...entries)
    }

    delete(...keys: K[]): FluentMap<K, V> {
        return this._call(Maps.delete, ...keys)
    }

    asIterable(): FluentIterable<[K, V]>
    asIterable<R>(project: (entry: [K, V]) => R): FluentIterable<R>
    asIterable(project?: (entry: [K, V]) => unknown): FluentIterable<unknown> {
        return new FluentIterable(project ? Iterables.map(this.value, project) : this.value)
    }

    asArray(): FluentArray<[K, V]>
    asArray<R>(project: (entry: [K, V]) => R): FluentArray<R>
    asArray(project?: (entry: [K, V]) => unknown): FluentArray<unknown> {
        return new FluentArray(Arrays.from(project ? Iterables.map(this.value, project) : this.value))
    }

    asSet(): FluentSet<[K, V]>
    asSet<R>(project: (entry: [K, V]) => R): FluentSet<R>
    asSet(project?: (entry: [K, V]) => unknown): FluentSet<unknown> {
        return new FluentSet(Sets.from(project ? Iterables.map(this.value, project) : this.value))
    }

    asMultiset(): FluentMultiset<[K, V]>
    asMultiset<R>(project: (entry: [K, V]) => R): FluentMultiset<R>
    asMultiset(project?: (entry: [K, V]) => unknown): FluentMultiset<unknown> {
        return new FluentMultiset(Multisets.from(project ? Iterables.map(this.value, project) : this.value))
    }

    asArrayMultimap(): FluentArrayMultimap<K, V>
    asArrayMultimap<T>(project: (entry: [K, V]) => T): FluentArrayMultimap<K, T>
    asArrayMultimap(project?: (entry: [K, V]) => unknown): FluentArrayMultimap<K, unknown> {
        return new FluentArrayMultimap(ArrayMultimaps.from(project ? Maps.transform(this.value, project) : this.value))
    }

    asSetMultimap(): FluentSetMultimap<K, V>
    asSetMultimap<T>(project: (entry: [K, V]) => T): FluentSetMultimap<K, T>
    asSetMultimap(project?: (entry: [K, V]) => unknown): FluentSetMultimap<K, unknown> {
        return new FluentSetMultimap(SetMultimaps.from(project ? Maps.transform(this.value, project) : this.value))
    }
}

class FluentArrayMultimap<K, V> {
    readonly value: ArrayMultimap<K, V>

    constructor(multimap: ArrayMultimap<K, V>) {
        this.value = multimap
    }

    private _call<A extends unknown[], T>(func: (value: ArrayMultimap<K, V>, ...args: A) => ArrayMultimap<K, T>, ...args: A): FluentArrayMultimap<K, T> {
        return new FluentArrayMultimap(func(this.value, ...args))
    }

    concat(...multimaps: ArrayMultimap<K, V>[]): FluentArrayMultimap<K, V> {
        return this._call(ArrayMultimaps.concat, ...multimaps)
    }

    transform<T>(project: (entry: [K, V]) => T): FluentArrayMultimap<K, T> {
        return this._call(ArrayMultimaps.transform, project)
    }

    filter(predicate: (entry: [K, V]) => boolean): FluentArrayMultimap<K, V> {
        return this._call(ArrayMultimaps.filter, predicate)
    }

    filterCollections(predicate: (entry: [K, V[]]) => boolean): FluentArrayMultimap<K, V> {
        return this._call(ArrayMultimaps.filterCollections, predicate)
    }

    forEach(consumer: (entry: [K, V]) => void): void {
        for (const entry of this.value) {
            consumer(entry)
        }
    }

    set(...entries: [K, V][]): FluentArrayMultimap<K, V> {
        return this._call(ArrayMultimaps.set, ...entries)
    }

    delete(...entries: [K, V[]][]): FluentArrayMultimap<K, V> {
        return this._call(ArrayMultimaps.delete, ...entries)
    }

    asIterable(): FluentIterable<[K, V]>
    asIterable<R>(project: (entry: [K, V]) => R): FluentIterable<R>
    asIterable(project?: (entry: [K, V]) => unknown): FluentIterable<unknown> {
        return new FluentIterable(project ? Iterables.map(this.value, project) : this.value)
    }

    asArray(): FluentArray<[K, V]>
    asArray<R>(project: (entry: [K, V]) => R): FluentArray<R>
    asArray(project?: (entry: [K, V]) => unknown): FluentArray<unknown> {
        return new FluentArray(Arrays.from(project ? Iterables.map(this.value, project) : this.value))
    }

    asSet(): FluentSet<[K, V]>
    asSet<R>(project: (entry: [K, V]) => R): FluentSet<R>
    asSet(project?: (entry: [K, V]) => unknown): FluentSet<unknown> {
        return new FluentSet(Sets.from(project ? Iterables.map(this.value, project) : this.value))
    }

    asMultiset(): FluentMultiset<[K, V]>
    asMultiset<R>(project: (entry: [K, V]) => R): FluentMultiset<R>
    asMultiset(project?: (entry: [K, V]) => unknown): FluentMultiset<unknown> {
        return new FluentMultiset(Multisets.from(project ? Iterables.map(this.value, project) : this.value))
    }

    asMap(): FluentMap<K, V>
    asMap<T>(project: (entry: [K, V]) => T): FluentMap<K, T>
    asMap(project?: (entry: [K, V]) => unknown): FluentMap<K, unknown> {
        return new FluentMap(Maps.from(project ? ArrayMultimaps.transform(this.value, project) : this.value))
    }

    asSetMultimap(): FluentSetMultimap<K, V>
    asSetMultimap<T>(project: (entry: [K, V]) => T): FluentSetMultimap<K, T>
    asSetMultimap(project?: (entry: [K, V]) => unknown): FluentSetMultimap<K, unknown> {
        return new FluentSetMultimap(SetMultimaps.from(project ? ArrayMultimaps.transform(this.value, project) : this.value))
    }
}

class FluentSetMultimap<K, V> {
    readonly value: SetMultimap<K, V>

    constructor(multimap: SetMultimap<K, V>) {
        this.value = multimap
    }

    private _call<A extends unknown[], T>(func: (value: SetMultimap<K, V>, ...args: A) => SetMultimap<K, T>, ...args: A): FluentSetMultimap<K, T> {
        return new FluentSetMultimap(func(this.value, ...args))
    }

    concat(...multimaps: SetMultimap<K, V>[]): FluentSetMultimap<K, V> {
        return this._call(SetMultimaps.concat, ...multimaps)
    }

    transform<T>(project: (entry: [K, V]) => T): FluentSetMultimap<K, T> {
        return this._call(SetMultimaps.transform, project)
    }

    filter(predicate: (entry: [K, V]) => boolean): FluentSetMultimap<K, V> {
        return this._call(SetMultimaps.filter, predicate)
    }

    filterCollections(predicate: (entry: [K, Set<V>]) => boolean): FluentSetMultimap<K, V> {
        return this._call(SetMultimaps.filterCollections, predicate)
    }

    forEach(consumer: (entry: [K, V]) => void): void {
        for (const entry of this.value) {
            consumer(entry)
        }
    }

    set(...entries: [K, V][]): FluentSetMultimap<K, V> {
        return this._call(SetMultimaps.set, ...entries)
    }

    delete(...entries: [K, Set<V>][]): FluentSetMultimap<K, V> {
        return this._call(SetMultimaps.delete, ...entries)
    }

    asIterable(): FluentIterable<[K, V]>
    asIterable<R>(project: (entry: [K, V]) => R): FluentIterable<R>
    asIterable(project?: (entry: [K, V]) => unknown): FluentIterable<unknown> {
        return new FluentIterable(project ? Iterables.map(this.value, project) : this.value)
    }

    asArray(): FluentArray<[K, V]>
    asArray<R>(project: (entry: [K, V]) => R): FluentArray<R>
    asArray(project?: (entry: [K, V]) => unknown): FluentArray<unknown> {
        return new FluentArray(Arrays.from(project ? Iterables.map(this.value, project) : this.value))
    }

    asSet(): FluentSet<[K, V]>
    asSet<R>(project: (entry: [K, V]) => R): FluentSet<R>
    asSet(project?: (entry: [K, V]) => unknown): FluentSet<unknown> {
        return new FluentSet(Sets.from(project ? Iterables.map(this.value, project) : this.value))
    }

    asMultiset(): FluentMultiset<[K, V]>
    asMultiset<R>(project: (entry: [K, V]) => R): FluentMultiset<R>
    asMultiset(project?: (entry: [K, V]) => unknown): FluentMultiset<unknown> {
        return new FluentMultiset(Multisets.from(project ? Iterables.map(this.value, project) : this.value))
    }

    asMap(): FluentMap<K, V>
    asMap<T>(project: (entry: [K, V]) => T): FluentMap<K, T>
    asMap(project?: (entry: [K, V]) => unknown): FluentMap<K, unknown> {
        return new FluentMap(Maps.from(project ? SetMultimaps.transform(this.value, project) : this.value))
    }

    asArrayMultimap(): FluentArrayMultimap<K, V>
    asArrayMultimap<T>(project: (entry: [K, V]) => T): FluentArrayMultimap<K, T>
    asArrayMultimap(project?: (entry: [K, V]) => unknown): FluentArrayMultimap<K, unknown> {
        return new FluentArrayMultimap(ArrayMultimaps.from(project ? SetMultimaps.transform(this.value, project) : this.value))
    }
}

export default iter