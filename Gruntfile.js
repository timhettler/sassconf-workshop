'use strict';

module.exports = function (grunt) {
  // Loads in any grunt tasks in the package.json file
  // https://github.com/sindresorhus/load-grunt-tasks
  require('load-grunt-tasks')(grunt);

  var taskConfig = {
    // Clear files and folders
    // https://github.com/gruntjs/grunt-contrib-clean
    clean: {
      demo: ['demo/styles'],
      test: ['test/output'],
      sassdoc: ['sassdoc']
    },

    // Run tasks whenever watched files change
    // https://github.com/gruntjs/grunt-contrib-watch
    watch: {
      sass: {
        options: {
          livereload: true
        },
        files: ['sass/**/*.scss'],
        tasks: ['sass'],
      },
      sassdoc: {
        options: {
          livereload: true
        },
        files: ['sass/**/*.scss'],
        tasks: ['sassdoc'],
      }
    },

    // Start a static web server.
    // https://github.com/gruntjs/grunt-contrib-connect
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        hostname: 'localhost'
      },
      demo: {
        options: {
          open: true,
          base: ['demo']
        }
      },
      sassdoc: {
        options: {
          open: true,
          base: ['sassdoc']
        }
      }
    },

    // Compile Sass to CSS using node-sass
    // https://github.com/sindresorhus/grunt-sass
    sass: {
      demo: {
        files: {
          'demo/styles/app.css': 'sass/app.scss'
        }
      }
    },

    // Run Mocha tests
    // https://github.com/jamescarr/grunt-mocha-cli
    mochacli: {
      all: ['test/test_shim.js']
    },

    // Create documentation with SassDoc
    // https://github.com/SassDoc/grunt-sassdoc
    sassdoc: {
      src: 'sass/'
    }
  };
  
  grunt.initConfig(taskConfig);

  grunt.registerTask('test', ['clean:test', 'mochacli']);
  grunt.registerTask('server', ['clean:demo', 'sass:demo', 'connect:demo', 'watch:sass']);
  grunt.registerTask('noserver', ['clean:demo', 'sass:demo', 'watch:sass']);
  grunt.registerTask('sassdoc-server', ['clean:sassdoc', 'sassdoc', 'connect:sassdoc', 'watch:sassdoc']);
  grunt.registerTask('default', ['server']);

};