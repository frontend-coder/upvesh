"use strict";
// npm i gulp --save-dev
const gulp             = require('gulp');
// npm i --save-dev gulp-sass gulp-concat gulp-uglify gulp-clean-css gulp-rename gulp-autoprefixer gulp-sourcemaps gulp-plumber gulp-filesize gulp-notify
// npm i --save-dev gulp-util
const sass             = require('gulp-sass');
const cssbeautify      = require('gulp-cssbeautify');
const stripCssComments = require('gulp-strip-css-comments');
const strip            = require('gulp-strip-comments');
const concat           = require('gulp-concat');
const uglify           = require('gulp-uglify');
const rigger = require('gulp-rigger');
const cleancss         = require('gulp-clean-css');
const rename           = require('gulp-rename');
const autoprefixer     = require('gulp-autoprefixer');
const sourcemaps       = require('gulp-sourcemaps');
const plumber          = require('gulp-plumber');
const filesize         = require('gulp-filesize');
const notify           = require('gulp-notify');
const gulpUtil         = require('gulp-util');

// npm i --save-dev browser-sync
const browserSync           = require('browser-sync').create();

// npm i --save-dev del
const del               = require('del');

// npm install --save-dev gulp-ftp vinyl-ftp
const ftp               = require('gulp-ftp');
const vinyFTP           = require( 'vinyl-ftp' );


gulp.task('styles', () => {
	var sassFiles = [
	'app/scss/libs.scss',
	'app/scss/main.scss'
	];
	return gulp.src(sassFiles)
	.pipe(plumber({
		errorHandler: notify.onError(function(err){
			return {
				title: 'Styles',
				message:err.message
			}
			})
	}))
	.pipe(sourcemaps.init())
	.pipe(sass({ outputStyle: 'expanded' }))
	.pipe(autoprefixer(['last 6 versions', '> 1%', 'ie 8', 'ie 7'], {cascade:true}))
	.pipe(stripCssComments())
	.pipe(cssbeautify({indent: '  ', openbrace: 'separate-line', autosemicolon: true}))
	.pipe(concat('libs.css'))
	.pipe(rename('libs.min.css'))
//.pipe(cleancss( {level: { 2: { specialComments: 0 } } })) // Opt., comment out when debugging
.pipe(sourcemaps.write(''))
//.pipe(notify("Create file: <%= file.relative %>!"))
.pipe(gulp.dest('app/css'));
});

gulp.task('scripts', (done) => {
	var jsFiles = [
	'app/libs/plagins/jquery341.js',
'app/libs/plagins/page-scroll-to-id-master/js/minified/jquery.malihu.PageScroll2id.min.js',
'app/libs/plagins/magnific-popup/jquery.magnific-popup.min.js',
'app/libs/plagins/slick/slick.min.js',
'app/libs/common.js'
// Always at the end
];
return gulp.src(jsFiles)
.pipe(strip())
	.pipe(plumber({
		errorHandler: notify.onError({
			message: function(error) {
				return error.message;
			}})
	}))
.pipe(rigger())
.pipe(concat('scripts.min.js').on('error', done))
//	.pipe(uglify()) // Mifify js (opt.)
.pipe(notify("Create file: <%= file.relative %>!").on('error', gulpUtil.log) )
.pipe(gulp.dest('app/js'))
.pipe(filesize()).on('error', gulpUtil.log);
});

gulp.task('serve', done => {
	browserSync.init({
		server: {
			baseDir: './app'
		},
		notify: false,
		open:true,
    // online: false, // Work Offline Without Internet Connection
    // tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
});
	browserSync.watch('app', browserSync.reload);
	done();
});

gulp.task('code', done => {
	return gulp.src(['app/*.html', 'app/*php']);
	done();
});

gulp.task('picture', done => {
	return gulp.src(['app/img/*.{jpg,png,svg,ico}']);
	done();
});


gulp.task('watch', done => {
	gulp.watch("app/scss/**/*.scss", gulp.series('styles'));
	gulp.watch("app/libs/**/*.js", gulp.series('scripts'));
	gulp.watch("app/*.html", gulp.series('code'));
	gulp.watch("app/img/**/*.*", gulp.series('picture'));
	done();
});

gulp.task('default', gulp.parallel(['styles','scripts', 'watch', 'serve']));

function cleaner() {
	return del('dist/*');
}

function movefile() {
	return gulp.src('app/*.html')
	.pipe(strip())
	.pipe(gulp.dest('dist'));
}

function movefilother() {
	return gulp.src('app/*.{php,access}')
	.pipe(gulp.dest('dist'));
}

function movejs() {
	return gulp.src('app/js/scripts.min.js')
  //  .pipe(uglify()) // Mifify js (opt.)
  .pipe(gulp.dest('dist/js'))
  .pipe(filesize()).on('error', gulpUtil.log);
}
function movecss() {
	return gulp.src('app/css/*')
 //  .pipe(cleancss( {level: { 2: { specialComments: 0 } } })) // Opt., comment out when debugging
 .pipe(gulp.dest('dist/css'))
 .pipe(filesize()).on('error', gulpUtil.log);
}

function moveimages() {
	return gulp.src('app/img/**/*.{jpg,svg,png,ico}')
	.pipe(gulp.dest('dist/img'))
	.pipe(filesize()).on('error', gulpUtil.log);
}

// gulp.task('compressimg', gulp.series(compressimg));
gulp.task('cleanbuild', cleaner);
gulp.task('movefile', movefile);
gulp.task('movefilother', movefilother);
gulp.task('movejs', movejs);
gulp.task('movecss', movecss);
gulp.task('moveimages', gulp.series(moveimages));

gulp.task('build', gulp.series('cleanbuild', gulp.parallel('movefile', 'movefilother', 'movejs', 'movecss', 'moveimages' )));

// FTP: ftp://vh146.timeweb.ru
// Логин: cc63120
// Пароль: j7X4Y36Od5Zm
// http://cw25156.tmweb.ru/

gulp.task( 'ftp', function () {
	var conn = vinyFTP.create( {
		host:     'vh210.timeweb.ru',
		user:     'cw25156',
		password: '2qzRb2Wo2zjm',
		parallel: 10,
		log:      gulpUtil.log
	} );

	var globs = [
	'dist/**'
	];

    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance

    return gulp.src( globs, { base: './dist/', buffer: false } )
        .pipe( conn.newerOrDifferentSize( '/public_html' ) )// only upload newer files
        .pipe( conn.dest( '/public_html' ) );

    } );
