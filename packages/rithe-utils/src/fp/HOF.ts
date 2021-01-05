import ArrayMultimap from "../collect/ArrayMultimap";
import Multimap from "../collect/Multimap";
import Multiset from "../collect/Multiset";
import SetMultimap from "../collect/SetMultimap";
import BiConsumer from "./BiConsumer";
import BiPredicate from "./BiPredicate";
import BiProject from "./BiProject";
import Consumer from "./Consumer";
import Predicate from "./Predicate";
import Project from "./Project";
import Supplier from "./Supplier";

interface HOF {
    alwaysNull(): () => undefined
    alwaysTrue(): () => true
    alwaysFalse(): () => false
    alwaysZero(): () => 0
    alwaysVoid(): () => void
    identity(): <T>(t: T) => T
    isNull(): <T>(t: T | undefined | null) => boolean
    notNull(): <T>(t: T | undefined | null) => boolean
    getLeft(): <T>(t: T, _: T) => T
    getRight(): <T>(t: T, _: T) => T
    getOrDefault(): <T>(t: T, _: T) => T
    zip(): <T>(t1: T, t2: T) => [T, T]
    constant<T>(c: T): Supplier<T>
    forArray<T>(array: T[]): Project<number, T | undefined>
    forArray<T>(array: T[], defaultValue: T): Project<number, T>
    forMap<K, V>(map: Map<K, V>): Project<K, V | undefined>
    forMap<K, V>(map: Map<K, V>, defaultValue: V): Project<K, V>
    forRecord<K extends string | number | symbol, V>(record: Record<K, V>): Project<K, V | undefined>
    forRecord<K extends string | number | symbol, V>(record: Record<K, V>, defaultValue: V): Project<K, V>
    forMultiset<T>(multiset: Multiset<T>): Project<T, number>
    memberOf<T>(iterable: Iterable<T>): Predicate<T>
    keyOf<K, V>(map: Map<K, V>): Predicate<K>
    keyOf<K>(multimap: Multimap<K, unknown>): Predicate<K>
    propertyOf<K extends string | number | symbol>(record: Record<K, unknown>): Predicate<K>
    valueOf<V>(map: Map<unknown, V>): Predicate<V>
    valueOf<V>(multimap: Multimap<unknown, V>): Predicate<V>
    valueOf<V>(record: Record<any, V>): Predicate<V>
    // eslint-disable-next-line @typescript-eslint/ban-types
    instanceOf<T>(constructor: Function): Predicate<T>
    // eslint-disable-next-line @typescript-eslint/ban-types
    assignableFrom<T>(constructor: Function): Predicate<T>
    // eslint-disable-next-line @typescript-eslint/ban-types
    subtypeOf<T>(constructor: Function): Predicate<T>
    equalsTo<T>(value: T): Predicate<T>
    maybe<T, R>(project: Project<T, R>): Project<T | undefined | null, R | undefined | null>
    not<T>(predicate: Predicate<T>): Predicate<T>
    not<T, U>(predicate: BiPredicate<T, U>): BiPredicate<T, U>
    and<T>(predicate1: Predicate<T>, predicate2: Predicate<T>): Predicate<T>
    and<T, U>(predicate1: BiPredicate<T, U>, predicate2: BiPredicate<T, U>): BiPredicate<T, U>
    or<T>(predicate1: Predicate<T>, predicate2: Predicate<T>): Predicate<T>
    or<T, U>(predicate1: BiPredicate<T, U>, predicate2: BiPredicate<T, U>): BiPredicate<T, U>
    xor<T>(predicate1: Predicate<T>, predicate2: Predicate<T>): Predicate<T>
    xor<T, U>(predicate1: BiPredicate<T, U>, predicate2: BiPredicate<T, U>): BiPredicate<T, U>
    nand<T>(predicate1: Predicate<T>, predicate2: Predicate<T>): Predicate<T>
    nand<T, U>(predicate1: BiPredicate<T, U>, predicate2: BiPredicate<T, U>): BiPredicate<T, U>
    nor<T>(predicate1: Predicate<T>, predicate2: Predicate<T>): Predicate<T>
    nor<T, U>(predicate1: BiPredicate<T, U>, predicate2: BiPredicate<T, U>): BiPredicate<T, U>
    xnor<T>(predicate1: Predicate<T>, predicate2: Predicate<T>): Predicate<T>
    xnor<T, U>(predicate1: BiPredicate<T, U>, predicate2: BiPredicate<T, U>): BiPredicate<T, U>
    concat<T>(...consumers: Consumer<T>[]): Consumer<T>
    concat<T, U>(...consumers: BiConsumer<T, U>[]): BiConsumer<T, U>
    compose<B, C>(fn2: Project<B, C>, fn1: Supplier<B>): Supplier<C>
    compose<A, B, C>(fn2: Project<B, C>, fn1: Project<A, B>): Project<A, C>
    compose<A1, A2, B, C>(fn2: Project<B, C>, fn1: BiProject<A1, A2, B>): BiProject<A1, A2, C>
    compose<B, C, D>(fn3: Project<C, D>, fn2: Project<B, C>, fn1: Supplier<B>): Supplier<D>
    compose<A, B, C, D>(fn3: Project<C, D>, fn2: Project<B, C>, fn1: Project<A, B>): Project<A, D>
    compose<A1, A2, B, C, D>(fn3: Project<C, D>, fn2: Project<B, C>, fn1: BiProject<A1, A2, B>): BiProject<A1, A2, D>
    compose<B, C, D, E>(fn4: Project<D, E>, fn3: Project<C, D>, fn2: Project<B, C>, fn1: Supplier<B>): Supplier<E>
    compose<A, B, C, D, E>(fn4: Project<D, E>, fn3: Project<C, D>, fn2: Project<B, C>, fn1: Project<A, B>): Project<A, E>
    compose<A1, A2, B, C, D, E>(fn4: Project<D, E>, fn3: Project<C, D>, fn2: Project<B, C>, fn1: BiProject<A1, A2, B>): BiProject<A1, A2, E>
    compose<B, C, D, E, F>(fn5: Project<E, F>, fn4: Project<D, E>, fn3: Project<C, D>, fn2: Project<B, C>, fn1: Supplier<B>): Supplier<F>
    compose<A, B, C, D, E, F>(fn5: Project<E, F>, fn4: Project<D, E>, fn3: Project<C, D>, fn2: Project<B, C>, fn1: Project<A, B>): Project<A, F>
    compose<A1, A2, B, C, D, E, F>(fn5: Project<E, F>, fn4: Project<D, E>, fn3: Project<C, D>, fn2: Project<B, C>, fn1: BiProject<A1, A2, B>): BiProject<A1, A2, F>
    pipe<B, C>(fn1: Supplier<B>, fn2: Project<B, C>): Supplier<C>
    pipe<A, B, C>(fn1: Project<A, B>, fn2: Project<B, C>): Project<A, C>
    pipe<A1, A2, B, C>(fn1: BiProject<A1, A2, B>, fn2: Project<B, C>): BiProject<A1, A2, C>
    pipe<B, C, D>(fn1: Supplier<B>, fn2: Project<B, C>, fn3: Project<C, D>): Supplier<D>
    pipe<A, B, C, D>(fn1: Project<A, B>, fn2: Project<B, C>, fn3: Project<C, D>): Project<A, D>
    pipe<A1, A2, B, C, D>(fn1: BiProject<A1, A2, B>, fn2: Project<B, C>, fn3: Project<C, D>): BiProject<A1, A2, D>
    pipe<B, C, D, E>(fn1: Supplier<B>, fn2: Project<B, C>, fn3: Project<C, D>, fn4: Project<D, E>): Supplier<E>
    pipe<A, B, C, D, E>(fn1: Project<A, B>, fn2: Project<B, C>, fn3: Project<C, D>, fn4: Project<D, E>): Project<A, E>
    pipe<A1, A2, B, C, D, E>(fn1: BiProject<A1, A2, B>, fn2: Project<B, C>, fn3: Project<C, D>, fn4: Project<D, E>): BiProject<A1, A2, E>
    pipe<B, C, D, E, F>(fn1: Supplier<B>, fn2: Project<B, C>, fn3: Project<C, D>, fn4: Project<D, E>, fn5: Project<E, F>): Supplier<F>
    pipe<A, B, C, D, E, F>(fn1: Project<A, B>, fn2: Project<B, C>, fn3: Project<C, D>, fn4: Project<D, E>, fn5: Project<E, F>): Project<A, F>
    pipe<A1, A2, B, C, D, E, F>(fn1: BiProject<A1, A2, B>, fn2: Project<B, C>, fn3: Project<C, D>, fn4: Project<D, E>, fn5: Project<E, F>): BiProject<A1, A2, F>
}

