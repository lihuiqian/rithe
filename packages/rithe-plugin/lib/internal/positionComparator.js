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
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@rithe/utils");
var positionComparator = function (pos1, pos2) {
    var e_1, _a;
    try {
        for (var _b = __values(utils_1.Arrays.zip(pos1, pos2)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), num1 = _d[0], num2 = _d[1];
            var cmp = utils_1.Comparators.NATUAL_ORDER(num1, num2);
            if (cmp !== 0)
                return cmp;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return utils_1.Comparators.NATUAL_ORDER(pos1.length, pos2.length);
};
exports.default = positionComparator;
//# sourceMappingURL=positionComparator.js.map