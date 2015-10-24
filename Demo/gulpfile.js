// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);

///////////////
// Home page //
///////////////
// Lint Task
gulp.task('lintHome', function() {
    return gulp.src('homeJs/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sassHome', function() {
    return gulp.src('homeScss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

// Concatenate & Minify JS
gulp.task('scriptsHome', function() {
    return gulp.src(['homeJs/*.js','commonJs/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'));
});

// Watch Files For Changes
gulp.task('watchHome', function() {
    gulp.watch('homeJs/*.js', ['lintHome', 'scriptsHome']);
    gulp.watch('homeScss/*.scss', ['sassHome']);
});

gulp.task('homePage', ['lintHome', 'sassHome', 'scriptsHome', 'watchHome']);

///////////////////
// Practise page //
///////////////////
// Lint Task
gulp.task('lintPractise', function() {
    return gulp.src('Practise/practiseJs/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sassPractise', function() {
    return gulp.src('Practise/practiseScss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('Practise/css'));
});

// Concatenate & Minify JS
gulp.task('scriptsPractise', function() {
    return gulp.src(['Practise/practiseJs/*.js','commonJs/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('Practise/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('Practise/js'));
});

// Watch Files For Changes
gulp.task('watchPractise', function() {
    gulp.watch('Practise/practiseJs/*.js', ['lintPractise', 'scriptsPractise']);
    gulp.watch('Practise/practiseScss/*.scss', ['sassPractise']);
});

gulp.task('practisePage', ['lintPractise', 'sassPractise', 'scriptsPractise', 'watchPractise']);

//////////////
// Graphics //
//////////////
// Lint Task
gulp.task('lintGraphics', function() {
    return gulp.src('Graphics/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sassGraphics', function() {
    return gulp.src('Graphics/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('Graphics/css'));
});

// Concatenate & Minify JS
gulp.task('scriptsGraphics', function() {
    return gulp.src(['Graphics/js/*.js''Graphics/js/BreakOut/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('Graphics/js/homePage'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('Graphics/js/homePage'));
});

// Watch Files For Changes
gulp.task('watchGraphics', function() {
    gulp.watch('Graphics/js/*.js', ['lintGraphics', 'scriptsGraphics']);
    gulp.watch('Graphics/scss/*.scss', ['sassGraphics']);
});

// Default Task
gulp.task('Graphics', ['lintGraphics', 'sassGraphics', 'scriptsGraphics', 'watchGraphics']);