"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var PluginContext_1 = __importDefault(require("./internal/PluginContext"));
var PositionContext_1 = __importDefault(require("./internal/PositionContext"));
// const useSlice = (name: string) => {
//     const position = useContext(PositionContext)
//     const { registry } = useContext(PluginContext)
//     return useMemo(() => {
//         const core = registry.core
//         const pipe = core.latest(name, position)
//         const slice: { [name: string]: unknown } = {}
//         if (pipe) {
//             pipe.dirty && core.calculate(pipe)
//             slice[pipe.name] = pipe.value
//         }
//         return slice
//     }, [name, position, registry])
// }
var useSlice = function () {
    var names = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        names[_i] = arguments[_i];
    }
    var position = react_1.useContext(PositionContext_1.default);
    var registry = react_1.useContext(PluginContext_1.default).registry;
    return react_1.useMemo(function () {
        var core = registry.core;
        var pipes = names.map(function (name) { return core.latest(name, position); }).filter(function (pipe) { return pipe !== undefined; });
        var slice = {};
        pipes.forEach(function (pipe) {
            pipe.dirty && core.calculate(pipe);
            slice[pipe.name] = pipe.value;
        });
        return slice;
    }, [names, position, registry]);
};
exports.default = useSlice;
//# sourceMappingURL=useSlice.js.map