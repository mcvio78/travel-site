var gulp = require('gulp');
var watch = require('gulp-watch');

gulp.task('default', function() {
	console.log("Hooray - you created a Gulp task!");
});

gulp.task('html', function() {
	console.log('Immage something useful being done to your HTML here.');
});

gulp.task('styles', function() {
	console.log('Immage Sass or PostCSS tasks running here.');
});

gulp.task('watch', function() {
	watch('./app/index.html', function(){
		gulp.start('html');
	});
	
	watch('./app/assets/styles/**/*.css', function() {
		gulp.start('styles')
	});
	
});




