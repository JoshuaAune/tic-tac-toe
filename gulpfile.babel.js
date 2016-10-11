import gulp from 'gulp';
import uglify from 'gulp-uglify';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import concat from 'gulp-concat';

let jsSource = ['./js/angular/app.js', './js/**/*.js']

gulp.task('scripts', () => {
  return gulp.src(jsSource)
  .pipe(plumber())
  .pipe(babel({
    presets: ["es2015"]
  }))
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('build/js'));
});


//Styles Task
//Uglifies
gulp.task('styles', () => {
   return gulp.src('styles/*.sass')
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(concat('master.css'))
  .pipe(gulp.dest('build/css'));
});





// Watch Task
// Watches JS
gulp.task('watch', function(){
  gulp.watch(jsSource, ['scripts']);
  gulp.watch('styles/*.sass', ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);
