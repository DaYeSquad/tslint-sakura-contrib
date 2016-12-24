// Copyright 2016 Frank Lin (lin.xiaoe.f@gmail.com). All rights reserved.
// Use of this source code is governed a license that can be found in the LICENSE file.

var gulp = require('gulp');
var rename = require('gulp-rename');
var ts = require('gulp-typescript');
var tsSourcemaps = require('gulp-sourcemaps');
var tslint = require('gulp-tslint');

/**
 * $ gulp tslint
 *
 * Check TypeScript code style.
 */
gulp.task('tslint', function() {
  gulp.src(['src/**/*.ts', 'src/**/**/*.ts', 'src/*.ts'])
    .pipe(tslint({
      formatter: 'verbose'
    }))
    .pipe(tslint.report());
});

/**
 * $ gulp ts
 *
 * Compile TypeScript files into 'dist/'.
 */
var tsProject = ts.createProject('tsconfig.json');
gulp.task('ts', function() {
  var tsResult = tsProject.src()
    .pipe(tsSourcemaps.init())
    .pipe(tsProject());
  return tsResult.js
    .pipe(tsSourcemaps.write('.'))
    .pipe(gulp.dest('dist/'));
});
