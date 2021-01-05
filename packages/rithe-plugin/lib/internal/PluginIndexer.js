"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var react_1 = __importStar(require("react"));
var __1 = require("..");
var PositionContext_1 = __importDefault(require("./PositionContext"));
var PluginIndexer = function (_a) {
    var children = _a.children;
    var _b = __read(react_1.useState({}), 2), cache = _b[0], setCache = _b[1];
    var addCache = react_1.useCallback(function (index, position) {
        console.log('addCache', index, JSON.stringify(position));
        setCache(function (cache) {
            var _a;
            return (__assign(__assign({}, cache), (_a = {}, _a[index] = position, _a)));
        });
        return position;
    }, []);
    var calculatePosition = react_1.useCallback(function (position, index) {
        console.log('calculatePosition', JSON.stringify(position), index);
        return addCache(index, __spread(position, [index]));
    }, [addCache]);
    // const resetCache = useCallback(() => {
    //     setCache({})
    // }, [])
    var position = react_1.useContext(PositionContext_1.default);
    var prevPosition = __1.usePrevious(position);
    console.log('IndexPositionEquals', position === prevPosition, JSON.stringify(prevPosition), JSON.stringify(position));
    // useEffect(() => {
    //     console.log('resetCache', JSON.stringify(position))
    //     resetCache()
    // }, [position, resetCache])
    return react_1.default.createElement(react_1.default.Fragment, null, react_1.default.Children.map(children, function (child, index) {
        if (!child || !child.type)
            return child;
        cache[index] && console.log('useCache', JSON.stringify(position), index);
        var pos = cache[index] || calculatePosition(position, index);
        return react_1.default.createElement(PositionContext_1.default.Provider, { key: index, value: pos }, child);
    }));
};
exports.default = PluginIndexer;
//# sourceMappingURL=PluginIndexer.js.map