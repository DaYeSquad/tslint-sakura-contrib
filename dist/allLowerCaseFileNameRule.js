"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tslint_1 = require("tslint");
var BaseWalker_1 = require("./utils/BaseWalker");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new AllLowerCaseFileNameRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(tslint_1.Rules.AbstractRule));
Rule.FAILURE_STRING = 'File name or directory name should be all lower case without underscore';
exports.Rule = Rule;
var AllLowerCaseFileNameRuleWalker = (function (_super) {
    __extends(AllLowerCaseFileNameRuleWalker, _super);
    function AllLowerCaseFileNameRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    AllLowerCaseFileNameRuleWalker.prototype.visitSourceFile = function (node) {
        var paths = node.fileName.split('/');
        for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
            var path = paths_1[_i];
            if (path.indexOf('_') > -1 ||
                path.toLowerCase() !== path) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
            }
        }
    };
    return AllLowerCaseFileNameRuleWalker;
}(BaseWalker_1.BaseWalker));
