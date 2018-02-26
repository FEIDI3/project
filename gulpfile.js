const gulp = require('gulp');
const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const sass = require('gulp-ruby-sass');
const connect = require('gulp-connect');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');





// watch task


gulp.task('watch', function (){
   gulp.watch('./src/**/*.scss',['sass']); 
   gulp.watch('./src/**/*.pug',['pug']);
   gulp.watch('./src/**/*.js',['js-concat']); 
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
    .pipe(gulp.dest('assets/css'))
    .pipe(connect.reload());
});



// pug task


gulp.task('pug',function(){
       return gulp.src('./src/pug/*.pug')
            .pipe(plumber())
            .pipe(pug({
                pretty: true
            }))
            .pipe(gulp.dest('./'))
            .pipe(connect.reload());
});

// concat task


gulp.task('js-concat',function(){
    return gulp.src(['./src/js/vendor/jquery/*.js', './src/js/partials/*.js'])
            .pipe(plumber())
            .pipe(concat('scripts.js'))
            .pipe(gulp.dest('./assets/js'));
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