var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
 gulp.src('./')
   .pipe(webserver({
     livereload: false,
    //  port : 9100
   }));
});

gulp.task('default', ['webserver']);
