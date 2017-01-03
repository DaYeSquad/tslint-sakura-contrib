// Copyright 2017 Frank Lin (lin.xiaoe.f@gmail.com). All rights reserved.
// Use of this source code is governed a license that can be found in the LICENSE file.

function PascalCaseFunctionName() {
  console.log("Wrong function name");
}

class User {
  private privateMethodWithoutUnderscore() {
    console.log("Private method");
  }

  protected ProtectedMethodStartWithUpperCase() {
    console.log("Protected method");
  }
}
