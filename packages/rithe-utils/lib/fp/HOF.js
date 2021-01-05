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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayMultimap_1 = __importDefault(require("../collect/ArrayMultimap"));
var Multiset_1 = __importDefault(require("../collect/Multiset"));
var SetMultimap_1 = __importDefault(require("../collect/SetMultimap"));
var hof = {};
var ALWAYS_NULL = function () { return undefined; };
hof.alwaysNull = function () { return ALWAYS_NULL; };
var ALWAYS_TRUE = function () { return true; };
hof.alwaysTrue = function () { return ALWAYS_TRUE; };
var ALWAYS_FALSE = function () { return false; };
hof.alwaysFalse = function () { return ALWAYS_FALSE; };
var ALWAYS_ZERO = function () { return 0; };
hof.alwaysZero = function () { return ALWAYS_ZERO; };
var ALWAYS_VOID = function () { };
hof.alwaysVoid = function () { return ALWAYS_VOID; };
var IDENTITY = function (t) { return t; };
hof.identity = function () { return IDENTITY; };
var IS_NULL = function (t) { return t === undefined || t === null; };
hof.isNull = function () { return IS_NULL; };
var NOT_NULL = function (t) { return t !== undefined || t !== null; };
hof.notNull = function () { return NOT_NULL; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var GET_LEFT = function (t, _) { return t; };
hof.getLeft = function () { return GET_LEFT; };
var GET_RIGHT = function (_, t) { return t; };
hof.getRight = function () { return GET_RIGHT; };
var GET_OR_DEFAULT = function (t, d) { return NOT_NULL(t) ? t : d; };
hof.getOrDefault = function () { return GET_OR_DEFAULT; };
var ZIP = function (t1, t2) { return [t1, t2]; };
hof.zip = function () { return ZIP; };
hof.constant = function (c) {
    return function () { return c; };
};
hof.forArray = function (array, defaultValue) {
    return function (index) { return index >= array.length ? array[index] : defaultValue; };
};
hof.forMap = function (map, defaultValue) {
    return function (key) { return map.has(key) ? map.get(key) : defaultValue; };
};
hof.forRecord = function (record, defaultValue) {
    return function (key) {
        for (var prop in record)
            if (prop === key)
                return record[prop];
        return defaultValue;
    };
};
hof.forMultiset = function (multiset) {
    return function (value) { return multiset.count(value); };
};
hof.memberOf = function (iterable) {
    if (iterable instanceof Array) {
        return function (value) { return iterable.indexOf(value) >= 0; };
    }
    else if (iterable instanceof Set || iterable instanceof Multiset_1.default) {
        return function (value) { return iterable.has(value); };
    }
    else {
        return function (value) {
            var e_1, _a;
            try {
                for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                    var item = iterable_1_1.value;
                    if (item === value)
                        return true;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return false;
        };
    }
};
hof.keyOf = function (m) {
    return function (key) { return m.has(key); };
};
hof.propertyOf = function (record) {
    return function (key) {
        for (var prop in record)
            if (prop === key)
                return true;
        return false;
    };
};
hof.valueOf = function (m) {
    if (m instanceof Map || m instanceof ArrayMultimap_1.default || m instanceof SetMultimap_1.default) {
        return function (value) {
            var e_2, _a;
            try {
                for (var _b = __values(m.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var entry = _c.value;
                    if (entry[1] === value)
                        return true;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return false;
        };
    }
    else {
        return function (value) {
            var e_3, _a;
            try {
                for (var m_1 = __values(m), m_1_1 = m_1.next(); !m_1_1.done; m_1_1 = m_1.next()) {
                    var prop = m_1_1.value;
                    if (m[prop] === value)
                        return true;
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (m_1_1 && !m_1_1.done && (_a = m_1.return)) _a.call(m_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return false;
        };
    }
};
hof.instanceOf = function (constructor) {
    return function (v) { return v instanceof constructor; };
};
hof.assignableFrom = function (constructor) {
    // eslint-disable-next-line no-prototype-builtins
    return function (v) { var _a; return (_a = constructor.prototype) === null || _a === void 0 ? void 0 : _a.isPrototypeOf(v); };
};
hof.subtypeOf = function (constructor) {
    return function (v) { return v instanceof constructor && Object.getPrototypeOf(v) !== constructor.prototype; };
};
hof.equalsTo = function (value) {
    return function (t) { return t === value; };
};
hof.maybe = function (project) {
    return function (t) { return NOT_NULL(t) ? project(t) : t; };
};
hof.not = function (predicate) {
    return function (t, u) { return !predicate(t, u); };
};
hof.and = function (predicate1, predicate2) {
    return function (t, u) { return predicate1(t, u) && predicate2(t, u); };
};
hof.or = function (predicate1, predicate2) {
    return function (t, u) { return predicate1(t, u) || predicate2(t, u); };
};
hof.xor = function (predicate1, predicate2) {
    return function (t, u) { return predicate1(t, u) !== predicate2(t, u); };
};
hof.nand = function (predicate1, predicate2) {
    return function (t, u) { return !predicate1(t, u) || !predicate2(t, u); };
};
hof.nor = function (predicate1, predicate2) {
    return function (t, u) { return !predicate1(t, u) && !predicate2(t, u); };
};
hof.xnor = function (predicate1, predicate2) {
    return function (t, u) { return predicate1(t, u) === predicate2(t, u); };
};
hof.concat = function () {
    var consumers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        consumers[_i] = arguments[_i];
    }
    return function (t, u) { return consumers.forEach(function (consumer) { return consumer(t, u); }); };
};
hof.compose = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return fns.reduce(function (fn1, fn2) { return function (t, u) { return fn1(fn2(t, u)); }; });
};
hof.pipe = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return fns.reduce(function (fn1, fn2) { return function (t, u) { return fn2(fn1(t, u)); }; });
};
exports.default = hof;
//# sourceMappingURL=HOF.js.map