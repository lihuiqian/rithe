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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ComputedPipe_1 = __importDefault(require("./ComputedPipe"));
var pipeComparator_1 = __importDefault(require("./pipeComparator"));
var positionComparator_1 = __importDefault(require("./positionComparator"));
var Pipeline = /** @class */ (function () {
    function Pipeline() {
        this.pipes = [];
    }
    Pipeline.prototype[Symbol.iterator] = function () {
        var _a, _b, pipe, e_1_1;
        var e_1, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, 6, 7]);
                    _a = __values(this.pipes), _b = _a.next();
                    _d.label = 1;
                case 1:
                    if (!!_b.done) return [3 /*break*/, 4];
                    pipe = _b.value;
                    return [4 /*yield*/, pipe];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    _b = _a.next();
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    };
    Pipeline.prototype.add = function (pipe) {
        var pipes = this.pipes;
        for (var i = 0; i < pipes.length; i++) {
            var cmp = pipeComparator_1.default(pipe, pipes[i]);
            if (cmp > 0)
                continue;
            if (cmp === 0) {
                pipes.splice(i, 1, pipe);
                return;
            }
            if (cmp < 0) {
                pipes.splice(i, 0, pipe);
                return;
            }
        }
        pipes.push(pipe);
    };
    Pipeline.prototype.remove = function (position) {
        var pipes = this.pipes;
        for (var i = 0; i < pipes.length; i++) {
            var cmp = positionComparator_1.default(position, pipes[i].position);
            if (cmp === 0) {
                var _a = __read(pipes.splice(i, 1), 1), result = _a[0];
                return result;
            }
        }
        return undefined;
    };
    Pipeline.prototype.affectedPipes = function (pipe) {
        var pipes = this.pipes;
        var index = pipes.indexOf(pipe);
        return index >= 0 ? this._affectedPipes(index, pipe) : [];
    };
    Pipeline.prototype._affectedPipes = function (index, pipe) {
        var pipes = this.pipes;
        var result = [];
        for (var i = index; i < pipes.length; i++) {
            var followingPipe = pipes[i];
            if (followingPipe.name === pipe.name) {
                result.push(followingPipe);
            }
            else if (followingPipe instanceof ComputedPipe_1.default && followingPipe.dependencyNames.indexOf(pipe.name) >= 0) {
                result.push.apply(result, __spread(this._affectedPipes(i, followingPipe)));
            }
        }
        return result;
    };
    Pipeline.prototype.previousPipe = function (name, position) {
        var e_2, _a;
        var pipes = this.pipes;
        var result = undefined;
        try {
            for (var pipes_1 = __values(pipes), pipes_1_1 = pipes_1.next(); !pipes_1_1.done; pipes_1_1 = pipes_1.next()) {
                var pipe = pipes_1_1.value;
                if (pipe.name !== name)
                    continue;
                if (positionComparator_1.default(pipe.position, position) >= 0)
                    break;
                result = pipe;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (pipes_1_1 && !pipes_1_1.done && (_a = pipes_1.return)) _a.call(pipes_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return result;
    };
    return Pipeline;
}());
exports.default = Pipeline;
//# sourceMappingURL=Pipeline.js.map