import gulp from 'gulp';
import plugins from 'gulp-load-plugins';

const {plumber, jasmine} = plugins();

gulp.task('jasmine-task-helpers', () => {
  return gulp.src(['spec/task-helpers/**/*_spec.js'])
    .pipe(plumber())
    .pipe(jasmine({includeStackTrace: true}));
});

gulp.task('ci', gulp.series(
  'jasmine-task-helpers',
  'react-build-svgs',
  'spec-app'
));
