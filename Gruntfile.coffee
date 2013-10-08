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

    jekyll:
      dist:
        options:
          safe: true

    # jshint:
      # options:
        # jshintrc: '.jshintrc'
      # dist: '_src/js/*.js'

    uglify:
      dist:
        files:
          '_site/assets/js/main.js': '_src/js/main.js'

    sass:
      dist:
        files:
          '_site/assets/css/style.css': '_src/scss/style.scss'

    autoprefixer:
      dist:
        options:
          browsers: [ 'last 2 version', 'ie 8' ]
        src: '_site/assets/css/style.css'
        dest: '_site/assets/css/style.css'

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  grunt.registerTask('default', [
    'jekyll',
    # 'jshint',
    'uglify',
    'sass',
    'autoprefixer'
  ])