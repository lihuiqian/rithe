"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var PluginIndexer_1 = __importDefault(require("./internal/PluginIndexer"));
var Plugin = function (_a) {
    var children = _a.children;
    return react_1.default.createElement(PluginIndexer_1.default, null, children);
};
exports.default = Plugin;
//# sourceMappingURL=Plugin.js.map