"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var PluginContext_1 = __importDefault(require("./internal/PluginContext"));
var PluginCore_1 = __importDefault(require("./internal/PluginCore"));
var PluginIndexer_1 = __importDefault(require("./internal/PluginIndexer"));
var PositionContext_1 = __importDefault(require("./internal/PositionContext"));
var PluginHost = function (_a) {
    var children = _a.children;
    var _b = __read(react_1.useState({ version: 0, core: new PluginCore_1.default() }), 2), registry = _b[0], setRegistry = _b[1];
    var register = react_1.useCallback(function (name, position) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        setRegistry(function (_a) {
            var version = _a.version, core = _a.core;
            args.length === 1 ? core.mount(name, position, args[0]) : core.mount(name, position, args[0], args[1], args[2]);
            version++;
            return { version: version, core: core };
        });
    }, []);
    var unregister = react_1.useCallback(function (position) {
        setRegistry(function (_a) {
            var version = _a.version, core = _a.core;
            core.unmount(position);
            version++;
            return { version: version, core: core };
        });
    }, []);
    var context = react_1.useMemo(function () { return ({ registry: registry, register: register, unregister: unregister }); }, [registry, register, unregister]);
    var position = react_1.useMemo(function () { return []; }, []);
    return react_1.default.createElement(PluginContext_1.default.Provider, { value: context },
        react_1.default.createElement(PositionContext_1.default.Provider, { value: position },
            react_1.default.createElement(PluginIndexer_1.default, null, children)));
};
exports.default = PluginHost;
//# sourceMappingURL=PluginHost.js.map