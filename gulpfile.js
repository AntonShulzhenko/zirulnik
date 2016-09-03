// grab our packages
var gulp        = require('gulp'),
    jshint      = require('gulp-jshint'),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    useref      = require('gulp-useref'),
    gulpIf      = require('gulp-if'),
    cleanCSS    = require('gulp-clean-css'),
    concatCss   = require('gulp-concat-css'),
    imagemin    = require('gulp-imagemin'),
    cache       = require('gulp-cache'),
    del         = require('del'),
    runSequence = require('run-sequence');

var config = {
    bowerDir: './bower_components',
    sassPath: './source/sass'
}

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('source/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-css', function() {
  return gulp.src(config.sassPath + '/**/*.scss')
    .pipe(sourcemaps.init())  // Process the original sources
      .pipe(sass())
    .pipe(sourcemaps.write()) // Add the map to modified source.
    .pipe(gulp.dest('source/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('build-js', function() {
  return gulp.src('source/js/modules/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('source/js'));
});

gulp.task('useref', function(){
  return gulp.src('source/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cleanCSS()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function() {
    return gulp.src('source/img/**/*.+(png|jpg|gif|svg)')
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
          interlaced: true
        })))
        .pipe(gulp.dest('dist/img'))
});

gulp.task('fonts', function() {
  return gulp.src('source/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('icons', function() {
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
        .pipe(gulp.dest('dist/fonts'));
});

// gulp.task('clean:dist', function() {
//   return del.sync('dist');
// })

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './source'
    },
  })
});

gulp.task('default', ['build-css', 'jshint', 'build-js', 'useref', 'icons', 'images', 'fonts', 'watch']);

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', ['browserSync', 'build-css', 'build-js'], function() {
  gulp.watch('source/sass/**/*.scss', ['build-css']);
  gulp.watch('source/js/**/*.js', ['build-js'], browserSync.reload);
  gulp.watch('source/*.html', browserSync.reload);
});
