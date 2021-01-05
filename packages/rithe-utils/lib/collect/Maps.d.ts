import Project from "../fp/Project";
declare function empty(): Map<any, any>;
declare function from<K, V>(iterable: Iterable<[K, V]>): Map<K, V>;
declare function concat<K, V>(...maps: Map<K, V>[]): Map<K, V>;
declare function transform<K, V, T>(map: Map<K, V>, project: Project<[K, V], T>): Map<K, T>;
declare function filter<K, V>(map: Map<K, V>, predicate: (entry: [K, V]) => boolean): Map<K, V>;
declare function elementsEqual<K, V>(map1: Map<K, V>, map2: Map<K, V>): boolean;
declare function set<K, V>(map: Map<K, V>, ...entries: [K, V][]): Map<K, V>;
declare function delete_<K, V>(map: Map<K, V>, ...keys: K[]): Map<K, V>;
declare const _default: {
    empty: typeof empty;
    from: typeof from;
    concat: typeof concat;
    transform: typeof transform;
    filter: typeof filter;
    set: typeof set;
    delete: typeof delete_;
    elementsEqual: typeof elementsEqual;
};
export default _default;
//# sourceMappingURL=Maps.d.ts.map