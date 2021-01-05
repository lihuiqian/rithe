"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var PluginContext_1 = __importDefault(require("./internal/PluginContext"));
var PositionContext_1 = __importDefault(require("./internal/PositionContext"));
var useDebug = function () {
    var position = react_1.useContext(PositionContext_1.default);
    var registry = react_1.useContext(PluginContext_1.default).registry;
    console.log('useDebug', JSON.stringify(position), registry);
    console.log('');
};
exports.default = useDebug;
//# sourceMappingURL=useDebug.js.map