const hof: HOF = {} as any

const ALWAYS_NULL = () => undefined
hof.alwaysNull = () => ALWAYS_NULL

const ALWAYS_TRUE = () => true
hof.alwaysTrue = () => ALWAYS_TRUE as () => true

const ALWAYS_FALSE = () => false
hof.alwaysFalse = () => ALWAYS_FALSE as () => false

const ALWAYS_ZERO = () => 0
hof.alwaysZero = () => ALWAYS_ZERO as () => 0

const ALWAYS_VOID = () => { /* Do nothing */ }
hof.alwaysVoid = () => ALWAYS_VOID

const IDENTITY = <T>(t: T) => t
hof.identity = () => IDENTITY

const IS_NULL = <T>(t: T | undefined | null) => t === undefined || t === null
hof.isNull = () => IS_NULL

const NOT_NULL = <T>(t: T | undefined | null) => t !== undefined || t !== null
hof.notNull = () => NOT_NULL

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GET_LEFT = <T>(t: T, _: T) => t
hof.getLeft = () => GET_LEFT

const GET_RIGHT = <T>(_: T, t: T) => t
hof.getRight = () => GET_RIGHT

const GET_OR_DEFAULT = <T>(t: T | undefined | null, d: T) => NOT_NULL(t) ? t as T : d
hof.getOrDefault = () => GET_OR_DEFAULT

