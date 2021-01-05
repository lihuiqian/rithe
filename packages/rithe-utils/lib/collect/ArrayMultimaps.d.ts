import ArrayMultimap from "./ArrayMultimap";
declare function empty(): ArrayMultimap<unknown, unknown>;
declare function from<K, V>(iterable: Iterable<[K, V]>): ArrayMultimap<K, V>;
declare function invertFrom<K, V>(map: Map<K, V>): ArrayMultimap<V, K>;
declare function concat<K, V>(...multimaps: ArrayMultimap<K, V>[]): ArrayMultimap<K, V>;
declare function transform<K, V, T>(multimap: ArrayMultimap<K, V>, project: (entry: [K, V]) => T): ArrayMultimap<K, T>;
declare function filter<K, V>(multimap: ArrayMultimap<K, V>, predicate: (entry: [K, V]) => boolean): ArrayMultimap<K, V>;
declare function filterCollections<K, V>(multimap: ArrayMultimap<K, V>, predicate: (entry: [K, V[]]) => boolean): ArrayMultimap<K, V>;
declare function elementsEqual<K, V>(multimap1: ArrayMultimap<K, V>, multimap2: ArrayMultimap<K, V>): boolean;
declare function set<K, V>(multimap: ArrayMultimap<K, V>, ...entries: [K, V][]): ArrayMultimap<K, V>;
declare function _delete<K, V>(multimap: ArrayMultimap<K, V>, ...entries: [K, V[] | undefined][]): ArrayMultimap<K, V>;
declare const _default: {
    empty: typeof empty;
    from: typeof from;
    invertFrom: typeof invertFrom;
    concat: typeof concat;
    transform: typeof transform;
    filter: typeof filter;
    filterCollections: typeof filterCollections;
    elementsEqual: typeof elementsEqual;
    set: typeof set;
    delete: typeof _delete;
};
export default _default;
//# sourceMappingURL=ArrayMultimaps.d.ts.map