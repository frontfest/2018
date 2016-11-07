const gulp        = require('gulp');

const concat      = require('gulp-concat');
const less        = require('gulp-less');
const autoprefix  = require('less-plugin-autoprefix');
const uglify      = require('gulp-uglify');
const uncss       = require('gulp-uncss');
const cleanCss    = require('gulp-clean-css');
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
    .pipe(uncss({
      html: ['index.html', 'speaker.html'],
    }))
    .pipe(cleanCss())
    .pipe(rename('style-default.min.css'))
    .pipe(gulp.dest('assets/css'))
);

gulp.task('less-dev', () =>
  gulp.src('less/style-default.less')
    .pipe(less({
      plugins: [ new autoprefix({ browsers: ['last 5 versions'] }) ],
    }))
    .pipe(rename('style-default.min.css'))
    .pipe(gulp.dest('assets/css'))
);

gulp.task('browser-sync', () => {
  browserSync.init(['assets/css/**.css', 'assets/js/**.js', '*.html'], {
    server: '.',
  });
});

gulp.task('serve', ['less-dev', 'javascript', 'browser-sync'], () => {
  gulp.watch('less/**/*.less', ['less-dev']);
  gulp.watch('scripts/**/*.js', ['javascript']);
});

gulp.task('default', ['less', 'javascript']);