const ZIP = <T>(t1: T, t2: T) => [t1, t2]
hof.zip = () => ZIP as <T>(t1: T, t2: T) => [T, T]

hof.constant = <T>(c: T): Supplier<T> => {
    return () => c
}

hof.forArray = <T>(array: T[], defaultValue?: T): Project<number, T | undefined> => {
    return index => index >= array.length ? array[index] : defaultValue
}

hof.forMap = <K, V>(map: Map<K, V>, defaultValue?: V): Project<K, V | undefined> => {
    return key => map.has(key) ? map.get(key) : defaultValue
}

hof.forRecord = <K extends string | number | symbol, V>(record: Record<K, V>, defaultValue?: V): Project<K, V | undefined> => {
    return key => {
        for (const prop in record) if (prop === key) return record[prop]
        return defaultValue
    }
}

hof.forMultiset = <T>(multiset: Multiset<T>): Project<T, number> => {
    return value => multiset.count(value)
}

hof.memberOf = <T>(iterable: Iterable<T>): Predicate<T> => {
    if (iterable instanceof Array) {
        return value => iterable.indexOf(value) >= 0
    } else if (iterable instanceof Set || iterable instanceof Multiset) {
        return value => iterable.has(value)
    } else {
        return value => {
            for (const item of iterable) if (item === value) return true
            return false
        }
    }
}

hof.keyOf = <K>(m: Map<K, unknown> | Multimap<K, unknown>): Predicate<K> => {
    return key => m.has(key)
}

hof.propertyOf = <K extends string | number | symbol>(record: Record<K, unknown>): Predicate<K> => {
    return key => {
        for (const prop in record) if (prop === key) return true
        return false
    }
}

hof.valueOf = <V>(m: any): Predicate<V> => {
    if (m instanceof Map || m instanceof ArrayMultimap || m instanceof SetMultimap) {
        return value => {
            for (const entry of m.entries()) if (entry[1] === value) return true
            return false
        }
    } else {
        return value => {
            for (const prop of m) if (m[prop] === value) return true
            return false
        }
    }
}

hof.instanceOf = <T>(constructor: any): Predicate<T> => {
    return v => v instanceof constructor
}

hof.assignableFrom = <T>(constructor: any): Predicate<T> => {
    // eslint-disable-next-line no-prototype-builtins
    return v => constructor.prototype?.isPrototypeOf(v)
}

hof.subtypeOf = <T>(constructor: any): Predicate<T> => {
    return v => v instanceof constructor && Object.getPrototypeOf(v) !== constructor.prototype
}

hof.equalsTo = <T>(value: T): Predicate<T> => {
    return t => t === value
}

hof.maybe = <T, R>(project: Project<T, R>): Project<T | undefined | null, R | undefined | null> => {
    return t => NOT_NULL(t) ? project(t as T) : t as undefined | null
}

hof.not = (predicate: any): any => {
    return (t: any, u: any) => !predicate(t, u);
}

hof.and = (predicate1: any, predicate2: any): any => {
    return (t: any, u: any) => predicate1(t, u) && predicate2(t, u);
}

hof.or = (predicate1: any, predicate2: any): any => {
    return (t: any, u: any) => predicate1(t, u) || predicate2(t, u);
}

hof.xor = (predicate1: any, predicate2: any): any => {
    return (t: any, u: any) => predicate1(t, u) !== predicate2(t, u);
}

hof.nand = (predicate1: any, predicate2: any): any => {
    return (t: any, u: any) => !predicate1(t, u) || !predicate2(t, u);
}

hof.nor = (predicate1: any, predicate2: any): any => {
    return (t: any, u: any) => !predicate1(t, u) && !predicate2(t, u);
}

hof.xnor = (predicate1: any, predicate2: any): any => {
    return (t: any, u: any) => predicate1(t, u) === predicate2(t, u);
}

hof.concat = (...consumers: any[]): any => {
    return (t: any, u: any) => consumers.forEach(consumer => consumer(t, u))
}

hof.compose = (...fns: any[]): any => {
    return fns.reduce((fn1, fn2) => (t: any, u: any) => fn1(fn2(t, u)))
}

hof.pipe = (...fns: any[]): any => {
    return fns.reduce((fn1, fn2) => (t: any, u: any) => fn2(fn1(t, u)))
}

export default hof