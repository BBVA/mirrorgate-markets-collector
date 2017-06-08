const gulp = require('gulp');
const zip = require('gulp-zip');
 
gulp.task('package', () =>
  gulp.src(['index.js', 'lambda.js', 'src*/**/*', 'node_modules*/**/*'])
    .pipe(zip('mirrorgate-google-play-collector.zip'))
    .pipe(gulp.dest('build'))
);