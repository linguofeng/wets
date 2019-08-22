const gulp = require('gulp');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('build', () => {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(gulp.dest('dist'));
});


gulp.task('build:watch', ['build'], () => {
  gulp.watch('src/*.ts', ['build']);
});