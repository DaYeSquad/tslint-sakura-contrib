// Copyright 2017 Frank Lin (lin.xiaoe.f@gmail.com). All rights reserved.
// Use of this source code is governed a license that can be found in the LICENSE file.

/**
 * String utils.
 */
export class StringUtils {

  /**
   * Returns true if given name is camel case.
   * @param name Arbitrary string.
   * @param allowLeadingUnderscore Allow leading underscore.
   * @param allowTrailingUnderscore Allow trailing underscore.
   * @param requireLeadingUnderscore Require leading underscore.
   * @param requireTrailingUnderscore Require trailing underscore
   * @returns {boolean} True if given name is camel case.
   */
  static isCamelCase(name: string, allowLeadingUnderscore: boolean, allowTrailingUnderscore: boolean,
                     requireLeadingUnderscore: boolean = false, requireTrailingUnderscore: boolean = false): boolean {
    const firstCharacter = name.charAt(0);
    const lastCharacter = name.charAt(name.length - 1);
    const middle = name.substr(1, name.length - 2);

    if (name.length <= 0) {
      return true;
    }

    if (requireLeadingUnderscore && firstCharacter !== "_") {
      return false;
    }

    if (requireTrailingUnderscore && lastCharacter !== "_") {
      return false;
    }

    if (!allowTrailingUnderscore && lastCharacter === "_") {
      return false;
    }

    if (!allowLeadingUnderscore&& firstCharacter === "_") {
      return false;
    }

    return middle.indexOf("_") === -1;
  }

  /**
   * Returns true if given name starts with lower case character.
   */
  static isStartWithLowerCase(name: string): boolean {
    const firstCharacter = name.charAt(0);
    return firstCharacter === firstCharacter.toLowerCase();
  }
}
