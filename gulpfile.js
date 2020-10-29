"use strict";

var gulp = require("gulp");
var babel = require("gulp-babel");
var sass = require("gulp-sass");

sass.compiler = require("node-sass");

var compass = require("gulp-compass");

var cssPrefix = require("gulp-css-prefix");
var concat = require("gulp-concat");
const autoPrefixer = require("gulp-autoprefixer");
var sourcemaps = require('gulp-sourcemaps');

gulp.task("questionpage", function () {
  return gulp
    .src([
      "src/js/_header.js",
      "src/js/_footer.js",    
      "src/js/_sidenav.js",    
      "src/js/_question.js",    
      "src/js/_app.js",    

    ])
    .pipe(concat("questionpage.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulp.dest("./dist/js/production"));
});

gulp.task("introduction", function () {
  return gulp
    .src([
      "src/js/_headerLarge.js",
      "src/js/_introContent.js",    
      "src/js/_introFooter.js",    
      "src/js/_introApp.js",    
    ])
    .pipe(concat("introduction.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulp.dest("./dist/js/production"));
});

gulp.task("qualification", function () {
  return gulp
    .src([
      "src/js/_headerLarge.js",
      "src/js/_qualification.js",    
      "src/js/_introFooter.js",    
      "src/js/_qualificationApp.js",    
    ])
    .pipe(concat("qualification.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulp.dest("./dist/js/production"));
});

gulp.task("module", function () {
  return gulp
    .src([
      "src/js/_headerLarge.js",
      "src/js/_module.js",    
      "src/js/_introFooter.js",    
      "src/js/_moduleApp.js",    
    ])
    .pipe(concat("module.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulp.dest("./dist/js/production"));
});
gulp.task("thankyou", function () {
  return gulp
    .src([
      "src/js/_headerLarge.js",
      "src/js/_thankYouContent.js",    
      "src/js/_introFooter.js",    
      "src/js/_thankYouApp.js",    
    ])
    .pipe(concat("thankyou.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulp.dest("./dist/js/production"));
});
gulp.task("result", function () {
  return gulp
    .src([
      "src/js/_resultheader.js",
      "src/js/_resultbody.js",    
      "src/js/_resultApp.js"
    ])
    .pipe(concat("result.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulp.dest("./dist/js/production"));
});


//////////////////////////////////////////////////////////////////


gulp.task("questionpagecss", function () {
  return gulp
    .src(["src/scss/dashboard.scss"])
    .pipe(sourcemaps.init())
    .pipe(
      compass({
        css: "dist/css",
        sass: "src/scss",
        sourcemap: true
      })
    )
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoPrefixer({ cascade: false }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("introductioncss", function () {
  return gulp
    .src(["src/scss/introduction.scss"])
    .pipe(sourcemaps.init())
    .pipe(
      compass({
        css: "dist/css",
        sass: "src/scss",
        sourcemap: true
      })
    )
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoPrefixer({ cascade: false }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./dist/css"));
});



gulp.task("qualificationcss", function () {
  return gulp
    .src(["src/scss/qualification.scss"])
    .pipe(sourcemaps.init())
    .pipe(
      compass({
        css: "dist/css",
        sass: "src/scss",
        sourcemap: true
      })
    )
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoPrefixer({ cascade: false }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("modulecss", function () {
  return gulp
    .src(["src/scss/module.scss"])
    .pipe(sourcemaps.init())
    .pipe(
      compass({
        css: "dist/css",
        sass: "src/scss",
        sourcemap: true
      })
    )
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoPrefixer({ cascade: false }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./dist/css"));
});
gulp.task("thankyoucss", function () {
  return gulp
    .src(["src/scss/thankyou.scss"])
    .pipe(sourcemaps.init())
    .pipe(
      compass({
        css: "dist/css",
        sass: "src/scss",
        sourcemap: true
      })
    )
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoPrefixer({ cascade: false }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("resultcss", function () {
  return gulp
    .src(["src/scss/result.scss"])
    .pipe(sourcemaps.init())
    .pipe(
      compass({
        css: "dist/css",
        sass: "src/scss",
        sourcemap: true
      })
    )
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoPrefixer({ cascade: false }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./dist/css"));
});

gulp.task('copyfonts', function() {
  gulp.src('./fonts/*')
  .pipe(gulp.dest('./dist/css'));
});

gulp.task("copyfonts", async () => {
  await new Promise((resolve, reject) => {
    gulp.src('./fonts/*')
    .pipe(gulp.dest('./dist/css'))
          .on("end", resolve);
  });
});

gulp.task("copyImages", async () => {
  await new Promise((resolve, reject) => {
    gulp.src('./images/*')
  .pipe(gulp.dest('./dist/images'))
          .on("end", resolve);
  });
});

gulp.task("copyVendorjs", async () => {
  await new Promise((resolve, reject) => {
    gulp.src('./src/vendorjs/*')
  .pipe(gulp.dest('./dist/js/vendor/'))
          .on("end", resolve);
  });
});


gulp.task("watch", function () {
  gulp.watch("src/js/*.js", gulp.series("questionpage"));
  gulp.watch("src/js/*.js", gulp.series("introduction"));
  gulp.watch("src/js/*.js", gulp.series("qualification"));
  gulp.watch("src/js/*.js", gulp.series("module"));
  gulp.watch("src/js/*.js", gulp.series("thankyou"));
  gulp.watch("src/js/*.js", gulp.series("result"));
  gulp.watch("src/scss/**/*.scss", gulp.series("questionpagecss"));
  gulp.watch("src/scss/**/*.scss", gulp.series("qualificationcss"));
  gulp.watch("src/scss/**/*.scss", gulp.series("modulecss"));
  gulp.watch("src/scss/**/*.scss", gulp.series("introductioncss"));
  gulp.watch("src/scss/**/*.scss", gulp.series("thankyoucss"));
  gulp.watch("src/scss/**/*.scss", gulp.series("resultcss"));
});

gulp.task("default", gulp.series(["questionpage", "introduction","module","qualification","thankyou","result","thankyoucss", "modulecss","qualificationcss", "questionpagecss", "introductioncss","resultcss","copyfonts","copyImages","copyVendorjs","watch"]));
