import SetMultimap from "./SetMultimap";
declare function empty(): SetMultimap<unknown, unknown>;
declare function from<K, V>(iterable: Iterable<[K, V]>): SetMultimap<K, V>;
declare function invertFrom<K, V>(map: Map<K, V>): SetMultimap<V, K>;
declare function concat<K, V>(...multimaps: SetMultimap<K, V>[]): SetMultimap<K, V>;
declare function transform<K, V, T>(multimap: SetMultimap<K, V>, project: (entry: [K, V]) => T): SetMultimap<K, T>;
declare function filter<K, V>(multimap: SetMultimap<K, V>, predicate: (entry: [K, V]) => boolean): SetMultimap<K, V>;
declare function filterCollections<K, V>(multimap: SetMultimap<K, V>, predicate: (entry: [K, Set<V>]) => boolean): SetMultimap<K, V>;
declare function elementsEqual<K, V>(multimap1: SetMultimap<K, V>, multimap2: SetMultimap<K, V>): boolean;
declare function set<K, V>(multimap: SetMultimap<K, V>, ...entries: [K, V][]): SetMultimap<K, V>;
declare function _delete<K, V>(multimap: SetMultimap<K, V>, ...entries: [K, Set<V> | undefined][]): SetMultimap<K, V>;
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
//# sourceMappingURL=SetMultimaps.d.ts.map