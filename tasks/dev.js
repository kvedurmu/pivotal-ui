import gulp from 'gulp';

const buildFolder = 'dist';

gulp.task('build-license', () =>
  gulp.src('LICENSE')
    .pipe(gulp.dest(buildFolder))
);

gulp.task('build-readme', () => gulp.src('README.md')
  .pipe(gulp.dest(buildFolder)));

gulp.task('build-package', () => gulp.src('package.json')
  .pipe(gulp.dest(buildFolder)));

gulp.task('build', gulp.series(
  'build-license',
  'build-readme',
  'build-package',
  'css-build',
  'react-build',
  'js-build'
));
