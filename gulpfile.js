// Copyright 2016 Frank Lin (lin.xiaoe.f@gmail.com). All rights reserved.
// Use of this source code is governed a license that can be found in the LICENSE file.

var gulp = require('gulp');
var rename = require('gulp-rename');
var ts = require('gulp-typescript');

/**
 * $ gulp ts
 *
 * Compile TypeScript files into 'dist/'.
 */
var tsProject = ts.createProject('tsconfig.json');
gulp.task('ts', function() {
  var tsResult = tsProject.src()
    .pipe(tsProject());
  return tsResult.js
    .pipe(gulp.dest('dist/'));
});
