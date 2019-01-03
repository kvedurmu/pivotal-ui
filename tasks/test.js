import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';

const {plumber, jasmine} = loadPlugins();

gulp.task('jasmine-task-helpers', () => gulp.src(['spec/task-helpers/**/*_spec.js'])
  .pipe(plumber())
  .pipe(jasmine({includeStackTrace: true})));

gulp.task('ci', gulp.series(
  'jasmine-task-helpers',
  'react-build-svgs',
  'spec-app'
));
