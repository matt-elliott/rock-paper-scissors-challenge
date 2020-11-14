const gulp = require('gulp');
const less = require('gulp-less');
const cleancss = require('gulp-clean-css');
const rename = require('gulp-rename');
const concat = require('gulp-concat');

const paths = {
  styles: {
    src: './src/less/**/*.less',
    dest: './public/css/'
  }
}

function defaultTask(callback) {
  return gulp.src( paths.styles.src )
    .pipe(less())
    .pipe(concat('App.less'))
    .pipe(cleancss())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(paths.styles.dest));
}

function watch() {
  gulp.watch( paths.styles.src, defaultTask);
}

exports.default = defaultTask;
exports.watch = watch;