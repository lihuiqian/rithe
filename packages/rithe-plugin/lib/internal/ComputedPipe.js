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
Object.defineProperty(exports, "__esModule", { value: true });
var ComputedPipe = /** @class */ (function () {
    function ComputedPipe(pipeline, name, position, computed, dependencyNames, lazy) {
        this.name = name;
        this.position = position;
        this.computed = computed;
        this.dependencyNames = dependencyNames;
        this.lazy = lazy;
        this._dirty = true;
        this._value = undefined;
        this._pipeline = pipeline;
    }
    Object.defineProperty(ComputedPipe.prototype, "dirty", {
        get: function () {
            return this._dirty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ComputedPipe.prototype, "value", {
        get: function () {
            return this.lazy ? this._value() : this._value;
        },
        enumerable: false,
        configurable: true
    });
    ComputedPipe.prototype.mark = function () {
        this._dirty = true;
    };
    ComputedPipe.prototype.calculate = function () {
        var pipeline = this._pipeline;
        var _a = this, name = _a.name, position = _a.position, dependencyNames = _a.dependencyNames, computed = _a.computed;
        var previousPipe = pipeline.previousPipe(name, position);
        var dependencyPipes = dependencyNames.map(function (dependencyName) { return pipeline.previousPipe(dependencyName, position); });
        var prev = previousPipe === null || previousPipe === void 0 ? void 0 : previousPipe.value;
        var deps = dependencyPipes.map(function (dependencyPipe) { return dependencyPipe === null || dependencyPipe === void 0 ? void 0 : dependencyPipe.value; });
        this._value = this.lazy ? function () { return computed.apply(void 0, __spread([prev], deps)); } : computed.apply(void 0, __spread([prev], deps));
        this._dirty = false;
    };
    return ComputedPipe;
}());
exports.default = ComputedPipe;
//# sourceMappingURL=ComputedPipe.js.map