"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValuePipe = /** @class */ (function () {
    function ValuePipe(_, name, position, value) {
        this.name = name;
        this.position = position;
        this._value = value;
        this._dirty = true;
    }
    Object.defineProperty(ValuePipe.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ValuePipe.prototype, "dirty", {
        get: function () {
            return this._dirty;
        },
        enumerable: false,
        configurable: true
    });
    ValuePipe.prototype.mark = function () {
        this._dirty = true;
    };
    ValuePipe.prototype.calculate = function () {
        this._dirty = false;
    };
    return ValuePipe;
}());
exports.default = ValuePipe;
//# sourceMappingURL=ValuePipe.js.map