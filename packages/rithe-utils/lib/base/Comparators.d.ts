import Project from "../fp/Project";
import Comparator from "./Comparator";
declare function natualOrder<T>(): Comparator<T>;
declare function reverseOrder<T>(): Comparator<T>;
declare function lexicographical(): Comparator<string>;
declare function lexicographical<T>(fn: Project<T, string>): Comparator<T>;
declare function allEqual<T>(): Comparator<T>;
declare function explicit<T>(...orders: T[]): Comparator<T>;
declare function reverse<T>(cmp: Comparator<T>): Comparator<T>;
declare function nullsFirst<T>(cmp: Comparator<T>): Comparator<T | undefined | null>;
declare function nullsLast<T>(cmp: Comparator<T>): Comparator<T | undefined | null>;
declare function compare<T, U>(fn: Project<T, U>, cmp: Comparator<U>): Comparator<T>;
declare const _default: {
    NATUAL_ORDER: <T>(a: T, b: T) => 1 | -1 | 0;
    REVERSE_ORDER: <T_1>(a: T_1, b: T_1) => 1 | -1 | 0;
    LEXICOGRAPHICAL: Comparator<string>;
    ALL_EQUAL: () => 0 | 1 | -1;
    natualOrder: typeof natualOrder;
    reverseOrder: typeof reverseOrder;
    lexicographical: typeof lexicographical;
    allEqual: typeof allEqual;
    explicit: typeof explicit;
    reverse: typeof reverse;
    nullsFirst: typeof nullsFirst;
    nullsLast: typeof nullsLast;
    compare: typeof compare;
};
export default _default;
//# sourceMappingURL=Comparators.d.ts.map