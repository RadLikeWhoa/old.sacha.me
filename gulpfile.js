var gulp = require('gulp')
var uglify = require('gulp-uglify')
var sass = require('gulp-sass')
var csso = require('gulp-csso')
var imagemin = require('gulp-imagemin')
var svg2png = require('gulp-svg2png')
var newer = require('gulp-newer')
var pngquant = require('imagemin-pngquant')
var autoprefixer = require('gulp-autoprefixer')
var hashFiles = require('hash-files')
var lr

function notifyLivereload (event) {
  var filename = require('path').relative(__dirname, event.path)

  lr.changed({
    body: {
      files: [ filename ]
    }
  })
}

gulp.task('jekyll', [ 'version' ], function () {
  require('child_process').spawn('jekyll', [ 'build', '--drafts' ], { stdio: 'inherit' })
})

gulp.task('scripts', function () {
  return gulp.src('_src/js/*.js')
    .pipe(newer('assets/js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
    .pipe(gulp.dest('_site/assets/js'))
})

gulp.task('styles', function () {
  return gulp.src('_src/scss/*.scss')
    .pipe(newer('assets/css'))
    .pipe(sass({
      style: 'compressed',
      errLogToConsole: true
    }))
    .pipe(autoprefixer('last 2 version'))
    .pipe(csso(true))
    .pipe(gulp.dest('assets/css'))
    .pipe(gulp.dest('_site/assets/css'))
})

gulp.task('vectors', function () {
  return gulp.src('_src/img/**/*.svg')
    .pipe(newer('assets/img'))
    .pipe(imagemin({
      svgoPlugins: [{ removeTitle: true }, { removeDesc: true }]
    }))
    .pipe(gulp.dest('assets/img'))
    .pipe(gulp.dest('_site/assets/img'))
    .pipe(svg2png())
    .pipe(imagemin())
    .pipe(gulp.dest('assets/img'))
    .pipe(gulp.dest('_site/assets/img'))
})

gulp.task('images', function () {
  return gulp.src('_src/img/**/*.{jpg,png}')
    .pipe(newer('assets/img'))
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest('assets/img'))
    .pipe(gulp.dest('_site/assets/img'))
})

gulp.task('version', [ 'styles', 'scripts' ], function () {
  return require('fs').writeFileSync('_data/assets.json', JSON.stringify({
    'style': hashFiles.sync({ files: [ '_site/assets/css/style.css' ] }),
    'script': hashFiles.sync({ files: [ '_site/assets/js/main.js' ] })
  }))
})

gulp.task('server', function () {
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
  gulp.watch([ '_config.yml', 'feed.xml', '*.html', '_includes/*.html', '_layouts/*.html', 'articles/*.html', 'projects/*.html', 'about/**/*.html', 'articles/_posts/*.md', 'projects/_posts/*.md', '_drafts/*.md' ], [ 'jekyll' ])
  gulp.watch('_src/scss/*.scss', [ 'styles', 'version' ])
  gulp.watch('_src/js/*.js', [ 'scripts', 'version' ])
  gulp.watch('_src/img/**/*.{jpg,png}', [ 'images' ])
  gulp.watch('_src/img/**/*.svg', [ 'vectors' ])
  gulp.watch([ '_site/assets/js/*.js', '_site/assets/css/*.css', '_site/assets/img/**/*.*', '_site/**/*.html' ], notifyLivereload)
})

gulp.task('build', [ 'styles', 'scripts', 'version', 'vectors', 'images', 'jekyll' ])
gulp.task('default', [ 'build', 'server', 'watch' ])
