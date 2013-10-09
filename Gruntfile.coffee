module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON('package.json')

    jekyll:
      dist:
        options:
          safe: true

    jshint:
      options:
        jshintrc: '_test/.jshintrc'
      dist: '_src/js/*.js'

    uglify:
      dist:
        files:
          'assets/js/main.js': '_src/js/main.js'

    sass:
      dist:
        options:
          style: 'compressed'
        files:
          'assets/css/style.css': '_src/scss/style.scss'

    autoprefixer:
      dist:
        options:
          browsers: [ 'last 2 version', 'ie 8' ]
        src: 'assets/css/style.css'
        dest: 'assets/css/style.css'

    copy:
      fonts:
        expand: true
        cwd: '_src/fonts/'
        src: '**'
        dest: 'assets/css/fonts/'
        flatten: true
      assets:
        '_site/': 'assets/'

    watch:
      jekyll:
        files: [ '_config.yml', '/**/*.html', '/_posts/*.md', 'feed.xml', 'sitemap.xml' ]
        tasks: [ 'jekyll:dist' ]
      js:
        files: '_src/js/*.js'
        tasks: [ 'jshint:dist', 'uglify:dist', 'copy:assets' ]
      sass:
        files: '_src/scss/**/*.scss'
        tasks: [ 'sass:dist', 'autoprefixer:dist', 'copy:assets' ]
      fonts:
        files: '_src/fonts/'
        tasks: [ 'copy:fonts', 'copy:assets' ]

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  grunt.registerTask('default', [
    'jekyll:dist',
    'jshint:dist',
    'uglify:dist',
    'sass:dist',
    'autoprefixer:dist',
    'copy:fonts'
  ])