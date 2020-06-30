'use strict';
 
const {src, dest, watch, series, parallel} = require('gulp');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify-es').default;
const clean = require('gulp-clean');


const files = {
  sassPath: 'src/assets/sass/**/*.scss',
  jsPath: 'src/assets/js/**/*.js',
}

function sassTask(){
  return src(files.sassPath)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(dest('dist/css'));
}

function jsTask(){
  return src(files.jsPath)
    .pipe(uglify())
    .pipe(dest('dist/js'));
}

const cbString = new Date().getTime();

function cacheBustTask(){
  return src('index.html')
    .pipe(replace(/v=\d+/g, 'v=' + cbString))
    .pipe(dest('.'))
}

function watchTask(){
  watch([files.sassPath, files.jsPath], 
    parallel(sassTask, jsTask));
}

function cleanDist(){
  return src('dist')
  .pipe(clean());
}

exports.build = series(
  cleanDist,
  parallel(sassTask, jsTask),
  cacheBustTask,
)

exports.default = series(
  cleanDist,
  parallel(sassTask, jsTask),
  cacheBustTask,
  watchTask
)
 
