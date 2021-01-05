"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var HOF_1 = __importDefault(require("../fp/HOF"));
var NATUAL_ORDER = function (a, b) { return a > b ? 1 : a < b ? -1 : 0; };
function natualOrder() {
    return NATUAL_ORDER;
}
var REVERSE_ORDER = function (a, b) { return a > b ? -1 : a < b ? 1 : 0; };
function reverseOrder() {
    return REVERSE_ORDER;
}
var LEXICOGRAPHICAL = NATUAL_ORDER;
function lexicographical(fn) {
    return function (a, b) { return fn ? LEXICOGRAPHICAL(fn(a), fn(b)) : LEXICOGRAPHICAL(a, b); };
}
var ALL_EQUAL = function () { return 0; };
function allEqual() {
    return ALL_EQUAL;
}
function explicit() {
    var orders = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        orders[_i] = arguments[_i];
    }
    var map = new Map(orders.map(function (value, index) { return [value, index]; }));
    var fn = HOF_1.default.forMap(map);
    return compare(fn, nullsLast(NATUAL_ORDER));
}
function reverse(cmp) {
    return function (a, b) { return cmp(b, a); };
}
function nullsFirst(cmp) {
    return function (a, b) {
        var aIsNull = a === undefined || a === null;
        var bIsNull = b === undefined || b === null;
        return aIsNull ? (bIsNull ? 0 : -1) : (bIsNull ? 1 : cmp(a, b));
    };
}
function nullsLast(cmp) {
    return function (a, b) {
        var aIsNull = a === undefined || a === null;
        var bIsNull = b === undefined || b === null;
        return aIsNull ? (bIsNull ? 0 : 1) : (bIsNull ? -1 : cmp(a, b));
    };
}
function compare(fn, cmp) {
    return function (a, b) { return cmp(fn(a), fn(b)); };
}
exports.default = {
    NATUAL_ORDER: NATUAL_ORDER,
    REVERSE_ORDER: REVERSE_ORDER,
    LEXICOGRAPHICAL: LEXICOGRAPHICAL,
    ALL_EQUAL: ALL_EQUAL,
    natualOrder: natualOrder,
    reverseOrder: reverseOrder,
    lexicographical: lexicographical,
    allEqual: allEqual,
    explicit: explicit,
    reverse: reverse,
    nullsFirst: nullsFirst,
    nullsLast: nullsLast,
    compare: compare,
};
//# sourceMappingURL=Comparators.js.map