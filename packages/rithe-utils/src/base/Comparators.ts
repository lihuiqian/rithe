import hof from "../fp/HOF";
import Project from "../fp/Project";
import Comparator from "./Comparator";

const NATUAL_ORDER = <T>(a: T, b: T) => a > b ? 1 : a < b ? -1 : 0

function natualOrder<T>(): Comparator<T> {
    return NATUAL_ORDER
}

const REVERSE_ORDER = <T>(a: T, b: T) => a > b ? -1 : a < b ? 1 : 0

function reverseOrder<T>(): Comparator<T> {
    return REVERSE_ORDER
}

const LEXICOGRAPHICAL: Comparator<string> = NATUAL_ORDER

function lexicographical(): Comparator<string>
function lexicographical<T>(fn: Project<T, string>): Comparator<T>;
function lexicographical(fn?: Project<any, string>): Comparator<any> {
    return (a, b) => fn ? LEXICOGRAPHICAL(fn(a), fn(b)) : LEXICOGRAPHICAL(a, b)
}

const ALL_EQUAL = (): -1 | 0 | 1 => 0

function allEqual<T>(): Comparator<T> {
    return ALL_EQUAL
}

function explicit<T>(...orders: T[]): Comparator<T> {
    const map = new Map<T, number>(orders.map((value, index) => [value, index]))
    const fn = hof.forMap(map)
    return compare(fn, nullsLast(NATUAL_ORDER))
}

function reverse<T>(cmp: Comparator<T>): Comparator<T> {
    return (a, b) => cmp(b, a)
}

function nullsFirst<T>(cmp: Comparator<T>): Comparator<T | undefined | null> {
    return (a, b) => {
        const aIsNull = a === undefined || a === null
        const bIsNull = b === undefined || b === null
        return aIsNull ? (bIsNull ? 0 : -1) : (bIsNull ? 1 : cmp(a as T, b as T))
    }
}

function nullsLast<T>(cmp: Comparator<T>): Comparator<T | undefined | null> {
    return (a, b) => {
        const aIsNull = a === undefined || a === null
        const bIsNull = b === undefined || b === null
        return aIsNull ? (bIsNull ? 0 : 1) : (bIsNull ? -1 : cmp(a as T, b as T))
    }
}

function compare<T, U>(fn: Project<T, U>, cmp: Comparator<U>): Comparator<T> {
    return (a, b) => cmp(fn(a), fn(b))
}

export default {
    NATUAL_ORDER,
    REVERSE_ORDER,
    LEXICOGRAPHICAL,
    ALL_EQUAL,
    natualOrder,
    reverseOrder,
    lexicographical,
    allEqual,
    explicit,
    reverse,
    nullsFirst,
    nullsLast,
    compare,
}