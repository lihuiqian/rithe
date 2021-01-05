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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var PluginContext_1 = __importDefault(require("./internal/PluginContext"));
var PositionContext_1 = __importDefault(require("./internal/PositionContext"));
var Pipe = function (props) {
    var position = react_1.useContext(PositionContext_1.default);
    var _a = react_1.useContext(PluginContext_1.default), register = _a.register, unregister = _a.unregister;
    var _b = props, name = _b.name, value = _b.value, computed = _b.computed, dependencyNames = _b.dependencyNames, lazy = _b.lazy;
    react_1.useEffect(function () {
        computed || register(name, position, value);
        return function () { return computed || unregister(position); };
    }, [position, register, unregister, name, value, computed]);
    react_1.useEffect(function () {
        computed && register(name, position, computed, dependencyNames || [], lazy || false);
        return function () { return computed && unregister(position); };
    }, [position, register, unregister, name, value, computed, dependencyNames, lazy]);
    return react_1.default.createElement(react_1.default.Fragment, null);
};
exports.default = Pipe;
//# sourceMappingURL=Pipe.js.map