const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');

const watchF = (glob, task) => {
    gulp.watch(glob, {ignoreInitial: false}, gulp.series(task));
}

function compilaSass() {
    return gulp.src('./source/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe (gulp.dest('./build'));
}
function comprimeImgs() {
    return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images/'))
}

function comprimeJS() {
    return gulp.src ('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts'))
}

exports.default = function (){
    watchF('./source/styles.scss', compilaSass);
    watchF('./source/scripts/*.js', comprimeJS);
    watchF('./source/images/*', comprimeImgs);
}


