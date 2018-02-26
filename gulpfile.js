const gulp = require('gulp');
const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const sass = require('gulp-ruby-sass');
const connect = require('gulp-connect');

// watch task


gulp.task('watch', function (){
   gulp.watch('./src/**/*.scss',['sass']); 
   gulp.watch('./src/**/*.pug',['pug']); 
});



// sass task


gulp.task('sass',function(){
   sass('./src/sass/style.scss', {
       sourcemap: true,
       style: 'expanded'
   }) 
    .on('error', sass.logError)
    .pipe(autoprefixer({
        browsers: ['last 3 versions'],
        cascade: false
   }))
    .pipe(gulp.dest('assests/css'))
    .pipe(connect.reload());
});



// pug task


gulp.task('pug',function(){
       return gulp.src('./src/pug/*.pug')
      .pipe(pug({
            pretty: true
      }))
    .pipe(gulp.dest('./'))
    .pipe(connect.reload());
});


// connect task


gulp.task('connect', function (){
   connect.server({
       port: 3333,
       root: './',
       livereload: true
   }); 
});



// Defult Task


gulp.task('default', [ 'connect', 'watch' ]);