var gulp = require('gulp');

var appDir = '/Users/navneet/DHIS/apache-tomcat-8.0.17/webapps/dhis/ab/RBF3/';

var files = [
    //Lib files
    'node_modules/jquery/dist/jquery.js',

    //Src files
    'src/**/*.js',

    //Test files
    'test/fixtures/**/*.js',
    'test/matchers/**/*.js',
    'test/mocks/**/*_mock.js',
    'test/specs/**/*_spec.js'
];
var buildDirectory = 'build';

gulp.task('clean', function (cb) {
    var del = require('del');
    del(buildDirectory, cb);
});

gulp.task('test', function () {
    return gulp.src(files).pipe(runKarma());
});

gulp.task('watch', function () {
    return gulp.src(files).pipe(runKarma(true));
});

gulp.task('jshint', function () {
    var jshint = require('gulp-jshint');

    return gulp.src([
            'test/specs/**/*.js',
            'src/**/*.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('jscs', function () {
    var jscs = require('gulp-jscs');

    return gulp.src([
        'test/specs/**/*.js',
        'src/**/*.js'
    ]).pipe(jscs('./.jscsrc'));
});

gulp.task('scss', function () {
    var sass = require('gulp-ruby-sass');
    var minifyCss = require('gulp-minify-css');

    return gulp.src('src/app.scss', { base: './src/' })
        .pipe(gulp.dest(
            [buildDirectory, 'scss'].join('/')
        ))
        .pipe(sass({ sourcemap: true, sourcemapPath: 'scss/' }))
        .pipe(minifyCss())
        .pipe(gulp.dest(
            [buildDirectory, 'css'].join('/')
        ));
});

gulp.task('min', function () {
    var mangleJS = false;

    var useref = require('gulp-useref');
    var gulpif = require('gulp-if');
    var ngAnnotate = require('gulp-ng-annotate');
    var uglify = require('gulp-uglify');
    var minifyCss = require('gulp-minify-css');
    var rev = require('gulp-rev');
    var revReplace = require('gulp-rev-replace');

    var assets = useref.assets();

    return gulp.src('src/**/*.html')
        .pipe(assets)
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulpif('src/**/app.js', ngAnnotate({
            add: true,
            remove: true,
            single_quotes: true, //jshint ignore:line
            stats: true
        })))
        // .pipe(gulpif('*.js', uglify({
        //     mangle: mangleJS
        // })))
        .pipe(gulpif('!**/index.html', rev()))
        .pipe(revReplace())
        .pipe(gulp.dest(buildDirectory));
});

gulp.task('copy-images', function () {
    return gulp.src('src/images/**/*.{jpg,png,gif}', { base: './src/images' })
        .pipe(gulp.dest(
            [buildDirectory, 'images'].join('/')
        ));
});

gulp.task('copy-manifest', function () {
    return gulp.src('src/**/*.webapp', { base: './src' })
        .pipe(gulp.dest(buildDirectory));
});

gulp.task('build', function (cb) {
    var runSequence = require('run-sequence');
    runSequence('clean', /*'test',*/ 'scss', 'jshint', 'jscs', ['min', 'copy-images', 'copy-manifest'], cb);
});

gulp.task('copy', function () {
    var ignore = require('gulp-ignore');

    return gulp.src(['./build/**/*.*'])
        .pipe(ignore.exclude('*.webapp'))
        .pipe(gulp.dest(appDir));
});

gulp.task('clean-app-dir', function (cb) {
    var del = require('del');
    del(appDir, {force: true}, cb);
})

gulp.task('build-copy', function (cb) {
    var runSequence = require('run-sequence');
    runSequence('clean-app-dir', 'build', 'copy', cb);
});

gulp.task('default', function () {
    //TODO: Think of something to do here that is sensible but does not do unexpected stuff
});

gulp.task('package', function () {
    var zip = require('gulp-zip');
    return gulp.src('build/**/*', { base: './build/' })
        .pipe(zip('RBF3.zip', { compress: false }))
        .pipe(gulp.dest('.'));
});
function runKarma(watch) {
    var karma = require('gulp-karma');
    var config = {
        configFile: 'test/karma.conf.js'
    };

    if (!watch) {
        watch = false;
    }

    if (watch === true) {
        config.action = 'watch';
    }

    return karma(config);
}
