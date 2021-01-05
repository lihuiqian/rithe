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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Iterables_1 = __importDefault(require("./Iterables"));
var Multisets_1 = __importDefault(require("./Multisets"));
function empty() {
    return [];
}
function from(iterable) {
    return Array.from(iterable);
}
function range(start, count, step) {
    if (step === void 0) { step = 1; }
    return from(Iterables_1.default.range(start, count, step));
}
function repeat(value, count) {
    var result = new Array(count);
    return result.fill(value);
}
function concat() {
    var arrs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arrs[_i] = arguments[_i];
    }
    return arrs.reduce(function (acc, cur) { return acc.concat(cur); }, []);
}
function zip() {
    var arrs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arrs[_i] = arguments[_i];
    }
    return from(Iterables_1.default.zip.apply(Iterables_1.default, __spread(arrs)));
}
function map(arr, project) {
    return arr.map(project);
}
function pairwise(arr) {
    return from(Iterables_1.default.pairwise(arr));
}
function scan(arr, accumulator, initial) {
    return from(Iterables_1.default.scan(arr, accumulator, initial));
}
function buffer(arr, count, step) {
    if (step === void 0) { step = count; }
    var result = [];
    for (var i = 0; i < arr.length; i += step) {
        result.push(arr.slice(i, i + count));
    }
    return result;
}
function flatMap(arr, project) {
    return from(Iterables_1.default.flatMap(arr, project));
}
function skip(arr, count) {
    return arr.slice(count);
}
function skipLast(arr, count) {
    return arr.slice(0, -count);
}
function take(arr, count) {
    return arr.slice(0, count);
}
function takeLast(arr, count) {
    return arr.slice(-count);
}
function filter(arr, predicate) {
    return arr.filter(predicate);
}
function reverse(arr) {
    return arr.slice().reverse();
}
function sort(arr, comparator) {
    return arr.sort(comparator);
}
function distinct(arr) {
    return from(new Set(arr));
}
function partition(arr, size) {
    var result = [];
    for (var i = 0; i < ((arr.length - 1) / size | 0) + 1; i++) {
        result.push(arr.slice(i * size, (i + 1) * size));
    }
    return result;
}
function reduce(arr, accumulator, initial) {
    return initial === undefined ? arr.length === 0 ? undefined : arr.reduce(accumulator) : arr.reduce(accumulator, initial);
}
function first(arr, defaultValue) {
    var firstValue = arr[0];
    return firstValue === undefined ? defaultValue : firstValue;
}
function last(arr, defaultValue) {
    var lastValue = arr[arr.length - 1];
    return lastValue === undefined ? defaultValue : lastValue;
}
function max(arr, comparator) {
    return Iterables_1.default.max(arr, comparator);
}
function min(arr, comparator) {
    return Iterables_1.default.min(arr, comparator);
}
function has(arr, value) {
    return arr.indexOf(value) >= 0;
}
function elementsEqual(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    return Multisets_1.default.elementsEqual(Multisets_1.default.from(arr1), Multisets_1.default.from(arr2));
}
function equals(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i])
            return false;
    }
    return true;
}
function fill(arr, item, start, end) {
    var result = arr.slice();
    return result.fill(item, start, end);
}
function push(arr) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    var result = arr.slice();
    result.push.apply(result, __spread(items));
    return result;
}
function pop(arr, size) {
    var result = arr.slice();
    for (var i = 0; i < size; i++)
        result.pop();
    return result;
}
function unshift(arr) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    var result = arr.slice();
    result.unshift.apply(result, __spread(items));
    return result;
}
function shift(arr, size) {
    var result = arr.slice();
    for (var i = 0; i < size; i++)
        result.shift();
    return result;
}
function slice(arr, start, end) {
    return arr.slice(start, end);
}
function splice(arr, start, deleteCount) {
    if (deleteCount === void 0) { deleteCount = 0; }
    var items = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        items[_i - 3] = arguments[_i];
    }
    var result = arr.slice();
    result.splice.apply(result, __spread([start, deleteCount], items));
    return result;
}
exports.default = {
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
    first: first,
    last: last,
    max: max,
    min: min,
    has: has,
    elementsEqual: elementsEqual,
    equals: equals,
    fill: fill,
    push: push,
    pop: pop,
    unshift: unshift,
    shift: shift,
    slice: slice,
    splice: splice,
};
//# sourceMappingURL=Arrays.js.map