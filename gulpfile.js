const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('test', () => {
  gulp.src('test/crawlers/**/*-spec.js', { read: false })
  // `gulp-mocha` needs filepaths so you can't have any plugins before it
  .pipe(mocha({ reporter: 'nyan' }));
});

gulp.task('default', ['test']);