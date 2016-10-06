var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass');

//Scripts Task
//Uglifies

gulp.task('scripts', function(){
  gulp.src('js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('build/js'));
});

//Styles Task
//Uglifies
gulp.task('styles', function(){
  gulp.src('styles/*.sass')
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(gulp.dest('build/css'));
});


// Watch Task
// Watches JS
gulp.task('watch', function(){
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('styles/*.sass', ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);
