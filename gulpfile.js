'use strict'
var gulp = require('gulp')
var del = require('del')
var sass = require('gulp-sass') // Sass, Scss 빌드모듈
// var uglify = require('gulp-uglify') // Javascript Minify 압축 모듈
// var sourcemaps = require('gulp-sourcemaps') // sourcemap 모듈
var browserSync = require('browser-sync').create() // node서버 모듈
var autoprefixer = require('gulp-autoprefixer') // css(prefix) 자동생성 모듈
var fileinclude = require('gulp-file-include')
var imgRetina = require('gulp-img-retina')
var gutil = require('gulp-util')
var prettyHtml = require('gulp-pretty-html');
var rename = require("gulp-rename");
var replace = require("gulp-replace");
var watch = require('gulp-watch');

var env = gutil.env.mode || 'development';

var DIR = {
		SRC: './src',
		DEST: env == 'development' ? './dist' : './build'
	},
	SRC = {
		HTML: DIR.SRC + '/**/!(_)*.html',
		JS: DIR.SRC + '/**/*.js',
		SCSS: DIR.SRC + '/**/*.scss',
		IMAGES: DIR.SRC + '/**/img/**/*',
		FONT: DIR.SRC + '/**/fonts/*'
	}

gulp.task('sass', function () {
	return gulp.src(SRC.SCSS)
		// .pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compact' //expanded
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'ie 9']
		}))
		.pipe(rename(function (path) {
			path.dirname = path.dirname.replace('scss', 'css');
		}))
		// .pipe(sourcemaps.write('./sourcemaps'))
		.pipe(gulp.dest(DIR.DEST))
		.pipe(browserSync.stream())
})

gulp.task('html', function () {
	return gulp.src(SRC.HTML)
		.pipe(fileinclude({
			prefix: '@',
			// basepath: DIR.SRC,
			context: {
				title: '',
				description: '',
				keyword: ''
			}
		}))
		// .pipe(imgRetina({
		// 	1: '',
		// 	2: '@2x'
		// }))
		.pipe(prettyHtml())
		.pipe(rename(function (path) {
			path.dirname = path.dirname.replace('html', '');
		}))
		.pipe(replace('"../','"'))
		.pipe(gulp.dest(DIR.DEST))
		.pipe(browserSync.stream())
	browserSync.reload();
})

gulp.task('images', function () {
	return gulp.src(SRC.IMAGES)
		.pipe(gulp.dest(DIR.DEST))
})

gulp.task('js', function () {
	return gulp.src(SRC.JS)
		// .pipe(uglify())
		.pipe(gulp.dest(DIR.DEST))
})

gulp.task('serve', function () {
	browserSync.init({
		port: 9640,
		server: {
			baseDir: DIR.DEST
		}
	})
})

gulp.task('font', function () {
	return gulp.src(SRC.FONT)
		.pipe(rename(function (path) {
			path.dirname = path.dirname.replace('scss', 'css');
		}))
		.pipe(gulp.dest(DIR.DEST))
})


gulp.task('clean', function () {
	del(DIR.DEST);
});

gulp.task('watch', function () {
	watch(SRC.HTML, function () {
		gulp.start('html');
	})
	watch('**/inc/*.html', function () {
		gulp.start('html');
	})
	watch(SRC.SCSS, function () {
		gulp.start('sass');
	})
	watch(SRC.IMAGES, function () {
		gulp.start('images');
	})
	watch(SRC.JS, function () {
		gulp.start('js');
	})
})
//
// 'script',
gulp.task('default', ['serve', 'html', 'font', 'js', 'images', 'sass', 'watch'], function () {
	console.log('complete gulp default file')
});
gulp.task('build', ['html', 'font', 'js', 'images', 'sass'], function () {
	gulp.src(DIR.DEST + '/**/*')
		.pipe(gulp.dest('./build'));
	console.log('!!!!!!!!+++build+++!!!!!!')
});
