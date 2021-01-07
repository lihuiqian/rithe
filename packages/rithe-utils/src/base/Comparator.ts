type ComparatorResult = -1 | 0 | 1

interface Comparator<T> {
    (a: T, b: T): ComparatorResult
}

export default Comparator