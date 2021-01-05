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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Arrays_1 = __importDefault(require("./Arrays"));
var Sets_1 = __importDefault(require("./Sets"));
var EMPTY = [];
function empty() {
    return EMPTY;
}
function from(iterable) {
    var _a;
    return _a = {},
        _a[Symbol.iterator] = function () {
            var iterable_1, iterable_1_1, value, e_1_1;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, 6, 7]);
                        iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next();
                        _b.label = 1;
                    case 1:
                        if (!!iterable_1_1.done) return [3 /*break*/, 4];
                        value = iterable_1_1.value;
                        return [4 /*yield*/, value];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        iterable_1_1 = iterable_1.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        },
        _a;
}
function range(start, count, step) {
    var _a;
    if (step === void 0) { step = 1; }
    return _a = {},
        _a[Symbol.iterator] = function () {
            var i, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0, item = start;
                        _a.label = 1;
                    case 1:
                        if (!(i < count)) return [3 /*break*/, 4];
                        return [4 /*yield*/, item];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++, item += step;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        },
        _a;
}
function repeat(value, count) {
    var _a;
    return _a = {},
        _a[Symbol.iterator] = function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < count)) return [3 /*break*/, 4];
                        return [4 /*yield*/, value];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        },
        _a;
}
function concat() {
    var _a;
    var iterables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        iterables[_i] = arguments[_i];
    }
    return _a = {},
        _a[Symbol.iterator] = function () {
            var iterables_1, iterables_1_1, iterable, iterable_2, iterable_2_1, item, e_2_1, e_3_1;
            var e_3, _a, e_2, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 11, 12, 13]);
                        iterables_1 = __values(iterables), iterables_1_1 = iterables_1.next();
                        _c.label = 1;
                    case 1:
                        if (!!iterables_1_1.done) return [3 /*break*/, 10];
                        iterable = iterables_1_1.value;
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 7, 8, 9]);
                        iterable_2 = (e_2 = void 0, __values(iterable)), iterable_2_1 = iterable_2.next();
                        _c.label = 3;
                    case 3:
                        if (!!iterable_2_1.done) return [3 /*break*/, 6];
                        item = iterable_2_1.value;
                        return [4 /*yield*/, item];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        iterable_2_1 = iterable_2.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_2_1 = _c.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (iterable_2_1 && !iterable_2_1.done && (_b = iterable_2.return)) _b.call(iterable_2);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 9:
                        iterables_1_1 = iterables_1.next();
                        return [3 /*break*/, 1];
                    case 10: return [3 /*break*/, 13];
                    case 11:
                        e_3_1 = _c.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 13];
                    case 12:
                        try {
                            if (iterables_1_1 && !iterables_1_1.done && (_a = iterables_1.return)) _a.call(iterables_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 13: return [2 /*return*/];
                }
            });
        },
        _a;
}
function zip() {
    var _a;
    var iterables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        iterables[_i] = arguments[_i];
    }
    return _a = {},
        _a[Symbol.iterator] = function () {
            var iterators, nexts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        iterators = iterables.map(function (iterable) { return iterable[Symbol.iterator](); });
                        nexts = iterators.map(function (iterator) { return iterator.next(); });
                        _a.label = 1;
                    case 1:
                        if (!!nexts.map(function (next) { return next.done; }).reduce(function (a, b) { return a || b; }, false)) return [3 /*break*/, 3];
                        return [4 /*yield*/, nexts.map(function (next) { return next.value; })];
                    case 2:
                        _a.sent();
                        nexts = iterators.map(function (iterator) { return iterator.next(); });
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        },
        _a;
}
function map(iterable, project) {
    var _a;
    return _a = {},
        _a[Symbol.iterator] = function () {
            var index, iterable_3, iterable_3_1, value, e_4_1;
            var e_4, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        index = 0;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        iterable_3 = __values(iterable), iterable_3_1 = iterable_3.next();
                        _b.label = 2;
                    case 2:
                        if (!!iterable_3_1.done) return [3 /*break*/, 5];
                        value = iterable_3_1.value;
                        return [4 /*yield*/, project(value, index++)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        iterable_3_1 = iterable_3.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_4_1 = _b.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (iterable_3_1 && !iterable_3_1.done && (_a = iterable_3.return)) _a.call(iterable_3);
                        }
                        finally { if (e_4) throw e_4.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        },
        _a;
}
function pairwise(iterable) {
    var _a;
    return _a = {},
        _a[Symbol.iterator] = function () {
            var prev, index, iterable_4, iterable_4_1, curr, e_5_1;
            var e_5, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        prev = undefined, index = 0;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, 8, 9]);
                        iterable_4 = __values(iterable), iterable_4_1 = iterable_4.next();
                        _b.label = 2;
                    case 2:
                        if (!!iterable_4_1.done) return [3 /*break*/, 6];
                        curr = iterable_4_1.value;
                        if (!(index++ > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, [prev, curr]];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        prev = curr;
                        _b.label = 5;
                    case 5:
                        iterable_4_1 = iterable_4.next();
                        return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_5_1 = _b.sent();
                        e_5 = { error: e_5_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (iterable_4_1 && !iterable_4_1.done && (_a = iterable_4.return)) _a.call(iterable_4);
                        }
                        finally { if (e_5) throw e_5.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        },
        _a;
}
function scan(iterable, accumulator, initial) {
    var _a;
    return _a = {},
        _a[Symbol.iterator] = function () {
            var acc, index, iterable_5, iterable_5_1, value, e_6_1;
            var e_6, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        acc = initial, index = 0;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        iterable_5 = __values(iterable), iterable_5_1 = iterable_5.next();
                        _b.label = 2;
                    case 2:
                        if (!!iterable_5_1.done) return [3 /*break*/, 5];
                        value = iterable_5_1.value;
                        acc = index === 0 && acc === undefined ? value : accumulator(acc, value, index);
                        index++;
                        return [4 /*yield*/, acc];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        iterable_5_1 = iterable_5.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_6_1 = _b.sent();
                        e_6 = { error: e_6_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (iterable_5_1 && !iterable_5_1.done && (_a = iterable_5.return)) _a.call(iterable_5);
                        }
                        finally { if (e_6) throw e_6.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        },
        _a;
}
function buffer(iterable, count, step) {
    var _a;
    if (step === void 0) { step = count; }
    return _a = {},
        _a[Symbol.iterator] = function () {
            var buffer, index, iterable_6, iterable_6_1, value, e_7_1;
            var e_7, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        buffer = [];
                        index = 0;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, 8, 9]);
                        iterable_6 = __values(iterable), iterable_6_1 = iterable_6.next();
                        _b.label = 2;
                    case 2:
                        if (!!iterable_6_1.done) return [3 /*break*/, 6];
                        value = iterable_6_1.value;
                        buffer.length === count && buffer.shift();
                        buffer.push(value);
                        if (!(index >= count - 1 && (index - count + 1) % step === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, buffer];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        index++;
                        _b.label = 5;
                    case 5:
                        iterable_6_1 = iterable_6.next();
                        return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_7_1 = _b.sent();
                        e_7 = { error: e_7_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (iterable_6_1 && !iterable_6_1.done && (_a = iterable_6.return)) _a.call(iterable_6);
                        }
                        finally { if (e_7) throw e_7.error; }
                        return [7 /*endfinally*/];
                    case 9:
                        if (!(buffer.length > 1)) return [3 /*break*/, 12];
                        buffer.shift();
                        if (!((index - count + 1) % step === 0)) return [3 /*break*/, 11];
                        return [4 /*yield*/, buffer];
                    case 10:
                        _b.sent();
                        _b.label = 11;
                    case 11:
                        index++;
                        return [3 /*break*/, 9];
                    case 12: return [2 /*return*/];
                }
            });
        },
        _a;
}
function flatMap(iterable, project) {
    var _a;
    return _a = {},
        _a[Symbol.iterator] = function () {
            var index, iterable_7, iterable_7_1, value, _a, _b, subValue, e_8_1, e_9_1;
            var e_9, _c, e_8, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        index = 0;
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 12, 13, 14]);
                        iterable_7 = __values(iterable), iterable_7_1 = iterable_7.next();
                        _e.label = 2;
                    case 2:
                        if (!!iterable_7_1.done) return [3 /*break*/, 11];
                        value = iterable_7_1.value;
                        _e.label = 3;
                    case 3:
                        _e.trys.push([3, 8, 9, 10]);
                        _a = (e_8 = void 0, __values(project(value, index++))), _b = _a.next();
                        _e.label = 4;
                    case 4:
                        if (!!_b.done) return [3 /*break*/, 7];
                        subValue = _b.value;
                        return [4 /*yield*/, subValue];
                    case 5:
                        _e.sent();
                        _e.label = 6;
                    case 6:
                        _b = _a.next();
                        return [3 /*break*/, 4];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_8_1 = _e.sent();
                        e_8 = { error: e_8_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                        }
                        finally { if (e_8) throw e_8.error; }
                        return [7 /*endfinally*/];
                    case 10:
                        iterable_7_1 = iterable_7.next();
                        return [3 /*break*/, 2];
                    case 11: return [3 /*break*/, 14];
                    case 12:
                        e_9_1 = _e.sent();
                        e_9 = { error: e_9_1 };
                        return [3 /*break*/, 14];
                    case 13:
                        try {
                            if (iterable_7_1 && !iterable_7_1.done && (_c = iterable_7.return)) _c.call(iterable_7);
                        }
                        finally { if (e_9) throw e_9.error; }
                        return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        },
        _a;
}
function skip(iterable, count) {
    var _a;
    return _a = {},
        _a[Symbol.iterator] = function () {
            var index, iterable_8, iterable_8_1, value, e_10_1;
            var e_10, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        index = 0;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        iterable_8 = __values(iterable), iterable_8_1 = iterable_8.next();
                        _b.label = 2;
                    case 2:
                        if (!!iterable_8_1.done) return [3 /*break*/, 5];
                        value = iterable_8_1.value;
                        if (!(index++ >= count)) return [3 /*break*/, 4];
                        return [4 /*yield*/, value];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        iterable_8_1 = iterable_8.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_10_1 = _b.sent();
                        e_10 = { error: e_10_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (iterable_8_1 && !iterable_8_1.done && (_a = iterable_8.return)) _a.call(iterable_8);
                        }
                        finally { if (e_10) throw e_10.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        },
        _a;
}
function skipLast(iterable, count) {
    var _a;
    return _a = {},
        _a[Symbol.iterator] = function () {
            var buffer, iterable_9, iterable_9_1, value, e_11_1;
            var e_11, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        buffer = [];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        iterable_9 = __values(iterable), iterable_9_1 = iterable_9.next();
                        _b.label = 2;
                    case 2:
                        if (!!iterable_9_1.done) return [3 /*break*/, 5];
                        value = iterable_9_1.value;
                        buffer.push(value);
                        if (!(buffer.length > count)) return [3 /*break*/, 4];
                        return [4 /*yield*/, buffer.shift()];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        iterable_9_1 = iterable_9.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_11_1 = _b.sent();
                        e_11 = { error: e_11_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (iterable_9_1 && !iterable_9_1.done && (_a = iterable_9.return)) _a.call(iterable_9);
                        }
                        finally { if (e_11) throw e_11.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        },
        _a;
}
function take(iterable, count) {
    var _a;
    return _a = {},
        _a[Symbol.iterator] = function () {
            var index, iterable_10, iterable_10_1, value, e_12_1;
            var e_12, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        index = 0;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        iterable_10 = __values(iterable), iterable_10_1 = iterable_10.next();
                        _b.label = 2;
                    case 2:
                        if (!!iterable_10_1.done) return [3 /*break*/, 5];
                        value = iterable_10_1.value;
                        if (!(index++ < count)) return [3 /*break*/, 4];
                        return [4 /*yield*/, value];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        iterable_10_1 = iterable_10.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_12_1 = _b.sent();
                        e_12 = { error: e_12_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (iterable_10_1 && !iterable_10_1.done && (_a = iterable_10.return)) _a.call(iterable_10);
                        }
                        finally { if (e_12) throw e_12.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        },
        _a;
}
function takeLast(iterable, count) {
    var e_13, _a;
    var buffer = [];
    try {
        for (var iterable_11 = __values(iterable), iterable_11_1 = iterable_11.next(); !iterable_11_1.done; iterable_11_1 = iterable_11.next()) {
            var value = iterable_11_1.value;
            buffer.push(value);
            if (buffer.length > count)
                buffer.shift();
        }
    }
    catch (e_13_1) { e_13 = { error: e_13_1 }; }
    finally {
        try {
            if (iterable_11_1 && !iterable_11_1.done && (_a = iterable_11.return)) _a.call(iterable_11);
        }
        finally { if (e_13) throw e_13.error; }
    }
    return buffer;
}
function filter(iterable, predicate) {
    var _a;
    return _a = {},
        _a[Symbol.iterator] = function () {
            var index, iterable_12, iterable_12_1, value, e_14_1;
            var e_14, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        index = 0;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        iterable_12 = __values(iterable), iterable_12_1 = iterable_12.next();
                        _b.label = 2;
                    case 2:
                        if (!!iterable_12_1.done) return [3 /*break*/, 5];
                        value = iterable_12_1.value;
                        if (!predicate(value, index++)) return [3 /*break*/, 4];
                        return [4 /*yield*/, value];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        iterable_12_1 = iterable_12.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_14_1 = _b.sent();
                        e_14 = { error: e_14_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (iterable_12_1 && !iterable_12_1.done && (_a = iterable_12.return)) _a.call(iterable_12);
                        }
                        finally { if (e_14) throw e_14.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        },
        _a;
}
function reverse(iterable) {
    return Arrays_1.default.reverse(Arrays_1.default.from(iterable));
}
function sort(iterable, comparator) {
    return Arrays_1.default.sort(Arrays_1.default.from(iterable), comparator);
}
function distinct(iterable) {
    return Sets_1.default.from(iterable);
}
function partition(iterable, size) {
    var e_15, _a;
    var result = [];
    var buffer = [];
    var index = 0;
    try {
        for (var iterable_13 = __values(iterable), iterable_13_1 = iterable_13.next(); !iterable_13_1.done; iterable_13_1 = iterable_13.next()) {
            var value = iterable_13_1.value;
            buffer.push(value);
            if (++index % size === 0) {
                result.push(buffer);
                buffer = [];
            }
        }
    }
    catch (e_15_1) { e_15 = { error: e_15_1 }; }
    finally {
        try {
            if (iterable_13_1 && !iterable_13_1.done && (_a = iterable_13.return)) _a.call(iterable_13);
        }
        finally { if (e_15) throw e_15.error; }
    }
    if (buffer.length > 0)
        result.push(buffer);
    return result;
}
function reduce(iterable, accumulator, initial) {
    var e_16, _a;
    var acc = initial, index = 0;
    try {
        for (var iterable_14 = __values(iterable), iterable_14_1 = iterable_14.next(); !iterable_14_1.done; iterable_14_1 = iterable_14.next()) {
            var value = iterable_14_1.value;
            acc = index === 0 && acc === undefined ? value : accumulator(acc, value, index);
            index++;
        }
    }
    catch (e_16_1) { e_16 = { error: e_16_1 }; }
    finally {
        try {
            if (iterable_14_1 && !iterable_14_1.done && (_a = iterable_14.return)) _a.call(iterable_14);
        }
        finally { if (e_16) throw e_16.error; }
    }
    return acc;
}
function size(iterable) {
    var e_17, _a;
    var count = 0;
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (var iterable_15 = __values(iterable), iterable_15_1 = iterable_15.next(); !iterable_15_1.done; iterable_15_1 = iterable_15.next()) {
            var _value = iterable_15_1.value;
            count++;
        }
    }
    catch (e_17_1) { e_17 = { error: e_17_1 }; }
    finally {
        try {
            if (iterable_15_1 && !iterable_15_1.done && (_a = iterable_15.return)) _a.call(iterable_15);
        }
        finally { if (e_17) throw e_17.error; }
    }
    return count;
}
function get(iterable, index) {
    var e_18, _a;
    var i = 0;
    try {
        for (var iterable_16 = __values(iterable), iterable_16_1 = iterable_16.next(); !iterable_16_1.done; iterable_16_1 = iterable_16.next()) {
            var value = iterable_16_1.value;
            if (i++ === index)
                return value;
        }
    }
    catch (e_18_1) { e_18 = { error: e_18_1 }; }
    finally {
        try {
            if (iterable_16_1 && !iterable_16_1.done && (_a = iterable_16.return)) _a.call(iterable_16);
        }
        finally { if (e_18) throw e_18.error; }
    }
    return undefined;
}
function indexOf(iterable, value) {
    var e_19, _a;
    var index = 0;
    try {
        for (var iterable_17 = __values(iterable), iterable_17_1 = iterable_17.next(); !iterable_17_1.done; iterable_17_1 = iterable_17.next()) {
            var v = iterable_17_1.value;
            if (v === value)
                return index;
            index++;
        }
    }
    catch (e_19_1) { e_19 = { error: e_19_1 }; }
    finally {
        try {
            if (iterable_17_1 && !iterable_17_1.done && (_a = iterable_17.return)) _a.call(iterable_17);
        }
        finally { if (e_19) throw e_19.error; }
    }
    return -1;
}
function lastIndexOf(iterable, value) {
    var e_20, _a;
    var index = 0, lastIndex = -1;
    try {
        for (var iterable_18 = __values(iterable), iterable_18_1 = iterable_18.next(); !iterable_18_1.done; iterable_18_1 = iterable_18.next()) {
            var v = iterable_18_1.value;
            v === value && (lastIndex = index);
            index++;
        }
    }
    catch (e_20_1) { e_20 = { error: e_20_1 }; }
    finally {
        try {
            if (iterable_18_1 && !iterable_18_1.done && (_a = iterable_18.return)) _a.call(iterable_18);
        }
        finally { if (e_20) throw e_20.error; }
    }
    return lastIndex;
}
function first(iterable, defaultValue) {
    var e_21, _a;
    try {
        for (var iterable_19 = __values(iterable), iterable_19_1 = iterable_19.next(); !iterable_19_1.done; iterable_19_1 = iterable_19.next()) {
            var value = iterable_19_1.value;
            return value;
        }
    }
    catch (e_21_1) { e_21 = { error: e_21_1 }; }
    finally {
        try {
            if (iterable_19_1 && !iterable_19_1.done && (_a = iterable_19.return)) _a.call(iterable_19);
        }
        finally { if (e_21) throw e_21.error; }
    }
    return defaultValue;
}
function last(iterable, defaultValue) {
    return reduce(iterable, function (_acc, value) { return value; }, defaultValue);
}
function max(iterable, comparator) {
    return reduce(iterable, function (acc, value) { return comparator(acc, value) < 0 ? value : acc; });
}
function min(iterable, comparator) {
    return reduce(iterable, function (acc, value) { return comparator(acc, value) > 0 ? value : acc; });
}
function has(iterable, value) {
    return indexOf(iterable, value) >= 0;
}
function equals(iterable1, iterable2) {
    var iterator1 = iterable1[Symbol.iterator](), iterator2 = iterable2[Symbol.iterator]();
    var next1 = iterator1.next(), next2 = iterator2.next();
    while (!next1.done && !next2.done) {
        if (next1.value !== next2.value)
            return false;
        next1 = iterator1.next(), next2 = iterator2.next();
    }
    return next1.done === next2.done;
}
exports.default = {
    EMPTY: EMPTY,
    empty: empty,
    from: from,
    range: range,
    repeat: repeat,
    concat: concat,
    zip: zip,
    map: map,
    pairwise: pairwise,
    scan: scan,
    buffer: buffer,
    flatMap: flatMap,
    skip: skip,
    skipLast: skipLast,
    take: take,
    takeLast: takeLast,
    filter: filter,
    reverse: reverse,
    sort: sort,
    distinct: distinct,
    partition: partition,
    reduce: reduce,
    size: size,
    get: get,
    indexOf: indexOf,
    lastIndexOf: lastIndexOf,
    first: first,
    last: last,
    max: max,
    min: min,
    has: has,
    equals: equals,
};
//# sourceMappingURL=Iterables.js.map