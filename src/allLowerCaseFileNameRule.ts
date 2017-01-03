// Copyright 2016 Frank Lin (lin.xiaoe.f@gmail.com). All rights reserved.
// Use of this source code is governed a license that can be found in the LICENSE file.

import * as ts from "typescript";
import { Rules, RuleFailure } from "tslint";

import {BaseWalker} from "./utils/BaseWalker";

/**
 * Implements all-lower-case-file-name rule.
 */
export class Rule extends Rules.AbstractRule {
  public static FAILURE_STRING = "File name or directory name should be all lower case without underscore";

  public apply(sourceFile: ts.SourceFile): RuleFailure[] {
    return this.applyWithWalker(new AllLowerCaseFileNameRuleWalker(sourceFile, this.getOptions()));
  }
}

class AllLowerCaseFileNameRuleWalker extends BaseWalker {
  protected visitSourceFile(node: ts.SourceFile) {
    const paths: string[] = node.fileName.split("/");
    for (let path of paths) {
      // check if there is underscore in file name
      if (path.indexOf("_") > -1 ||
          path.toLowerCase() !== path) {
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
      }
    }
  }
}
