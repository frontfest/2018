const gulp        = require('gulp');

const less        = require('gulp-less');
const autoprefix  = require('less-plugin-autoprefix');
const uglify      = require('gulp-uglify');
const uncss       = require('gulp-uncss');
const cleanCss    = require('gulp-clean-css');
const rename      = require('gulp-rename');
const browserSync = require('browser-sync');

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
  browserSync.init(['assets/css/**.css', '*.html'], {
    server: '.',
  });
});

gulp.task('serve', ['less-dev', 'browser-sync'], () => {
  gulp.watch('less/**/*.less', ['less-dev']);
});

gulp.task('default', ['less']);
