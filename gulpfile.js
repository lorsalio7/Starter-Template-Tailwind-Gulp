const { src, dest } = require("gulp");
const gulp = require("gulp");
const fs = require("fs");
const tailwindcss = require("tailwindcss");
const browsersync = require("browser-sync").create();
const del = require("del");
const auto_prefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const purgecss = require("gulp-purgecss");
const fileinclude = require("gulp-file-include");
const rename = require("gulp-rename");
const newer = require("gulp-newer");
const clean_css = require("gulp-clean-css");
const babel = require("gulp-babel");
const webp = require("gulp-webp");
const avif_images = require("gulp-avif");
const pngquant = require("imagemin-pngquant");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify-es").default;

function browserSync() {
  browsersync.init({
    server: {
      baseDir: "./dist/"
    },
    port: 3000,
    notify: false
  })
}

function html() {
  return src("app/html/*.html")
  .pipe(fileinclude({
    prefix: "@@",
    basepath: "@file"
  }))
  .pipe(dest("dist/"))
  .pipe(browsersync.stream())
}

function css() {
  return src("app/css/style.css")
  .pipe(postcss([tailwindcss, auto_prefixer({grid: true,overrideBrowserslist: ["last 5 versions"],cascade: true})]))
  .pipe(dest("dist/css/"))
  .pipe(clean_css())
  .pipe(rename({
    extname: ".min.css"
  }))
  .pipe(dest("dist/css/"))
  .pipe(browsersync.stream())
}

function cssLibs() {
  let filesCssLibs = fs.readdirSync("app/css_libs/");

  if(filesCssLibs.length > 0) {
    return src("app/css_libs/**")
    .pipe(dest("dist/libs/css"))
    .pipe(browsersync.stream())
  } else {
    return
  }
}

function js() {
  return src("app/js/script.js")
  .pipe(fileinclude({
    prefix: "@@",
    basepath: "@file"
  }))
  .pipe(babel({
    presets: ["@babel/preset-env"]
  }))
  .pipe(dest("dist/js/"))
  .pipe(
    uglify()
  )
  .pipe(
    rename({
      extname: ".min.js"
    })
  )
  .pipe(dest("dist/js/"))
  .pipe(browsersync.stream())
}

function jsLibs() {
  let filesJsLibs = fs.readdirSync("app/js_libs/");
  if(filesJsLibs.length > 0) {
    return src("app/js_libs/**")
    .pipe(dest("dist/libs/js"))
    .pipe(browsersync.stream())
  } else {
    return
  }
}

function fonts() {
  return src("app/fonts/**")
  .pipe(dest("dist/fonts/"))
  .pipe(browsersync.stream())
}

function images() {
  return src("app/img/**")
  .pipe(newer("dist/img/"))
  .pipe(
    imagemin([
      imagemin.gifsicle({interlaced: true}),
      pngquant({quality: [0.7, 0.9]}),
      imagemin.mozjpeg({quality: 85, progressive: true}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {cleanupIDs: false}
        ]
      })
    ])
  )
  .pipe(dest("dist/img"))
  .pipe(browsersync.stream())
}

// function avifWebp() {
//   return src("app/img/*.{jpg,png,jpeg}")
//   .pipe(newer("dist/img/"))
//   .pipe(avif_images({
//     quality: 50
//   }))
//   .pipe(src("app/img/*.{jpg,png,jpeg}"))
//   .pipe(webp({quality: 90}))
//   .pipe(dest("dist/img/"))
// }

function watchFiles() {
  gulp.watch(["app/**/*.html"], gulp.series(html, css));
  gulp.watch(["app/css/style.css"], css);
  gulp.watch(["app/js/**/*.js"], gulp.series(js, css));
  gulp.watch(["app/img/**"], images);
  // gulp.watch(["app/img/*.{png,jpg,jpeg}"], avifWebp);
  gulp.watch(["app/css_libs/**"], cssLibs);
  gulp.watch(["app/js_libs/**"], jsLibs);
}

function clean() {
  return del(
    "dist/*.html",
    "dist/css/",
    "dist/js/",
    "dist/img/"
  )
}

let build = gulp.series(clean, gulp.parallel(html, css, js, images,/* avifWebp,*/ cssLibs, jsLibs));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.html = html;
exports.fonts = fonts;
exports.css = css;
exports.js = js;
exports.images = images;
// exports.webp = avifWebp;
// exports.avif_images = avifWebp;
exports.build = build;
exports.watch = watch;
exports.default = watch;