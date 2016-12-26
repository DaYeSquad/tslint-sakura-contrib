"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var BaseWalker = (function (_super) {
    __extends(BaseWalker, _super);
    function BaseWalker() {
        return _super.apply(this, arguments) || this;
    }
    BaseWalker.prototype.visitNode = function (node) {
        try {
            _super.prototype.visitNode.call(this, node);
        }
        catch (e) {
            if (BaseWalker.DEBUG) {
                var msg = 'An error occurred visiting a node.'
                    + '\nWalker: ' + this.getClassName()
                    + '\nNode: ' + (node.getFullText ? node.getFullText() : '<unknown>')
                    + '\n' + e;
                this.addFailure(this.createFailure(node.getStart ? node.getStart() : 0, node.getWidth ? node.getWidth() : 0, msg));
            }
        }
    };
    BaseWalker.prototype.getClassName = function () {
        var result = this.constructor.toString().match(/function\s+([\w\$]+)\s*\(/)[1] || '';
        if (result == null || result.length === 0) {
            throw new Error('Could not determine class name from input: ' + this.constructor.toString());
        }
        return result;
    };
    return BaseWalker;
}(Lint.RuleWalker));
BaseWalker.DEBUG = false;
exports.BaseWalker = BaseWalker;
