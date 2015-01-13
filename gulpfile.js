var gulp = require('gulp')
var uglify = require('gulp-uglify')
var sass = require('gulp-ruby-sass')
var autoprefixer = require('gulp-autoprefixer')
var cmq = require('gulp-combine-media-queries')
var csso = require('gulp-csso')
var imagemin = require('gulp-imagemin')
var svg2png = require('gulp-svg2png')
var newer = require('gulp-newer')
var lr

function notifyLivereload (event) {
  var filename = require('path').relative(__dirname, event.path)

  lr.changed({
    body: {
      files: [ filename ]
    }
  })
}

gulp.task('jekyll', function () {
  require('child_process').spawn('jekyll', [ 'build' ], { stdio: 'inherit' })
})

gulp.task('js', function () {
  return gulp.src('_src/js/*.js')
    .pipe(newer('assets/js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
    .pipe(gulp.dest('_site/assets/js/'))
})

gulp.task('css', function () {
  return gulp.src('_src/scss/*.scss')
    .pipe(newer('assets/css'))
    .pipe(sass({ style: 'compressed' }))
    .on('error', function (err) { console.log(err) })
    .pipe(autoprefixer('last 2 version'))
    .pipe(cmq())
    .pipe(csso(true))
    .pipe(gulp.dest('assets/css'))
    .pipe(gulp.dest('_site/assets/css'))
})

gulp.task('svg', function () {
  return gulp.src('_src/img/**/*.svg')
    .pipe(newer('assets/img'))
    .pipe(svg2png())
    .pipe(imagemin())
    .pipe(gulp.dest('assets/img'))
})

gulp.task('images', function () {
  return gulp.src('_src/img/**/*.*')
    .pipe(newer('assets/img'))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeTitle: true }, { removeDesc: true }]
    }))
    .pipe(gulp.dest('assets/img'))
    .pipe(gulp.dest('_site/assets/img'))
})

gulp.task('webserver', function () {
  var express = require('express')
  var app = express()

  app.use(require('connect-livereload')())
  app.use(express.static(__dirname + '/_site'))
  app.listen(3000)

  lr = require('tiny-lr')()
  lr.listen(35729)

  require('opn')('http://localhost:3000')
})

gulp.task('watch', function () {
  gulp.watch([ '_config.yml', 'feed.xml', '*.html', '_includes/*.html', '_layouts/*.html', 'articles/*.html', 'projects/*.html', 'about/*.html', 'articles/_posts/*.md', 'projects/_posts/*.md' ], [ 'jekyll' ])
  gulp.watch('_src/scss/*.scss', [ 'css' ])
  gulp.watch('_src/js/*.js', [ 'js' ])
  gulp.watch('_src/img/**/*.*', [ 'images' ])
  gulp.watch('_src/img/**/*.svg', [ 'svg', 'images' ])
  gulp.watch([ 'assets/js/*.js', 'assets/css/*.css', 'assets/img/**/.*', '_site/**/*.html' ], notifyLivereload)
})

gulp.task('default', [ 'css', 'js', 'svg', 'images', 'jekyll', 'webserver', 'watch' ])