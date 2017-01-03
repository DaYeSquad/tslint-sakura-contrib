// Copyright 2016 Frank Lin (lin.xiaoe.f@gmail.com). All rights reserved.
// Use of this source code is governed a license that can be found in the LICENSE file.

import * as ts from "typescript";
import * as Lint from "tslint";

/**
 * A base walker class that gracefully handles unexpected errors.
 * Errors are often thrown when the TypeChecker is invoked.
 *
 * This file is copied from tslint-microsoft-contrib/ErrorTolerantWalker.ts.
 */
export class BaseWalker extends Lint.RuleWalker {

  public static DEBUG: boolean = false;

  protected visitNode(node: ts.Node): void {
    try {
      super.visitNode(node);
    } catch (e) {
      // turn this on when trying out new rules on foreign codebases
      if (BaseWalker.DEBUG) {
        const msg: string = "An error occurred visiting a node."
          + "\nWalker: " + this.getClassName()
          + "\nNode: " + (node.getFullText ? node.getFullText() : "<unknown>")
          + "\n" + e;

        this.addFailure(this.createFailure(
          node.getStart ? node.getStart() : 0,
          node.getWidth ? node.getWidth() : 0,
          msg));
      }
    }
  }

  private getClassName(): string {
    // Some versions of IE have the word "function" in the constructor name and
    // have the function body there as well. This rips out and returns the function name.
    const result: string = this.constructor.toString().match(/function\s+([\w\$]+)\s*\(/)[1] || "";
    if (result == null || result.length === 0) {
      throw new Error("Could not determine class name from input: " + this.constructor.toString());
    }
    return result;
  }
}
