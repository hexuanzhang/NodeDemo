const gulp = require('gulp'),
    merge = require('merge-stream');

gulp.task('move', () => {
    const jquery = gulp.src('./node_modules/jquery/dist/*')
        .pipe(gulp.dest('./public/libs/jquery'));

    const bootstrap = gulp.src('./node_modules/bootstrap/dist/**/*')
        .pipe(gulp.dest('./public/libs/bootstrap'));

    return merge(jquery, bootstrap);
});