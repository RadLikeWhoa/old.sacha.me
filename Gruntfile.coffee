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
        tasks: [ 'any-newer:jekyll' ]
      js:
        files: '_src/js/*.js'
        tasks: [ 'newer:jshint', 'any-newer:uglify', 'newer:copy:assets' ]
      sass:
        files: '_src/scss/**/*.scss'
        tasks: [ 'any-newer:sass', 'newer:autoprefixer', 'newer:copy:assets' ]
      fonts:
        files: '_src/fonts/'
        tasks: [ 'newer:copy:fonts', 'newer:copy:assets' ]

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  grunt.registerTask('default', [
    'any-newer:jekyll',
    'newer:jshint',
    'any-newer:uglify',
    'any-newer:sass',
    'newer:autoprefixer',
    'newer:copy:fonts'
  ])