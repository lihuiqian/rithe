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
Object.defineProperty(exports, "__esModule", { value: true });
var Multiset = /** @class */ (function () {
    function Multiset(iterable) {
        var e_1, _a;
        var _this = this;
        this.forEach = function (callbackFn) {
            _this._map.forEach(function (count, value) {
                for (var i = 0; i < count; i++) {
                    callbackFn(value, _this);
                }
            });
        };
        this.forEachEntry = function (callbackFn) {
            _this._map.forEach(function (count, value) { return callbackFn(value, count, _this); });
        };
        this._size = 0;
        this._map = new Map();
        if (iterable) {
            try {
                for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                    var value = iterable_1_1.value;
                    this.add(value);
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
    Object.defineProperty(Multiset.prototype, "size", {
        get: function () { return this._size; },
        enumerable: false,
        configurable: true
    });
    Multiset.prototype[Symbol.iterator] = function () {
        var _a, _b, _c, value, count, i, e_2_1;
        var e_2, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 7, 8, 9]);
                    _a = __values(this._map.entries()), _b = _a.next();
                    _e.label = 1;
                case 1:
                    if (!!_b.done) return [3 /*break*/, 6];
                    _c = __read(_b.value, 2), value = _c[0], count = _c[1];
                    i = 0;
                    _e.label = 2;
                case 2:
                    if (!(i < count)) return [3 /*break*/, 5];
                    return [4 /*yield*/, value];
                case 3:
                    _e.sent();
                    _e.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5:
                    _b = _a.next();
                    return [3 /*break*/, 1];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_2_1 = _e.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    };
    Multiset.prototype.asSet = function () {
        return new Set(this._map.keys());
    };
    Multiset.prototype.asMap = function () {
        return new Map(this._map.entries());
    };
    Multiset.prototype.add = function (value, occurrences) {
        var map = this._map;
        var prevCount = map.get(value) || 0;
        var intOccurrences = occurrences === undefined ? 1 : occurrences < 0 ? 0 : occurrences | 0;
        var newCount = prevCount + intOccurrences;
        newCount && map.set(value, newCount);
        this._size += intOccurrences;
        return this;
    };
    Multiset.prototype.delete = function (value, occurrences) {
        var map = this._map;
        var prevCount = map.get(value);
        if (prevCount === undefined)
            return false;
        var intOccurrences = occurrences === undefined ? 1 : occurrences < 0 ? 0 : occurrences | 0;
        var newCount = prevCount >= intOccurrences ? prevCount - intOccurrences : 0;
        var decrement = prevCount - newCount;
        newCount ? map.set(value, newCount) : map.delete(value);
        this._size -= decrement;
        return !!decrement;
    };
    Multiset.prototype.setCount = function (value, count) {
        var map = this._map;
        var prevCount = map.get(value) || 0;
        var newCount = count < 0 ? 0 : count | 0;
        var delta = newCount - prevCount;
        newCount ? map.set(value, newCount) : map.delete(value);
        this._size += delta;
        return this;
    };
    Multiset.prototype.clear = function () {
        this._map.clear();
        this._size = 0;
    };
    Multiset.prototype.entries = function () {
        return this._map.entries();
    };
    Multiset.prototype.values = function () {
        var _a, _b, _c, value, count, i, e_3_1;
        var e_3, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 7, 8, 9]);
                    _a = __values(this._map), _b = _a.next();
                    _e.label = 1;
                case 1:
                    if (!!_b.done) return [3 /*break*/, 6];
                    _c = __read(_b.value, 2), value = _c[0], count = _c[1];
                    i = 0;
                    _e.label = 2;
                case 2:
                    if (!(i < count)) return [3 /*break*/, 5];
                    return [4 /*yield*/, value];
                case 3:
                    _e.sent();
                    _e.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5:
                    _b = _a.next();
                    return [3 /*break*/, 1];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_3_1 = _e.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                    }
                    finally { if (e_3) throw e_3.error; }
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    };
    Multiset.prototype.has = function (value) {
        return this._map.has(value);
    };
    Multiset.prototype.count = function (value) {
        return this._map.get(value) || 0;
    };
    return Multiset;
}());
exports.default = Multiset;
//# sourceMappingURL=Multiset.js.map