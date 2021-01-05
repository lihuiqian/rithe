"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@rithe/utils");
var positionComparator_1 = __importDefault(require("./positionComparator"));
var pipeComparator = function (p1, p2) {
    return utils_1.Comparators.compare(function (pipe) { return pipe.position; }, positionComparator_1.default)(p1, p2);
};
exports.default = pipeComparator;
//# sourceMappingURL=pipeComparator.js.map