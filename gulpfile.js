'use strict';

// ----------- Dependencies

var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    gzip = require('gulp-gzip'),
    cache = require('gulp-cache'),
    strip = require('gulp-strip-comments'),
    gulpif = require('gulp-if'),
    del = require('del');

// ----------- Variables

var ass_c = 'app/css/',
    ass_i = 'app/img/',
    ass_j = 'app/js/',
    ass_s = 'app/scss/*.scss',
    ass_h = 'app/index.html';

// ----------- Static Server & Watch Files

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "app"
    }
  });
});

gulp.task('serve', ['browserSync', 'compileSass', 'minifyScripts'], function (){
  gulp.watch(ass_s, ['compileSass']); 
  gulp.watch(ass_j + 'main.js', ['minifyScripts'], browserSync.reload); 
  gulp.watch(ass_h, browserSync.reload); 
});


// ----------- Minify JS & Compile Sass

gulp.task('minifyScripts', function() {
  return gulp.src(ass_j + 'main.js')
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest(ass_j));
});

gulp.task('compileSass', function() {
  return gulp.src(ass_s)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest(ass_c))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// ----------- Minify HTML

gulp.task('minifyHTML', function() {
  return gulp.src(ass_h)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename('indexmin.html'))
    .pipe(gulp.dest('app'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// ----------- DEFAULT (local development)

gulp.task('default', ['serve']);

// ----------- Cleanup

gulp.task('clean', function(callback) {
  del('dist');
  // clean up the local dev assets before a push
  del(ass_j + 'main.min.js');
  del(ass_c + 'styles.min.css');
  return cache.clearAll(callback);
})

// ----------- Build

gulp.task('pre', ['compileSass', 'minifyScripts']);
gulp.task('build', ['pre'], function() {
  return gulp.src([
    ass_c + 'styles.min.css',
    ass_i + '**',
    ass_j + 'main.min.js',
    ass_h,
    'app/.htaccess'
  ], { base: 'app/'})
  .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true})))
  .pipe(gulpif('*.html', strip()))
  .pipe(gulp.dest('dist/'));
});
