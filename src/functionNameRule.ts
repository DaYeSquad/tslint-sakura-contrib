// Copyright 2017 Frank Lin (lin.xiaoe.f@gmail.com). All rights reserved.
// Use of this source code is governed a license that can be found in the LICENSE file.

import * as ts from "typescript";
import { Rules, RuleFailure } from "tslint";

import {BaseWalker} from "./utils/BaseWalker";
import {StringUtils} from "./utils/StringUtils";
import {AstUtils} from "./utils/AstUtils";

/**
 * Implements function-name rule.
 */
export class Rule extends Rules.AbstractRule {
  public static FUNCTION_FAILURE_STRING = "Function name should be camelCase without leading underscore";
  public static PRIVATE_METHOD_FAILURE_STRING = "Private method name should be camelCase with trailing underscore";
  public static PUBLIC_METHOD_FAILURE_STRING = "Public method name should be camelCase without trailing underscore";
  public static PROTECTED_METHOD_FAILURE_STRING = "Protected method name should be camelCase";
  public static STATIC_METHOD_FAILURE_STRIN = "Static method name should be camelCase";

  public apply(sourceFile: ts.SourceFile): RuleFailure[] {
    return this.applyWithWalker(new FunctionNameRuleWalker(sourceFile, this.getOptions()));
  }
}

class FunctionNameRuleWalker extends BaseWalker {
  protected visitFunctionDeclaration(node: ts.FunctionDeclaration) {
    const functionName: string = node.name.text;
    if (!StringUtils.isCamelCase(functionName, false, true) && StringUtils.isStartWithLowerCase(functionName)) {
      this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FUNCTION_FAILURE_STRING));
    }
    super.visitFunctionDeclaration(node);
  }

  protected visitMethodDeclaration(node: ts.MethodDeclaration) {
    const name: string = node.name.getText();
    if (AstUtils.isPrivate(node)) { // private method should be camelCase_
      if (!StringUtils.isCamelCase(name, false, true, false, true) && StringUtils.isStartWithLowerCase(name)) {
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.PRIVATE_METHOD_FAILURE_STRING));
      }
    }

    if (AstUtils.isPublic(node)) { // public method should be camelCase
      if (!StringUtils.isCamelCase(name, false, false) && StringUtils.isStartWithLowerCase(name)) {
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.PUBLIC_METHOD_FAILURE_STRING));
      }
    }

    if (AstUtils.isProtected(node)) { // protected method should be camelCase
      if (!StringUtils.isCamelCase(name, false, false) && StringUtils.isStartWithLowerCase(name)) {
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.PROTECTED_METHOD_FAILURE_STRING));
      }
    }

    if (AstUtils.isStatic(node)) { // static method should be camelCase
      if (!StringUtils.isCamelCase(name, false, false) && StringUtils.isStartWithLowerCase(name)) {
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.STATIC_METHOD_FAILURE_STRIN));
      }
    }

    super.visitMethodDeclaration(node);
  }
}
