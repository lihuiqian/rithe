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

    concat(...iterables: Iterable<T>[]): FluentIterable<T> {
        return new FluentIterable(Iterables.concat(this.value, ...iterables))
    }

    zip(...iterables: Iterable<T>[]): FluentIterable<T[]> {
        return new FluentIterable(Iterables.zip(this.value, ...iterables))
    }

    map<R>(project: (value: T, index: number) => R): FluentIterable<R> {
        return new FluentIterable(Iterables.map(this.value, project))
    }

    pairwise(): FluentIterable<[T, T]> {
        return new FluentIterable(Iterables.pairwise(this.value))
    }

    scan(accumulator: (acc: T, value: T, index: number) => T, initial?: T): FluentIterable<T>
    scan<R>(accumulator: (acc: R, value: T, index: number) => R, initial: R): FluentIterable<R>
    scan(accumulator: (acc: any, value: any, index: number) => T, initial?: unknown): FluentIterable<unknown> {
        return new FluentIterable(Iterables.scan(this.value, accumulator, initial))
    }

    buffer(count: number, step = count): FluentIterable<T[]> {
        return new FluentIterable(Iterables.buffer(this.value, count, step))
    }

    flatMap<R>(project: (value: T, index: number) => R[]): FluentIterable<R> {
        return new FluentIterable(Iterables.flatMap(this.value, project))
    }

    skip(count: number): FluentIterable<T> {
        return new FluentIterable(Iterables.skip(this.value, count))
    }

    skipLast(count: number): FluentIterable<T> {
        return new FluentIterable(Iterables.skipLast(this.value, count))
    }

    take(count: number): FluentIterable<T> {
        return new FluentIterable(Iterables.take(this.value, count))
    }

    takeLast(count: number): FluentIterable<T> {
        return new FluentIterable(Iterables.takeLast(this.value, count))
    }

    filter(predicate: (value: T, index: number) => boolean): FluentIterable<T> {
        return new FluentIterable(Iterables.filter(this.value, predicate))
    }

    reverse(): FluentIterable<T> {
        return new FluentIterable(Iterables.reverse(this.value))
    }

    sort(comparator: Comparator<T>): FluentIterable<T> {
        return new FluentIterable(Iterables.sort(this.value, comparator))
    }

    distinct(): FluentIterable<T> {
        return new FluentIterable(Iterables.distinct(this.value))
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

    asArray(): FluentArray<T> {
        return new FluentArray(Arrays.from(this.value))
    }

    asSet(): FluentSet<T> {
        return new FluentSet(Sets.from(this.value))
    }

    asMultiset(): FluentMultiset<T> {
        return new FluentMultiset(Multisets.from(this.value))
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

    concat(...arrays: T[][]): FluentArray<T> {
        return new FluentArray(Arrays.concat(this.value, ...arrays))
    }

    zip(...arrays: T[][]): FluentArray<T[]> {
        return new FluentArray(Arrays.zip(this.value, ...arrays))
    }

    map<R>(project: (value: T, index: number) => R): FluentArray<R> {
        return new FluentArray(Arrays.map(this.value, project))
    }

    pairwise(): FluentArray<[T, T]> {
        return new FluentArray(Arrays.pairwise(this.value))
    }

    scan(accumulator: (acc: T, value: T, index: number) => T, initial?: T): FluentArray<T>
    scan<R>(accumulator: (acc: R, value: T, index: number) => R, initial: R): FluentArray<R>
    scan(accumulator: (acc: any, value: any, index: number) => T, initial?: unknown): FluentArray<unknown> {
        return new FluentArray(Arrays.scan(this.value, accumulator, initial))
    }

    buffer(count: number, step = count): FluentArray<T[]> {
        return new FluentArray(Arrays.buffer(this.value, count, step))
    }

    flatMap<R>(project: (value: T, index: number) => R[]): FluentArray<R> {
        return new FluentArray(Arrays.flatMap(this.value, project))
    }

    skip(count: number): FluentArray<T> {
        return new FluentArray(Arrays.skip(this.value, count))
    }

    skipLast(count: number): FluentArray<T> {
        return new FluentArray(Arrays.skipLast(this.value, count))
    }

    take(count: number): FluentArray<T> {
        return new FluentArray(Arrays.take(this.value, count))
    }

    takeLast(count: number): FluentArray<T> {
        return new FluentArray(Arrays.takeLast(this.value, count))
    }

    filter(predicate: (value: T, index: number) => boolean): FluentArray<T> {
        return new FluentArray(Arrays.filter(this.value, predicate))
    }

    reverse(): FluentArray<T> {
        return new FluentArray(Arrays.reverse(this.value))
    }

    sort(comparator: Comparator<T>): FluentArray<T> {
        return new FluentArray(Arrays.sort(this.value, comparator))
    }

    distinct(): FluentArray<T> {
        return new FluentArray(Arrays.distinct(this.value))
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
        return new FluentArray(Arrays.fill(this.value, item, start, end))
    }

    push(...items: T[]): FluentArray<T> {
        return new FluentArray(Arrays.push(this.value, ...items))
    }

    unshift(...items: T[]): FluentArray<T> {
        return new FluentArray(Arrays.unshift(this.value, ...items))
    }

    pop(size = 1): FluentArray<T> {
        return new FluentArray(Arrays.pop(this.value, size))
    }

    shift(size = 1): FluentArray<T> {
        return new FluentArray(Arrays.shift(this.value, size))
    }

    splice(start: number, deleteCount?: number): FluentArray<T>
    splice(start: number, deleteCount: number, ...items: T[]): FluentArray<T>
    splice(start: number, deleteCount = 0, ...items: T[]): FluentArray<T> {
        return new FluentArray(Arrays.splice(this.value, start, deleteCount, ...items))
    }

    slice(start?: number, end?: number): FluentArray<T> {
        return new FluentArray(Arrays.slice(this.value, start, end))
    }

    asIterable(): FluentIterable<T> {
        return new FluentIterable(this.value)
    }

    asSet(): FluentSet<T> {
        return new FluentSet(Sets.from(this.value))
    }

    asMultiset(): FluentMultiset<T> {
        return new FluentMultiset(Multisets.from(this.value))
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

    concat(...sets: Set<T>[]): FluentSet<T> {
        return new FluentSet(Sets.concat(this.value, ...sets))
    }

    union(set: Set<T>): FluentSet<T> {
        return new FluentSet(Sets.union(this.value, set))
    }

    intersection(set: Set<T>): FluentSet<T> {
        return new FluentSet(Sets.intersection(this.value, set))
    }

    difference(set: Set<T>): FluentSet<T> {
        return new FluentSet(Sets.difference(this.value, set))
    }

    sysmmetricDifference(set: Set<T>): FluentSet<T> {
        return new FluentSet(Sets.symmetricDifference(this.value, set))
    }

    map<R>(project: (value: T) => R): FluentSet<R> {
        return new FluentSet(Sets.map(this.value, project))
    }

    flatMap<R>(project: (value: T) => R[]): FluentSet<R> {
        return new FluentSet(Sets.flatMap(this.value, project))
    }

    filter(predicate: (value: T) => boolean): FluentSet<T> {
        return new FluentSet(Sets.filter(this.value, predicate))
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
        return new FluentSet(Sets.add(this.value, ...items))
    }

    delete(...items: T[]): FluentSet<T> {
        return new FluentSet(Sets.delete(this.value, ...items))
    }

    asIterable(): FluentIterable<T> {
        return new FluentIterable(this.value)
    }

    asArray(): FluentArray<T> {
        return new FluentArray(Arrays.from(this.value))
    }

    asMultiset(): FluentMultiset<T> {
        return new FluentMultiset(Multisets.from(this.value))
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

    concat(...multisets: Multiset<T>[]): FluentMultiset<T> {
        return new FluentMultiset(Multisets.concat(this.value, ...multisets))
    }

    union(set: Multiset<T>): FluentMultiset<T> {
        return new FluentMultiset(Multisets.union(this.value, set))
    }

    intersection(set: Multiset<T>): FluentMultiset<T> {
        return new FluentMultiset(Multisets.intersection(this.value, set))
    }

    difference(set: Multiset<T>): FluentMultiset<T> {
        return new FluentMultiset(Multisets.difference(this.value, set))
    }

    sysmmetricDifference(set: Multiset<T>): FluentMultiset<T> {
        return new FluentMultiset(Multisets.symmetricDifference(this.value, set))
    }

    sum(set: Multiset<T>): FluentMultiset<T> {
        return new FluentMultiset(Multisets.sum(this.value, set))
    }

    removeOccurrences(set: Multiset<T>): FluentMultiset<T> {
        return new FluentMultiset(Multisets.removeOccurrences(this.value, set))
    }

    retainOccurrences(set: Multiset<T>): FluentMultiset<T> {
        return new FluentMultiset(Multisets.retainOccurrences(this.value, set))
    }

    map<R>(project: (value: T) => R): FluentMultiset<R> {
        return new FluentMultiset(Multisets.map(this.value, project))
    }

    flatMap<R>(project: (value: T) => R[]): FluentMultiset<R> {
        return new FluentMultiset(Multisets.flatMap(this.value, project))
    }

    filter(predicate: (value: T) => boolean): FluentMultiset<T> {
        return new FluentMultiset(Multisets.filter(this.value, predicate))
    }

    filterEntries(predicate: (value: T, count: number) => boolean): FluentMultiset<T> {
        return new FluentMultiset(Multisets.filterEntries(this.value, predicate))
    }

    sortByCount(comparator: Comparator<number>): FluentMultiset<T> {
        return new FluentMultiset(Multisets.sortByCount(this.value, comparator))
    }

    distinct(): FluentMultiset<T> {
        return new FluentMultiset(Multisets.distinct(this.value))
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
        return new FluentMultiset(Multisets.add(this.value, ...items))
    }

    delete(...items: T[]): FluentMultiset<T> {
        return new FluentMultiset(Multisets.delete(this.value, ...items))
    }

    setCount(item: T, count: number): FluentMultiset<T> {
        return new FluentMultiset(Multisets.setCount(this.value, item, count))
    }

    asIterable(): FluentIterable<T> {
        return new FluentIterable(this.value)
    }

    asArray(): FluentArray<T> {
        return new FluentArray(Arrays.from(this.value))
    }

    asSet(): FluentSet<T> {
        return new FluentSet(Sets.from(this.value))
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

    concat(...maps: Map<K, V>[]): FluentMap<K, V> {
        return new FluentMap(Maps.concat(this.value, ...maps))
    }

    transform<T>(project: (entry: [K, V]) => T): FluentMap<K, T> {
        return new FluentMap(Maps.transform(this.value, project))
    }

    filter(predicate: (entry: [K, V]) => boolean): FluentMap<K, V> {
        return new FluentMap(Maps.filter(this.value, predicate))
    }

    forEach(consumer: (entry: [K, V]) => void): void {
        for (const entry of this.value) {
            consumer(entry)
        }
    }

    set(...entries: [K, V][]): FluentMap<K, V> {
        return new FluentMap(Maps.set(this.value, ...entries))
    }

    delete(...keys: K[]): FluentMap<K, V> {
        return new FluentMap(Maps.delete(this.value, ...keys))
    }

    asIterable(): FluentIterable<[K, V]> {
        return new FluentIterable(this.value)
    }

    asArray(): FluentArray<[K, V]> {
        return new FluentArray(Arrays.from(this.value))
    }

    asSet(): FluentSet<[K, V]> {
        return new FluentSet(Sets.from(this.value))
    }

    asMultiset(): FluentMultiset<[K, V]> {
        return new FluentMultiset(Multisets.from(this.value))
    }

    asArrayMultimap(): FluentArrayMultimap<K, V> {
        return new FluentArrayMultimap(ArrayMultimaps.from(this.value))
    }

    asSetMultimap(): FluentSetMultimap<K, V> {
        return new FluentSetMultimap(SetMultimaps.from(this.value))
    }
}

class FluentArrayMultimap<K, V> {
    readonly value: ArrayMultimap<K, V>

    constructor(multimap: ArrayMultimap<K, V>) {
        this.value = multimap
    }

    concat(...multimaps: ArrayMultimap<K, V>[]): FluentArrayMultimap<K, V> {
        return new FluentArrayMultimap(ArrayMultimaps.concat(this.value, ...multimaps))
    }

    transform<T>(project: (entry: [K, V]) => T): FluentArrayMultimap<K, T> {
        return new FluentArrayMultimap(ArrayMultimaps.transform(this.value, project))
    }

    filter(predicate: (entry: [K, V]) => boolean): FluentArrayMultimap<K, V> {
        return new FluentArrayMultimap(ArrayMultimaps.filter(this.value, predicate))
    }

    filterCollections(predicate: (entry: [K, V[]]) => boolean): FluentArrayMultimap<K, V> {
        return new FluentArrayMultimap(ArrayMultimaps.filterCollections(this.value, predicate))
    }

    forEach(consumer: (entry: [K, V]) => void): void {
        for (const entry of this.value) {
            consumer(entry)
        }
    }

    set(...entries: [K, V][]): FluentArrayMultimap<K, V> {
        return new FluentArrayMultimap(ArrayMultimaps.set(this.value, ...entries))
    }

    delete(...entries: [K, V[]][]): FluentArrayMultimap<K, V> {
        return new FluentArrayMultimap(ArrayMultimaps.delete(this.value, ...entries))
    }

    asIterable(): FluentIterable<[K, V]> {
        return new FluentIterable(this.value)
    }

    asArray(): FluentArray<[K, V]> {
        return new FluentArray(Arrays.from(this.value))
    }

    asSet(): FluentSet<[K, V]> {
        return new FluentSet(Sets.from(this.value))
    }

    asMultiset(): FluentMultiset<[K, V]> {
        return new FluentMultiset(Multisets.from(this.value))
    }

    asMap(): FluentMap<K, V> {
        return new FluentMap(Maps.from(this.value))
    }

    asSetMultimap(): FluentSetMultimap<K, V> {
        return new FluentSetMultimap(SetMultimaps.from(this.value))
    }
}

class FluentSetMultimap<K, V> {
    readonly value: SetMultimap<K, V>

    constructor(multimap: SetMultimap<K, V>) {
        this.value = multimap
    }

    concat(...multimaps: SetMultimap<K, V>[]): FluentSetMultimap<K, V> {
        return new FluentSetMultimap(SetMultimaps.concat(this.value, ...multimaps))
    }

    transform<T>(project: (entry: [K, V]) => T): FluentSetMultimap<K, T> {
        return new FluentSetMultimap(SetMultimaps.transform(this.value, project))
    }

    filter(predicate: (entry: [K, V]) => boolean): FluentSetMultimap<K, V> {
        return new FluentSetMultimap(SetMultimaps.filter(this.value, predicate))
    }

    filterCollections(predicate: (entry: [K, Set<V>]) => boolean): FluentSetMultimap<K, V> {
        return new FluentSetMultimap(SetMultimaps.filterCollections(this.value, predicate))
    }

    forEach(consumer: (entry: [K, V]) => void): void {
        for (const entry of this.value) {
            consumer(entry)
        }
    }

    set(...entries: [K, V][]): FluentSetMultimap<K, V> {
        return new FluentSetMultimap(SetMultimaps.set(this.value, ...entries))
    }

    delete(...entries: [K, Set<V>][]): FluentSetMultimap<K, V> {
        return new FluentSetMultimap(SetMultimaps.delete(this.value, ...entries))
    }

    asIterable(): FluentIterable<[K, V]> {
        return new FluentIterable(this.value)
    }

    asArray(): FluentArray<[K, V]> {
        return new FluentArray(Arrays.from(this.value))
    }

    asSet(): FluentSet<[K, V]> {
        return new FluentSet(Sets.from(this.value))
    }

    asMultiset(): FluentMultiset<[K, V]> {
        return new FluentMultiset(Multisets.from(this.value))
    }

    asMap(): FluentMap<K, V> {
        return new FluentMap(Maps.from(this.value))
    }

    asArrayMultimap(): FluentArrayMultimap<K, V> {
        return new FluentArrayMultimap(ArrayMultimaps.from(this.value))
    }
}

export default iter