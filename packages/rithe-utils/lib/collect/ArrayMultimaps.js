"use strict";
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayMultimap_1 = __importDefault(require("./ArrayMultimap"));
var Arrays_1 = __importDefault(require("./Arrays"));
var Iterables_1 = __importDefault(require("./Iterables"));
function empty() {
    return new ArrayMultimap_1.default();
}
function from(iterable) {
    return new ArrayMultimap_1.default(iterable);
}
function invertFrom(map) {
    return new ArrayMultimap_1.default(Iterables_1.default.map(map, function (_a) {
        var _b = __read(_a, 2), k = _b[0], v = _b[1];
        return [v, k];
    }));
}
function concat() {
    var multimaps = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        multimaps[_i] = arguments[_i];
    }
    return multimaps.reduce(function (acc, multimap) { return (multimap.forEach(function (value, key) { return acc.set(key, value); }), acc); }, new ArrayMultimap_1.default());
}
function transform(multimap, project) {
    var result = new ArrayMultimap_1.default();
    multimap.forEach(function (value, key) { return result.set(key, project([key, value])); });
    return result;
}
function filter(multimap, predicate) {
    return new ArrayMultimap_1.default(Iterables_1.default.filter(multimap, predicate));
}
function filterCollections(multimap, predicate) {
    var result = new ArrayMultimap_1.default();
    multimap.forEachCollection(function (collection, key) {
        var e_1, _a;
        if (predicate([key, collection]))
            try {
                for (var collection_1 = __values(collection), collection_1_1 = collection_1.next(); !collection_1_1.done; collection_1_1 = collection_1.next()) {
                    var value = collection_1_1.value;
                    result.set(key, value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (collection_1_1 && !collection_1_1.done && (_a = collection_1.return)) _a.call(collection_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
    });
    return result;
}
function elementsEqual(multimap1, multimap2) {
    if (multimap1.size !== multimap2.size || multimap1.keySize !== multimap2.keySize)
        return false;
    var result = true;
    multimap1.forEachCollection(function (collection, key) {
        var collection2 = multimap2.get(key);
        if (!collection2 || !Arrays_1.default.elementsEqual(collection, collection2))
            result = false;
    });
    return result;
}
function set(multimap) {
    var entries = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        entries[_i - 1] = arguments[_i];
    }
    var result = new ArrayMultimap_1.default(multimap);
    entries.forEach(function (_a) {
        var _b = __read(_a, 2), key = _b[0], value = _b[1];
        return result.set(key, value);
    });
    return result;
}
function _delete(multimap) {
    var entries = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        entries[_i - 1] = arguments[_i];
    }
    var result = new ArrayMultimap_1.default(multimap);
    entries.forEach(function (_a) {
        var _b = __read(_a, 2), key = _b[0], _c = _b[1], values = _c === void 0 ? [] : _c;
        return result.delete.apply(result, __spread([key], values));
    });
    return result;
}
exports.default = {
    empty: empty,
    from: from,
    invertFrom: invertFrom,
    concat: concat,
    transform: transform,
    filter: filter,
    filterCollections: filterCollections,
    elementsEqual: elementsEqual,
    set: set,
    delete: _delete,
};
//# sourceMappingURL=ArrayMultimaps.js.map