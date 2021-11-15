const { series, src, dest } = require("gulp");
const inlinesource = require("gulp-inline-source");
const babel = require("gulp-babel");
const watch = require("gulp-watch");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");

function js() {
  return src("./src/**.js")
    .pipe(
      babel({
        presets: ["@babel/env", "minify"],
      })
    )
    .pipe(concat("index.js"))
    .pipe(dest("./out"));
}

function scss() {
  return src("./src/index.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(dest("./out"));
}

function html() {
  return src("./src/index.html").pipe(inlinesource()).pipe(dest("./out"));
}

const build = series(js, scss, html);

exports.watch = () => watch("./src/**", build);
exports.default = build;
