"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Iterables_1 = __importDefault(require("./Iterables"));
function empty() {
    return new Set();
}
function from(iterable) {
    return new Set(iterable);
}
function range(start, count, step) {
    if (step === void 0) { step = 1; }
    return new Set(Iterables_1.default.range(start, count, step));
}
function concat() {
    var sets = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sets[_i] = arguments[_i];
    }
    return sets.reduce(union, new Set());
}
function union(set1, set2) {
    var result = new Set(set1);
    set2.forEach(result.add);
    return result;
}
function intersection(set1, set2) {
    var result = new Set();
    set1.forEach(function (item) { return set2.has(item) && result.add(item); });
    return result;
}
function difference(set1, set2) {
    var result = new Set(set1);
    set2.forEach(result.delete);
    return result;
}
function symmetricDifference(set1, set2) {
    var result = new Set(set1);
    set2.forEach(function (item) { return result.has(item) ? result.delete(item) : result.add(item); });
    return result;
}
function map(set, project) {
    return new Set(Iterables_1.default.map(set, project));
}
function flatMap(set, project) {
    return new Set(Iterables_1.default.flatMap(set, project));
}
function filter(set, predicate) {
    return new Set(Iterables_1.default.filter(set, predicate));
}
function partition(set, size) {
    return Iterables_1.default.partition(set, size).map(function (it) { return from(it); });
}
function first(set, defaultValue) {
    return Iterables_1.default.first(set, defaultValue);
}
function max(set, comparator) {
    return Iterables_1.default.max(set, comparator);
}
function min(set, comparator) {
    return Iterables_1.default.min(set, comparator);
}
function elementsEqual(set1, set2) {
    if (set1.size !== set2.size)
        return false;
    var result = true;
    set1.forEach(function (item) { return result && !set2.has(item) && (result = false); });
    return result;
}
function add(set) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    var result = new Set(set);
    items.forEach(result.add);
    return result;
}
function delete_(set) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    var result = new Set(set);
    items.forEach(result.delete);
    return result;
}
exports.default = {
    empty: empty,
    from: from,
    range: range,
    concat: concat,
    union: union,
    intersection: intersection,
    difference: difference,
    symmetricDifference: symmetricDifference,
    map: map,
    flatMap: flatMap,
    filter: filter,
    partition: partition,
    first: first,
    max: max,
    min: min,
    elementsEqual: elementsEqual,
    add: add,
    delete: delete_,
};
//# sourceMappingURL=Sets.js.map