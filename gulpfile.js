"use strict";

const { src, dest } = require("gulp");
const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const fileInclude = require("gulp-file-include");
const del = require("del");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const imagemin = require("gulp-imagemin");
const panini = require("panini");
const webp = require("gulp-webp");
const plumber = require("gulp-plumber");
const rigger = require("gulp-rigger");
const ghPages = require('gulp-gh-pages');


const srcPath = 'src/';
const distPath = 'dist/';



const path = {
    build: {
        html: distPath,
        js: distPath + "assets/js/",
        css: distPath + "assets/css/",
        images: distPath + "assets/images/",
        fonts: distPath + "assets/fonts/"
    },
    src: {
        html: srcPath + "*.html",
        js: srcPath + "assets/js/*.js",
        css: srcPath + "assets/scss/style.scss",
        images: srcPath + "assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
        fonts: srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}"
    },
    watch: {
        html: srcPath + "**/*.html",
        js: srcPath + "assets/js/**/*.js",
        css: srcPath + "assets/scss/**/*.scss",
        images: srcPath + "assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
        fonts: srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}"
    },
    clean: "./" + distPath
}


function serve() {
    browserSync.init({
        server: {
            baseDir: "./" + distPath
        },
        port: 3000,
        notify: false
    });
}


function html(cb) {
    panini.refresh();
    return src(path.src.html)
    .pipe(plumber())
    .pipe(panini({
        root: srcPath,
        layouts: srcPath + 'layouts/',
        partials: srcPath + 'partials/',
        helpers: srcPath + 'helpers/',
        data: srcPath + 'data/'
    }))
    .pipe(dest(path.build.html))
    .pipe(browserSync.reload({ stream: true }));

    cb();
}

function css(cb) {
    return src(path.src.css)
    .pipe(plumber({
        errorHandler: function (err) {
            notify.onError({
                title: "SCSS Error",
                message: "Error: <%= error.message %>"
            })(err);
            this.emit('end');
        }
    }))
    .pipe(sass({
        outputStyle: "expanded"
    }))
    .pipe(gcmq())
    .pipe(autoprefixer({
        cascade: true
    }))
    .pipe(dest(path.build.css))
    .pipe(cleanCSS())
    .pipe(
        rename({
            extname: ".min.css"
        })
        )
    .pipe(dest(path.build.css))
    .pipe(browserSync.reload({ stream: true }));

    cb();
}

function js(cb) {
    return src(path.src.js)
    .pipe(plumber({
        errorHandler: function (err) {
            notify.onError({
                title: "JS Error",
                message: "Error: <%= error.message %>"
            })(err);
            this.emit('end');
        }
    }))
    // .pipe(fileInclude())
    .pipe(rigger())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(
        rename({
            extname: ".min.js"
        })
        )
    .pipe(dest(path.build.js))
    .pipe(browserSync.reload({ stream: true }));

    cb();
}

function images(cb) {
    return src(path.src.images)
    .pipe(
        webp({
            quality: 70
        })
        )
    .pipe(dest(path.build.images))
    .pipe(src(path.src.images))
    .pipe(imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 95, progressive: true }),
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.svgo({
            plugins: [
            { removeViewBox: true },
            { cleanupIDs: false }
            ]
        })
        ]))
    .pipe(dest(path.build.images))
    .pipe(browserSync.reload({ stream: true }));

    cb();
}

function fonts(cb) {
    return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
    .pipe(browserSync.reload({ stream: true }));

    cb();
}


function clean(cb) {
    return del(path.clean);

    cb();
}


gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});


function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);

    // gulp.watch([path.watch.css], cssWatch);
    // gulp.watch([path.watch.js], jsWatch);
    gulp.watch([path.watch.images], images);
    gulp.watch([path.watch.fonts], fonts);
}

let build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts));
let watch = gulp.parallel(build, watchFiles, serve);

// const build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts));
// const watch = gulp.parallel(build, watchFiles, serve);

exports.html = html;
exports.deploy = deploy;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;
