import gulp from 'gulp';
import uglify from 'gulp-uglify';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import concat from 'gulp-concat';

//Scripts Task
//Uglifies

gulp.task('scripts', () => {
  return gulp.src('js/*.js')
  .pipe(plumber())
  .pipe(babel({
    presets: ["es2015"]
  }))
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('build/js'));
});

gulp.task('frontjs', () => {
  return gulp.src(paths.jsSource)
  .pipe(plumber())
  .pipe(babel({
    presets: ["es2015"]
  }))
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest(paths.jsDest));
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
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('styles/*.sass', ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);
