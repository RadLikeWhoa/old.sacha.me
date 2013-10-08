###

[ ] grunt-contrib-watch
[ ] grunt-usemin (?)
[ ] grunt-newer (?)
[ ] grunt-release (?)
[ ] grunt-pagespeed (?)
[ ] grunt-jekyll (?)

###

module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON('package.json')

    clean:
      files: 'dist/'

    # jshint:
      # options:
        # jshintrc: '.jshintrc'
      # dist: '_src/js/*.js'

    uglify:
      dist:
        files:
          'assets/js/main.js': '_src/js/main.js'

    sass:
      dist:
        files:
          'assets/css/style.css': '_src/scss/style.scss'

    autoprefixer:
      dist:
        options:
          browsers: [ 'last 2 version', 'ie 8' ]
        src: 'assets/css/style.css'
        dest: 'assets/css/style.css'

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  grunt.registerTask('default', [
    'clean',
    # 'jshint',
    'uglify',
    'sass',
    'autoprefixer'
  ])