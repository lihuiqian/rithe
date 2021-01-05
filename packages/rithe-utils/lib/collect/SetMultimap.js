"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Iterables_1 = __importDefault(require("./Iterables"));
var SetMultimap = /** @class */ (function () {
    function SetMultimap(iterable) {
        var e_1, _a;
        var _this = this;
        this.forEach = function (callbackFn) {
            _this._map.forEach(function (collection, key) { return collection.forEach(function (value) { return callbackFn(value, key, _this); }); });
        };
        this.forEachCollection = function (callbackFn) {
            _this._map.forEach(function (collection, key) { return callbackFn(collection, key, _this); });
        };
        this._size = 0;
        this._keySize = 0;
        this._map = new Map();
        if (iterable) {
            try {
                for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                    var _b = __read(iterable_1_1.value, 2), key = _b[0], value = _b[1];
                    this.set(key, value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    }
    Object.defineProperty(SetMultimap.prototype, "size", {
        get: function () { return this._size; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetMultimap.prototype, "keySize", {
        get: function () { return this._keySize; },
        enumerable: false,
        configurable: true
    });
    SetMultimap.prototype[Symbol.iterator] = function () {
        var _a, _b, _c, key, collection, collection_1, collection_1_1, value, e_2_1, e_3_1;
        var e_3, _d, e_2, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, 11, 12, 13]);
                    _a = __values(this._map), _b = _a.next();
                    _f.label = 1;
                case 1:
                    if (!!_b.done) return [3 /*break*/, 10];
                    _c = __read(_b.value, 2), key = _c[0], collection = _c[1];
                    _f.label = 2;
                case 2:
                    _f.trys.push([2, 7, 8, 9]);
                    collection_1 = (e_2 = void 0, __values(collection)), collection_1_1 = collection_1.next();
                    _f.label = 3;
                case 3:
                    if (!!collection_1_1.done) return [3 /*break*/, 6];
                    value = collection_1_1.value;
                    return [4 /*yield*/, [key, value]];
                case 4:
                    _f.sent();
                    _f.label = 5;
                case 5:
                    collection_1_1 = collection_1.next();
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_2_1 = _f.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (collection_1_1 && !collection_1_1.done && (_e = collection_1.return)) _e.call(collection_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 9:
                    _b = _a.next();
                    return [3 /*break*/, 1];
                case 10: return [3 /*break*/, 13];
                case 11:
                    e_3_1 = _f.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 13];
                case 12:
                    try {
                        if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                    }
                    finally { if (e_3) throw e_3.error; }
                    return [7 /*endfinally*/];
                case 13: return [2 /*return*/];
            }
        });
    };
    SetMultimap.prototype.asMap = function () {
        return new Map(Iterables_1.default.map(this._map, function (_a) {
            var _b = __read(_a, 2), k = _b[0], vs = _b[1];
            return [k, new Set(vs)];
        }));
    };
    SetMultimap.prototype.set = function (key) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        if (values.length === 0)
            return this;
        var map = this._map;
        var collection = map.get(key);
        if (collection === undefined) {
            collection = new Set();
            map.set(key, collection);
            this._keySize++;
        }
        var prevSize = collection.size;
        values.forEach(collection.add);
        this._size += collection.size - prevSize;
        return this;
    };
    SetMultimap.prototype.delete = function (key) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        var map = this._map;
        var collection = map.get(key);
        if (collection === undefined)
            return false;
        if (values.length === 0) {
            map.delete(key);
            this._keySize--;
            this._size -= collection.size;
            return true;
        }
        var prevSize = collection.size;
        values.forEach(collection.delete);
        this._size -= prevSize - collection.size;
        if (collection.size === 0) {
            map.delete(key);
            this._keySize--;
        }
        return prevSize > collection.size;
    };
    SetMultimap.prototype.clear = function () {
        this._map.clear();
        this._size = 0;
        this._keySize = 0;
    };
    SetMultimap.prototype.keys = function () {
        return this._map.keys();
    };
    SetMultimap.prototype.values = function () {
        var _a, _b, collection, collection_2, collection_2_1, value, e_4_1, e_5_1;
        var e_5, _c, e_4, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 11, 12, 13]);
                    _a = __values(this._map.values()), _b = _a.next();
                    _e.label = 1;
                case 1:
                    if (!!_b.done) return [3 /*break*/, 10];
                    collection = _b.value;
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 7, 8, 9]);
                    collection_2 = (e_4 = void 0, __values(collection)), collection_2_1 = collection_2.next();
                    _e.label = 3;
                case 3:
                    if (!!collection_2_1.done) return [3 /*break*/, 6];
                    value = collection_2_1.value;
                    return [4 /*yield*/, value];
                case 4:
                    _e.sent();
                    _e.label = 5;
                case 5:
                    collection_2_1 = collection_2.next();
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_4_1 = _e.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (collection_2_1 && !collection_2_1.done && (_d = collection_2.return)) _d.call(collection_2);
                    }
                    finally { if (e_4) throw e_4.error; }
                    return [7 /*endfinally*/];
                case 9:
                    _b = _a.next();
                    return [3 /*break*/, 1];
                case 10: return [3 /*break*/, 13];
                case 11:
                    e_5_1 = _e.sent();
                    e_5 = { error: e_5_1 };
                    return [3 /*break*/, 13];
                case 12:
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_5) throw e_5.error; }
                    return [7 /*endfinally*/];
                case 13: return [2 /*return*/];
            }
        });
    };
    SetMultimap.prototype.collections = function () {
        return this._map.values();
    };
    SetMultimap.prototype.entries = function () {
        var _a, _b, _c, key, collection, collection_3, collection_3_1, value, e_6_1, e_7_1;
        var e_7, _d, e_6, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, 11, 12, 13]);
                    _a = __values(this._map), _b = _a.next();
                    _f.label = 1;
                case 1:
                    if (!!_b.done) return [3 /*break*/, 10];
                    _c = __read(_b.value, 2), key = _c[0], collection = _c[1];
                    _f.label = 2;
                case 2:
                    _f.trys.push([2, 7, 8, 9]);
                    collection_3 = (e_6 = void 0, __values(collection)), collection_3_1 = collection_3.next();
                    _f.label = 3;
                case 3:
                    if (!!collection_3_1.done) return [3 /*break*/, 6];
                    value = collection_3_1.value;
                    return [4 /*yield*/, [key, value]];
                case 4:
                    _f.sent();
                    _f.label = 5;
                case 5:
                    collection_3_1 = collection_3.next();
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_6_1 = _f.sent();
                    e_6 = { error: e_6_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (collection_3_1 && !collection_3_1.done && (_e = collection_3.return)) _e.call(collection_3);
                    }
                    finally { if (e_6) throw e_6.error; }
                    return [7 /*endfinally*/];
                case 9:
                    _b = _a.next();
                    return [3 /*break*/, 1];
                case 10: return [3 /*break*/, 13];
                case 11:
                    e_7_1 = _f.sent();
                    e_7 = { error: e_7_1 };
                    return [3 /*break*/, 13];
                case 12:
                    try {
                        if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                    }
                    finally { if (e_7) throw e_7.error; }
                    return [7 /*endfinally*/];
                case 13: return [2 /*return*/];
            }
        });
    };
    SetMultimap.prototype.has = function (key) {
        return this._map.has(key);
    };
    SetMultimap.prototype.hasEntry = function (key, value) {
        var collection = this._map.get(key);
        if (collection === undefined)
            return false;
        return collection.has(value);
    };
    SetMultimap.prototype.get = function (key) {
        return this._map.get(key);
    };
    SetMultimap.prototype.count = function (key) {
        var collection = this._map.get(key);
        if (collection === undefined)
            return 0;
        return collection.size;
    };
    return SetMultimap;
}());
exports.default = SetMultimap;
//# sourceMappingURL=SetMultimap.js.map