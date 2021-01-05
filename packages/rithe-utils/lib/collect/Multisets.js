"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Comparators_1 = __importDefault(require("../base/Comparators"));
var Iterables_1 = __importDefault(require("./Iterables"));
var Multiset_1 = __importDefault(require("./Multiset"));
function empty() {
    return new Multiset_1.default();
}
function from(iterable) {
    return new Multiset_1.default(iterable);
}
function resultFrom(map) {
    var result = new Multiset_1.default();
    map.forEach(function (count, value) { return result.setCount(value, count); });
    return result;
}
function countFrom(multimap) {
    var result = new Multiset_1.default();
    multimap.forEach(function (_, value) { return result.add(value); });
    return result;
}
function range(start, count, step) {
    if (step === void 0) { step = 1; }
    return new Multiset_1.default(Iterables_1.default.range(start, count, step));
}
function concat() {
    var multisets = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        multisets[_i] = arguments[_i];
    }
    return multisets.reduce(function (acc, multiset) { return (multiset.forEachEntry(function (value, count) { return acc.setCount(value, acc.count(value) + count); }), acc); }, new Multiset_1.default());
}
function union(multiset1, multiset2) {
    var result = new Multiset_1.default(multiset1);
    multiset2.forEachEntry(function (value, count) { return result.count(value) < count && result.setCount(value, count); });
    return result;
}
function intersection(multiset1, multiset2) {
    var result = new Multiset_1.default();
    multiset1.forEachEntry(function (value, count) { return multiset2.has(value) && result.setCount(value, Math.min(count, multiset2.count(value))); });
    return result;
}
function difference(multiset1, multiset2) {
    var result = new Multiset_1.default(multiset1);
    multiset2.forEachEntry(function (value, count) { return result.has(value) && result.setCount(value, Math.max(0, result.count(value) - count)); });
    return result;
}
function symmetricDifference(multiset1, multiset2) {
    var result = new Multiset_1.default(multiset1);
    multiset2.forEachEntry(function (value, count) { return result.setCount(value, result.has(value) ? Math.abs(count - result.count(value)) : count); });
    return result;
}
function sum(multiset1, multiset2) {
    var result = new Multiset_1.default(multiset1);
    multiset2.forEachEntry(function (value, count) { return result.setCount(value, result.count(value) + count); });
    return result;
}
function removeOccurrences(multiset1, multiset2) {
    var result = new Multiset_1.default(multiset1);
    multiset2.forEachEntry(function (value, count) { return result.setCount(value, result.count(value) - count); });
    return result;
}
function retainOccurrences(multiset1, multiset2) {
    var result = new Multiset_1.default(multiset1);
    multiset2.forEachEntry(function (value, count) { return result.setCount(value, Math.min(result.count(value), count)); });
    return result;
}
function map(multiset, project) {
    return new Multiset_1.default(Iterables_1.default.map(multiset, project));
}
function flatMap(multiset, project) {
    return new Multiset_1.default(Iterables_1.default.flatMap(multiset, project));
}
function filter(multiset, predicate) {
    var result = new Multiset_1.default();
    multiset.forEachEntry(function (value, count) { return predicate(value) && result.setCount(value, count); });
    return result;
}
function filterEntries(multiset, predicate) {
    var result = new Multiset_1.default();
    multiset.forEachEntry(function (value, count) { return predicate(value, count) && result.setCount(value, count); });
    return result;
}
function sortByCount(multiset, comparator) {
    var entries = Iterables_1.default.sort(multiset.entries(), Comparators_1.default.compare(function (entry) { return entry[1]; }, comparator));
    return resultFrom(new Map(entries));
}
function distinct(multiset) {
    var result = new Multiset_1.default();
    multiset.forEachEntry(function (value) { return result.add(value); });
    return result;
}
function partition(multiset, size) {
    return Iterables_1.default.partition(multiset, size).map(from);
}
function first(multiset, defaultValue) {
    var firstEntry = multiset.entries().next().value;
    return firstEntry === undefined ? defaultValue : firstEntry[0];
}
function max(multiset, comparator) {
    var first = true;
    var acc = undefined;
    multiset.forEachEntry(function (item) {
        if (first) {
            first = false;
            acc = item;
        }
        else if (comparator(acc, item) < 0) {
            acc = item;
        }
    });
    return acc;
}
function min(multiset, comparator) {
    var first = true;
    var acc = undefined;
    multiset.forEachEntry(function (item) {
        if (first) {
            first = false;
            acc = item;
        }
        else if (comparator(acc, item) > 0) {
            acc = item;
        }
    });
    return acc;
}
function elementsEqual(multiset1, multiset2) {
    var e_1, _a;
    if (multiset1.size !== multiset2.size)
        return false;
    try {
        for (var _b = __values(multiset1.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), value = _d[0], count = _d[1];
            if (multiset2.count(value) !== count)
                return false;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return true;
}
function add(multiset) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    var result = new Multiset_1.default(multiset);
    items.forEach(result.add);
    return result;
}
function delete_(multiset) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    var result = new Multiset_1.default(multiset);
    items.forEach(result.delete);
    return result;
}
function setCount(multiset, item, count) {
    var result = new Multiset_1.default(multiset);
    result.setCount(item, count);
    return result;
}
exports.default = {
    empty: empty,
    from: from,
    resultFrom: resultFrom,
    countFrom: countFrom,
    range: range,
    concat: concat,
    union: union,
    intersection: intersection,
    difference: difference,
    symmetricDifference: symmetricDifference,
    sum: sum,
    removeOccurrences: removeOccurrences,
    retainOccurrences: retainOccurrences,
    map: map,
    flatMap: flatMap,
    filter: filter,
    filterEntries: filterEntries,
    sortByCount: sortByCount,
    distinct: distinct,
    partition: partition,
    first: first,
    max: max,
    min: min,
    elementsEqual: elementsEqual,
    add: add,
    delete: delete_,
    setCount: setCount,
};
//# sourceMappingURL=Multisets.js.map