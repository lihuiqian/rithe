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
var ComputedPipe_1 = __importDefault(require("./ComputedPipe"));
var pipeComparator_1 = __importDefault(require("./pipeComparator"));
var Pipeline_1 = __importDefault(require("./Pipeline"));
var ValuePipe_1 = __importDefault(require("./ValuePipe"));
var PluginCore = /** @class */ (function () {
    function PluginCore() {
        this._pipeline = new Pipeline_1.default();
    }
    PluginCore.prototype.mount = function (name, position) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var pipeline = this._pipeline;
        var pipe = args.length === 1 ? new ValuePipe_1.default(pipeline, name, position, args[0]) : new ComputedPipe_1.default(pipeline, name, position, args[0], args[1], args[2]);
        pipeline.add(pipe);
        this.mark(pipe);
    };
    PluginCore.prototype.unmount = function (position) {
        var pipe = this._pipeline.remove(position);
        pipe && this.mark(pipe);
    };
    PluginCore.prototype.mark = function (pipe) {
        var e_1, _a;
        var affectedPipes = this._pipeline.affectedPipes(pipe);
        try {
            for (var affectedPipes_1 = __values(affectedPipes), affectedPipes_1_1 = affectedPipes_1.next(); !affectedPipes_1_1.done; affectedPipes_1_1 = affectedPipes_1.next()) {
                var affectedPipe = affectedPipes_1_1.value;
                affectedPipe.mark();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (affectedPipes_1_1 && !affectedPipes_1_1.done && (_a = affectedPipes_1.return)) _a.call(affectedPipes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    PluginCore.prototype.calculate = function (pipe) {
        var e_2, _a;
        try {
            for (var _b = __values(this._pipeline), _c = _b.next(); !_c.done; _c = _b.next()) {
                var p = _c.value;
                if (pipeComparator_1.default(p, pipe) > 0)
                    break;
                p.dirty && p.calculate();
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    PluginCore.prototype.latest = function (name, position) {
        return this._pipeline.previousPipe(name, position);
    };
    return PluginCore;
}());
exports.default = PluginCore;
//# sourceMappingURL=PluginCore.js.map