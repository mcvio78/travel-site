var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create(),
ghPages = require('gulp-gh-pages');

gulp.task('deploy', ['usemin'], function() {
  return gulp.src('./docs/**/*')
    .pipe(ghPages());
});

gulp.task('previewDist', function() {
	
	browserSync.init({
		notify: false,
		server: {
			baseDir: "docs"
		}
	});
});

gulp.task('deleteDestFolder', ['icons'], function() {
	return del("./docs");
});

gulp.task('copyGeneralFiles', ['deleteDestFolder'], function() {
	var pathsToCopy = [
		'./app/**/*',
		'!./app/index.html',
		'!./app/assets/images/**',
		'!./app/assets/styles/**',
		'!./app/assets/scripts/**',
		'!./app/temp',
		'!./app/temp/**'
	]
	
	return gulp.src(pathsToCopy)
		.pipe(gulp.dest("./docs"));
})

gulp.task('optimizeImages',['deleteDestFolder'], function() {
	return gulp.src(['./app/assets/images/**/*' , '!./app/assets/images/icons' , '!./app/assets/images/icons/**/*'])
		.pipe(imagemin({
			progressive: true,
			interlaced: true,
			multipass: true
		}))
		.pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('useminTrigger', ['deleteDestFolder'], function() {
	gulp.start("usemin");
});

gulp.task('usemin', ['styles', 'scripts'], function() {
	return gulp.src("./app/index.html")
		.pipe(usemin({
			css: [function() {return rev()}, function() {return cssnano()}],
			js: [function() {return rev()}, function() {return uglify()}]
		}))
		.pipe(gulp.dest("./docs"));
});

gulp.task('build', ['deleteDestFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger', 'deploy']);