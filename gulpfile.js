const gulp        = require('gulp');

const concat      = require('gulp-concat');
const less        = require('gulp-less');
const autoprefix  = require('less-plugin-autoprefix');
const uglify      = require('gulp-uglify');
const cleanCss    = require('gulp-clean-css');
const swig        = require('gulp-swig');
const rename      = require('gulp-rename');
const browserSync = require('browser-sync');

gulp.task('javascript', () =>
  gulp.src([
      'scripts/modernizr-2.6.2.min.js',
      'scripts/wow.js',
      'scripts/jquery.smooth-scroll.js',
      'scripts/kinetic-v5.1.0.js',
      'scripts/jquery.final-countdown.js',
      'scripts/cbscript.js',
    ])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
);

gulp.task('less', () =>
  gulp.src('less/style-default.less')
    .pipe(less({
      plugins: [ new autoprefix({ browsers: ['last 5 versions'] }) ],
    }))
    .pipe(cleanCss())
    .pipe(rename('style-default.min.css'))
    .pipe(gulp.dest('assets/css'))
);

gulp.task('templates', () => {
  gulp.src('templates/**/*.html')
    .pipe(swig({
      defaults: {
        cache: false,
      },
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('browser-sync', () => {
  browserSync.init(['assets/css/**.css', 'assets/js/**.js', '*.html', 'codigo-conducta/*.html'], {
    server: '.',
  });
});

gulp.task('serve', ['templates', 'less', 'javascript', 'browser-sync'], () => {
  gulp.watch('less/**/*.less', ['less']);
  gulp.watch('scripts/**/*.js', ['javascript']);
  gulp.watch('templates/**/*.html', ['templates']);
});

gulp.task('default', ['templates', 'less', 'javascript']);
