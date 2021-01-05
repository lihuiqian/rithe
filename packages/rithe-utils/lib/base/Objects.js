"use strict";
/* eslint-disable @typescript-eslint/ban-types */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var EMPTY = {};
function empty() {
    return EMPTY;
}
function of(object) {
    return __assign({}, object);
}
function concat() {
    var e_1, _a;
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    var result = {};
    try {
        for (var objects_1 = __values(objects), objects_1_1 = objects_1.next(); !objects_1_1.done; objects_1_1 = objects_1.next()) {
            var object = objects_1_1.value;
            Object.assign(result, object);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (objects_1_1 && !objects_1_1.done && (_a = objects_1.return)) _a.call(objects_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
}
function set(object) {
    var e_2, _a;
    var entries = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        entries[_i - 1] = arguments[_i];
    }
    if (entries.length === 0)
        return object;
    var result = of(object);
    try {
        for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
            var _b = __read(entries_1_1.value, 2), key = _b[0], value = _b[1];
            result[key] = value;
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return)) _a.call(entries_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return result;
}
function _delete(object) {
    var e_3, _a;
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    if (keys.length === 0)
        return object;
    var result = of(object);
    try {
        for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
            var key = keys_1_1.value;
            delete result[key];
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return result;
}
function trim(object) {
    var e_4, _a, e_5, _b;
    var names = Object.getOwnPropertyNames(object);
    var symbols = Object.getOwnPropertySymbols(object);
    var descriptors = Object.getOwnPropertyDescriptors(object);
    var keys = [];
    try {
        for (var names_1 = __values(names), names_1_1 = names_1.next(); !names_1_1.done; names_1_1 = names_1.next()) {
            var name_1 = names_1_1.value;
            var descriptor = descriptors[name_1];
            descriptor.enumerable && descriptor.get && object[name_1] === undefined && keys.push(name_1);
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (names_1_1 && !names_1_1.done && (_a = names_1.return)) _a.call(names_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
    try {
        for (var symbols_1 = __values(symbols), symbols_1_1 = symbols_1.next(); !symbols_1_1.done; symbols_1_1 = symbols_1.next()) {
            var symbol = symbols_1_1.value;
            var descriptor = descriptors[symbol];
            descriptor.enumerable && descriptor.get && object[symbol] === undefined && keys.push(symbol);
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (symbols_1_1 && !symbols_1_1.done && (_b = symbols_1.return)) _b.call(symbols_1);
        }
        finally { if (e_5) throw e_5.error; }
    }
    return _delete.apply(void 0, __spread([object], keys));
}
exports.default = {
    EMPTY: EMPTY,
    empty: empty,
    of: of,
    concat: concat,
    set: set,
    delete: _delete,
    trim: trim,
};
//# sourceMappingURL=Objects.js.map